import Gallery from "./gallery/gallery.vue";
import firebase from "firebase"
import "firebase/firestore"
import 'firebase/app'

export default {
  name: "Showcase",
  props: {
    observer: IntersectionObserver,
  },
  methods: {
    tabClick(galRefName) {
      let component = this
      new Promise(resolve => {
        let callback = function () {
          if (component.$refs[galRefName]) resolve()
          else setTimeout(callback, 10)
        }
        setTimeout(callback, 10)
      }).then(() => {
        component.$refs[galRefName][0].splitGallery()
      })
    },
    resolveImageSource(image, fields) {
      for (let i = 0; i < fields.length; i++) {
        let value = image[fields[i]]
        if (typeof value === "string" && value.trim()) return value
      }
      return ""
    },
    normalizeImage(imageDoc) {
      let imageData = imageDoc.data()
      let lazy = this.resolveImageSource(imageData, ["lazy", "thumbnail", "image", "closeup"])
      let thumbnail = this.resolveImageSource(imageData, ["thumbnail", "lazy", "image", "closeup"])
      let image = this.resolveImageSource(imageData, ["image", "thumbnail", "lazy", "closeup"])
      let closeup = this.resolveImageSource(imageData, ["closeup", "image", "thumbnail", "lazy"])
      let warnings = []

      if (!imageData.lazy && lazy) warnings.push("missing-lazy")
      if (!imageData.thumbnail && thumbnail) warnings.push("missing-thumbnail")
      if (!imageData.image && image) warnings.push("missing-image")
      if (!imageData.closeup && closeup) warnings.push("missing-closeup")
      if (!Array.isArray(imageData.height) || imageData.height.length < 3) warnings.push("invalid-height")
      if (!Array.isArray(imageData.width) || imageData.width.length < 3) warnings.push("invalid-width")

      return {
        valid: Boolean(thumbnail || image || closeup || lazy),
        warnings,
        image: {
          ...imageData,
          ref: imageDoc.ref,
          likes: imageData.likes ? imageData.likes : 0,
          lazy,
          thumbnail: thumbnail || lazy,
          image: image || thumbnail || lazy,
          closeup: closeup || image || thumbnail || lazy,
          height: Array.isArray(imageData.height) && imageData.height.length >= 3 ? imageData.height : [0, 300, 600, 1200],
          width: Array.isArray(imageData.width) && imageData.width.length >= 3 ? imageData.width : [0, 400, 800, 1600]
        }
      }
    },
    preloadImages(galleryObj, type) {
      let images = []
      let promises = []
      galleryObj.forEach(image => {
        promises.push(new Promise(resolve => {
          let src = this.resolveImageSource(image, [type, "thumbnail", "image", "closeup", "lazy"])
          if (!src) {
            resolve({ status: "skipped", id: image.ref ? image.ref.id : null })
            return
          }
          let img = new Image();
          img.onload = function () {
            images.push(img)
            resolve({ status: "loaded", id: image.ref ? image.ref.id : null })
          };
          img.onerror = function () {
            resolve({ status: "failed", id: image.ref ? image.ref.id : null, src })
          };
          img.src = src
        }))
      })
      return [images, promises]
    },
    logGalleryIssues(galleryObj) {
      let warningCount = galleryObj.validation.warningImages.length
      let skippedCount = galleryObj.validation.skippedImages.length
      let preloadFailureCount = galleryObj.validation.preloadFailures.length

      if (!warningCount && !skippedCount && !preloadFailureCount) return

      console.warn(
        `[Showcase] Gallery "${galleryObj.name}" loaded with ${warningCount} warning image(s), ${skippedCount} skipped image(s) and ${preloadFailureCount} preload issue(s).`,
        galleryObj.validation
      )
    }
  },
  async mounted() {
    this.preloadedImages = []
    this.observer.observe(this.$el);
    await this.db.collection('galleries').where('hidden', '!=', true).get().then(async galleriesDocs => {
      let docs = galleriesDocs.docs
      docs.sort((a, b) => {
        return a.data().order - b.data().order
      })
      for (let i = 0; i < docs.length; i++) {
        let doc = docs[i]
        let galleryObj = {
          name: doc.data().name,
          order: doc.data().order,
          hidden: doc.data().hidden,
          images: [],
          ref: doc.ref,
          likes: this.$store.getters.likes,
          loaded: false,
          validation: {
            warningImages: [],
            skippedImages: [],
            preloadFailures: []
          }
        }
        this.galleries.push(galleryObj)
        this.galleries.sort((a, b) => {
          return a.order - b.order
        })
        await doc.ref.collection('images').get().then(imageDocs => {
          let normalizedImages = []

          imageDocs.docs.forEach(imageDoc => {
            let normalizedImage = this.normalizeImage(imageDoc)

            if (!normalizedImage.valid) {
              galleryObj.validation.skippedImages.push({
                id: imageDoc.id,
                warnings: normalizedImage.warnings.length ? normalizedImage.warnings : ["missing-display-source"]
              })
              return
            }

            if (normalizedImage.warnings.length) {
              galleryObj.validation.warningImages.push({
                id: imageDoc.id,
                warnings: normalizedImage.warnings
              })
            }

            normalizedImages.push(normalizedImage.image)
          })

          let preload = this.preloadImages(normalizedImages, 'lazy')
          this.preloadedImages.push(preload[0])
          Promise.all(preload[1]).then(results => {
            galleryObj.validation.preloadFailures = results.filter(result => result.status !== "loaded")
            galleryObj.images.push(...normalizedImages)
            galleryObj.images.sort((a, b) => { return a.index - b.index })
            galleryObj.loaded = true
            this.logGalleryIssues(galleryObj)
          }
          )
        })
      }
    })
  },
  components: {
    Gallery,
  },
  data() {
    return {
      db: firebase.firestore(),
      tab: null,
      preloadedImages: [],
      galleries: [
      ],
    };
  },
};
