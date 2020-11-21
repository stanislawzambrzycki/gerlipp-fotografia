export default {
    name: 'About',
    props: {
      observer: IntersectionObserver
    },
    mounted() {
      this.observer.observe(this.$el);
    }
  }
  