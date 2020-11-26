export default {
    name: 'Contact',
    props: {
      observer: IntersectionObserver
    },
    mounted() {
      this.observer.observe(this.$el);
    }
  }
  