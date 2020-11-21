import DialogComponent from "./dialog/dialog.vue"

export default {
  name: "Gallery",
  components: { DialogComponent },
  props: {
    gallery: Object,
  },
  data() {
    return {
      splitted: [],
      prefferedWidth: 600,
      current: {
        image: "",
        show: false,
        index: 0
      }
    }
  },
  methods: {
    openDialog(image, index) {
      this.current.image = image
      this.current.index = index
      this.current.show = true
    },
    splitGallery() {
      let sections = Math.floor(this.$el.clientWidth / this.prefferedWidth)
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
    window.addEventListener("resize", this.splitGallery);
  },
  mounted() {
    this.splitGallery()
  },
  destroyed() {
    window.removeEventListener("resize", this.splitGallery);
  },
};
