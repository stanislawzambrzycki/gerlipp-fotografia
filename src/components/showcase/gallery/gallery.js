import DialogComponent from "./dialog/dialog.vue"
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';

export default {
  name: "Gallery",
  components: { DialogComponent },
  props: {
    gallery: Object,
  },
  data() {
    return {
      splitted: [],
      splittedHeight: [],
      preloadedImages: [],
      preloaded: false,
      //prefferedWidth: 500,
      widthBreakpoints: [
        { width: 1600, preffered: 4 },
        { width: 1000, preffered: 3 },
        { width: 800, preffered: 1 }
      ],
      current: {
        image: "",
        show: false,
        index: 0,
      },
      storage: firebase.storage().ref()
    }
  },
  methods: {
    openDialog(image, lazy, index) {
      this.current.image = image
      this.current.lazy = lazy
      this.current.index = index
      this.current.show = true
    },
    preloadImages(type) {
      let images = []      
      let promises = []      
      this.gallery.images.forEach(image => {
        promises.push(new Promise( resolve => {
          let img = new Image();
          img.onload = function () {
            resolve()
          };
          img.src = image[type]
          images.push(img)
        }))
      })
      return [images, promises]
    },
    getBreakPoint() {
      for (let i = 0; i < this.widthBreakpoints.length; i++) {
        if (this.$el.clientWidth >= this.widthBreakpoints[i].width) return this.widthBreakpoints[i].preffered
      }
      return 1
    },
    splitGallery() {
      let sections = this.getBreakPoint()
      let tmpSplitted = []
      this.splitted = []
      this.splittedHeight = []
      for (let i = 0; i < sections; i++) {
        tmpSplitted.push([])
        this.splittedHeight.push(0)
      }
      let index = 0
      this.gallery.images.forEach((image, index2) => {
        index = this.splittedHeight.indexOf(Math.min(...this.splittedHeight))
        tmpSplitted[index].push({ image: image.image, thumbnail: image.thumbnail, lazy: image.lazy, index: index2 })
        this.splittedHeight[index] = this.splittedHeight[index] + image.height[2]
      })
      this.splitted = tmpSplitted
      console.log('Gallery '+this.gallery.name+' was splitted!')
      // if(!this.preloaded) {        
      //   Promise.all(this.preloadImages('thumbnail')[1]).then(() => {
      //     this.preloadedImages = this.preloadImages('image')[0]
      //     this.preloaded = true
      //   })
      // }
    }
  },
  created() {
    console.log(this.gallery)
    window.addEventListener("resize", this.splitGallery);
  },
  destroyed() {
    window.removeEventListener("resize", this.splitGallery);
  },
  watch: {
    'gallery.images.length'() {
      this.splitGallery()
    },
    gallery() {
      this.splitGallery()
    }
  }
};
