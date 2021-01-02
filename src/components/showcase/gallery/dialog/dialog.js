export default {
    name: "Dialog",
    props: {
        gallery: Object,
        current: Object,
    },
    data() {
        return {
            show: false,
            height: "90%",
            width: "100%",
            full: false
        }
    },
    methods: {
        previous() {
            let index = this.current.index - 1
            if (index < 0) index = this.gallery.images.length - 1
            this.current.index = index
            this.current.image = this.gallery.images[index].thumbnail
            this.current.lazy = this.gallery.images[index].lazy
        },
        next() {
            let index = this.current.index + 1
            if (this.gallery.images.length <= index) index = 0
            this.current.index = index
            this.current.image = this.gallery.images[index].thumbnail
            this.current.lazy = this.gallery.images[index].lazy
        },
        fullscreen() {
            var elem = this.$el
            if (this.full) this.closeFullscreen()
            else this.openFullscreen(elem)
        },
        /* Open fullscreen */
        openFullscreen(elem) {
            this.height = "100%"
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
            this.full = true
        },

        /* Close fullscreen */
        closeFullscreen() {
            if (this.full) {
                this.height = "90%"
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
                this.full = false
            }
        }
    }
};
