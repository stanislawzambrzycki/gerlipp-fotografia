export default {
    name: "Dialog",
    props: {
        gallery: Object,
        current: Object,
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        toggle(image) {
            this.image = image;
            this.show = true;
        }
    }
};
