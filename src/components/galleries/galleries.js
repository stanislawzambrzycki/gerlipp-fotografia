import Gallery from "./gallery/gallery.vue";

export default {
    name: 'Galleries',
    components: {
        Gallery
    },
    data() {
        return {
            tab: null,
            galleries: [{name: "portrety", images: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg", 2, 3, 4]}, {name: "podróże", images: [1, 2, 3]}]
        }
    }
}