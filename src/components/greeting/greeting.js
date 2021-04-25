import firebase from "firebase";
import "firebase/firestore";
import "firebase/app";

export default {
  name: "Greeting",
  props: {
    observer: IntersectionObserver,
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  created() {
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler()
    this.db.doc('/greeting/VA6ZHoo8Io8pCscEB0NI').onSnapshot(change => {
      this.greetingText = change.data()
    })
  },
  methods: {
    resizeHandler() {
      let userRatio = window.innerWidth/window.innerHeight
      let index = 0
      let commonRatio = this.commonRatios[index].ratio
      while(userRatio > commonRatio && index<=this.commonRatios.length-1) {
        index++
        commonRatio = this.commonRatios[index].ratio
      }
      this.imageNumber = index
      this.windowHeight = window.innerHeight
    }
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.resizeHandler); 
  },
  data() {
    return {
      db: firebase.firestore(),
      greetingText: "",
      imageNumber: 0,
      windowHeight: window.innerHeight,
      commonRatios: [
        { width: 1, height: 2, ratio: 1 / 2 }, //1 0,5
        //{ width: 9, height: 16, ratio: 9 / 16 }, //2 0,5625
        { width: 3, height: 4, ratio: 3 / 4 }, //3 0,75
        { width: 5, height: 4, ratio: 5 / 4 }, //4 1,25
        { width: 4, height: 3, ratio: 4 / 3 }, //5 1,33333333333333
        { width: 8, height: 5, ratio: 8 / 5 }, //6 1,6
        { width: 16, height: 9, ratio: 16 / 9 }, //7 1,77777777777778
      ]
    };
  },
};
