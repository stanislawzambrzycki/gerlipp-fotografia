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
            "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            "https://images.unsplash.com/photo-1513207565459-d7f36bfa1222?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80",
            "https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&auto=format&fit=crop&w=630&q=80",
            "https://images.unsplash.com/photo-1526929804231-3de5919d43ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1498746607408-1e56960e3bdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1534008757030-27299c4371b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1478465726282-ddb11650c80b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1491972690050-ba117db4dc09?ixlib=rb-1.2.1&auto=format&fit=crop&w=685&q=80",
            "https://images.unsplash.com/photo-1496440543089-3d0eb669f6f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1388&q=80",
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1534957753291-64d667ce2927?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
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
