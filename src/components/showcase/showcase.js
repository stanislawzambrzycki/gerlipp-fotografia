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
        let callback = function() {
          if(component.$refs[galRefName]) resolve()
          else setTimeout(callback, 10)
        }
        setTimeout(callback, 10)
      }).then(() => {
        component.$refs[galRefName][0].splitGallery()
      })
    },
    preloadLazyImages(galleryObj) {
      let images = []      
      let promises = []      
      galleryObj.forEach(image => {
        promises.push(new Promise( resolve => {
          let img = new Image();
          img.onload = function () {
            resolve()
          };
          img.src = image.lazy
          images.push(img)
        }))
      })
      return [images, promises]
    }
  },
  async mounted() {
    this.preloadImages = []
    this.observer.observe(this.$el);
    await this.db.collection('galleries').where('hidden', '!=', true).get().then(async galleriesDocs => {
      let docs = galleriesDocs.docs
      docs.sort((a, b) => {
        return a.data().order - b.data().order
      })
      for (let i = 0; i < docs.length; i++) {
        let doc = galleriesDocs.docs[i]
        let galleryObj = {
          name: doc.data().name,
          order: doc.data().order,
          hidden: doc.data().hidden,
          images: [],
          ref: doc.ref
        }
        this.galleries.push(galleryObj)
        this.galleries.sort((a, b) => {
          return a.order - b.order
        })
        console.log(this.galleries)
        await doc.ref.collection('images').get().then(imageDocs => {
          let images = imageDocs.docs.map(imageDoc => { return imageDoc.data() })
          let preload = this.preloadLazyImages(images)
          this.preloadImages.push(preload[0])
          Promise.all(preload[1]).then(
            galleryObj.images.push(...imageDocs.docs.map(imageDoc => { return imageDoc.data() }))
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
      preloadImages: [],
      galleries: [
      ],
    };
  },
};
