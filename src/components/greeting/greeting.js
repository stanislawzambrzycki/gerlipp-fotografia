export default {
    name: 'Greeting',
    props: {
      observer: IntersectionObserver
    },
    mounted() {
      this.observer.observe(this.$el);
    }
  }
  