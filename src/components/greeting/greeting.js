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
    this.db
      .collection("greeting")
      .get()
      .then((greetingCollection) => {
        this.greetingText = greetingCollection.docs[0].data();
      });
  },
  data() {
    return {
      db: firebase.firestore(),
      greetingText: "",
    };
  },
};
