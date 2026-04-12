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
    resolveImageSource(image, fields) {
      for (let i = 0; i < fields.length; i++) {
        let value = image[fields[i]]
        if (typeof value === "string" && value.trim()) return value
      }
      return ""
    },
    getResponsiveValue(values, index, fallback) {
      if (Array.isArray(values) && values.length > index) {
        let value = Number(values[index])
        if (!Number.isNaN(value)) return value
      }
      return fallback
    },
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
        let displayImage = this.resolveImageSource(image, ["image", "thumbnail", "lazy", "closeup"])
        let thumbnail = this.resolveImageSource(image, ["thumbnail", "lazy", "image", "closeup"])
        let lazy = this.resolveImageSource(image, ["lazy", "thumbnail", "image", "closeup"])
        let closeup = this.resolveImageSource(image, ["closeup", "image", "thumbnail", "lazy"])

        if (!displayImage && !thumbnail && !lazy && !closeup) return

        index = this.splittedHeight.indexOf(Math.min(...this.splittedHeight))
        tmpSplitted[index].push({
          image: displayImage || thumbnail || lazy || closeup,
          thumbnail: thumbnail || displayImage || lazy || closeup,
          lazy: lazy || thumbnail || displayImage || closeup,
          closeup: closeup || displayImage || thumbnail || lazy,
          index: index2,
          height: this.getResponsiveValue(image.height, 1, 0),
          width: this.getResponsiveValue(image.width, 1, 0),
          ref: image.ref,
          likes: image.likes,
          hover: false
        })
        this.splittedHeight[index] = this.splittedHeight[index] + this.getResponsiveValue(image.height, 2, 0)
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
