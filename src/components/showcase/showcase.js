import Gallery from "./gallery/gallery.vue";

export default {
  name: "Showcase",
  props: {
    observer: IntersectionObserver
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  components: {
    Gallery,
  },
  data() {
    return {
      tab: null,
      galleries: [
        {
          name: "portrety",
          images: [
          ],
        },
        {
          name: "podróże",
          images: [
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
          ],
        },
      ],
    };
  }
};
