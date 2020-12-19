import Gallery from "./gallery/gallery.vue";
import firebase from "firebase"
import "firebase/firestore"
import 'firebase/app'

export default {
  name: "Showcase",
  props: {
    observer: IntersectionObserver,
  },
  async mounted() {
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
          galleryObj.images.push(...imageDocs.docs.map(imageDoc => { return imageDoc.data() }))
          this.$refs.gallery.forEach(gal => {gal.splitGallery()})
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
      galleries: [
        // {
        //   name: "portraits",
        //   images: [],
        // },
        // {
        //   name: "landscapes",
        //   images: [
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //     "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        //   ],
        // },
      ],
    };
  },
};
