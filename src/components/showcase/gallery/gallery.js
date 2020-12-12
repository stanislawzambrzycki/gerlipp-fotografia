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
      //prefferedWidth: 500,
      widthBreakpoints: [
        {width: 1600, preffered: 4},
        {width: 1000, preffered: 3},
        {width: 800, preffered: 1}
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
    openDialog(image, index) {
      this.current.image = image
      this.current.index = index
      this.current.show = true
    },
    getBreakPoint() {
      for(let i = 0; i<this.widthBreakpoints.length; i++) {
        if(this.$el.clientWidth>=this.widthBreakpoints[i].width) return this.widthBreakpoints[i].preffered
      }
      return 1
    },
    splitGallery() {
      //let prefferedWidth = this.getBreakPoint()
      let sections = this.getBreakPoint()
      //if(prefferedWidth > 0) Math.floor(this.$el.clientWidth / prefferedWidth)
      this.splitted = []
      for (let i = 0; i < sections; i++) this.splitted.push([])
      let index = 0
      this.gallery.images.forEach((image, index2) => {
        this.splitted[index].push({ image: image, index: index2 })
        index = index + 1
        if (sections <= index) index = 0
      })
    }
  },
  created() {
    this.gallery.images = []
    this.storage.listAll().then(result => {
      result.items.forEach(item => {
        item.getDownloadURL().then(url => {
          // var img = new Image()
          // img.onload = function() {      
          //   console.log(img.height, img.width)
          // }
          // img.src = url
          this.gallery.images.push(url)
          this.splitGallery()
        })
      })
    })
    window.addEventListener("resize", this.splitGallery);
  },
  mounted() {
    this.splitGallery()
  },
  destroyed() {
    window.removeEventListener("resize", this.splitGallery);
  },
};
