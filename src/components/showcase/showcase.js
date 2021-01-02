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
    await this.db.collection('galleries').get().then(async galleriesDocs => {
      for(let i=0; i<galleriesDocs.docs.length; i++) {
        let doc = galleriesDocs.docs[i]
        let galleryObj = {
          name: doc.data().name,
          images: [],
          ref: doc.ref
        }
        this.galleries.push(galleryObj)
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
