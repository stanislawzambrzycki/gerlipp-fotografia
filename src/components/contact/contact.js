import firebase from "firebase";
import "firebase/firestore";
import "firebase/app";

export default {
  name: "Contact",
  props: {
    observer: IntersectionObserver,
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  created() {
    this.db
      .collection("contact")
      .get()
      .then((contactCollection) => {
        this.contactText = contactCollection.docs[0].data();
      });
  },
  data() {
    return {
      db: firebase.firestore(),
      contactText: "",
    };
  },
};
