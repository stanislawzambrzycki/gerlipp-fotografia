import DialogComponent from "./dialog/dialog.vue"

export default {
  name: "Gallery",
  components: { DialogComponent },
  props: {
    gallery: Object,
  },
  data() {
    return {
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
    }
  }
};
