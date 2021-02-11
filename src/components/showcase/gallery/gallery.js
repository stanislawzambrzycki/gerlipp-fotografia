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
        obj: {likes: 0},
        hover: false
      },
      storage: firebase.storage().ref()
    }
  },
  methods: {
    toggleLike(image) {
      this.$store.dispatch('toggleLike', image.ref.id).then(like => {
        this.gallery.likes = this.$store.getters.likes
        let change = 0
        let newValue = 0
        if(like>-1) change = 1
        else change = -1
        if(image.likes !== undefined && image.likes > 0) newValue = image.likes + change
        else if(change===1) newValue = 1; else newValue = 0;
        image.ref.update({likes: newValue})
        image.likes = newValue
      })
    },
    openDialog(image, lazy, index, obj) {
      this.current.image = image
      this.current.lazy = lazy
      this.current.index = index
      this.current.obj = obj
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
        tmpSplitted[index].push({
          image: image.image, thumbnail: image.thumbnail, lazy: image.lazy,
          closeup: image.closeup, index: index2, height: image.height[1],
          width: image.width[1], ref: image.ref, likes: image.likes, hover: false
        })
        this.splittedHeight[index] = this.splittedHeight[index] + image.height[2]
      })
      this.splitted = tmpSplitted
      // if(!this.preloaded) {
      //   this.preloaded = true
      //   Promise.all(this.preloadImages('thumbnail')[1]).then(() => {
      //     this.preloadedImages = this.preloadImages('image')[0]
      //   })
      // }
    }
  },
  created() {
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
