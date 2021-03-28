export default {
    name: "Dialog",
    props: {
        gallery: Object,
        current: Object
    },
    data() {
        return {
            show: false,
            height: "90%",
            width: "100%",
            full: false,
            likeHover: false
        }
    },
    computed: {
        computedHeight(){
            console.log(this.full)
            if(this.full) return "calc(100% - 2px)"
            else return "100%"
        },
    },
    methods: {
        inLikes() {
            let returnValue = false
            if(this.gallery.images[this.current.index])
                returnValue = this.gallery.likes.includes(this.gallery.images[this.current.index].ref.id)
            return returnValue
        },
        toggleLike() {
          let image = this.gallery.images[this.current.index]
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
        previous() {
            let index = this.current.index - 1
            if (index < 0) index = this.gallery.images.length - 1
            this.current.index = index
            this.current.image = this.gallery.images[index].closeup
            this.current.lazy = this.gallery.images[index].lazy
            this.current.obj = this.gallery.images[index]
        },
        next() {
            let index = this.current.index + 1
            if (this.gallery.images.length <= index) index = 0
            this.current.index = index
            this.current.image = this.gallery.images[index].closeup
            this.current.lazy = this.gallery.images[index].lazy
            this.current.obj = this.gallery.images[index]
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
