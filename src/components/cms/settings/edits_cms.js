import firebase from "firebase";
import "firebase/firestore";
import "firebase/app";

export default {
  name: "editsCMS",
  created() {
    this.db
      .collection("greeting")
      .get()
      .then((greetingCollection) => {
        this.greetingRef = greetingCollection.docs[0].ref;
        this.greetingText = greetingCollection.docs[0].data();
      });

    this.db
      .collection("about")
      .get()
      .then((aboutCollection) => {
        this.aboutRef = aboutCollection.docs[0].ref;
        this.aboutText = aboutCollection.docs[0].data().text;
      });

    this.db
      .collection("contact")
      .get()
      .then((contactCollection) => {
        this.contactRef = contactCollection.docs[0].ref;
        this.contactText = contactCollection.docs[0].data();
      });
  },

  data() {
    return {
      db: firebase.firestore(),
      greetingText: { top: "", center: "", bottom: "", display: true },
      greetingRef: null,
      aboutText: "",
      aboutRef: null,
      contactText: { phone: "", email: "" },
      contactRef: null,
    };
  },
  methods: {
    saveGreeting() {
      this.greetingRef.update(this.greetingText);
    },
    saveAbout() {
      this.aboutRef.update({ text: this.aboutText });
    },
    saveContact() {
      this.contactRef.update({
        phone: this.contactText.phone,
        email: this.contactText.email,
      });
    },
  },
};
