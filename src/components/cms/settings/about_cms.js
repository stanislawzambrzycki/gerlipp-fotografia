import firebase from "firebase";
import "firebase/firestore";
import "firebase/app";

export default {
  name: "aboutCMS",
  created() {
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
      aboutText: "",
      aboutRef: null,
      contactText: "",
      contactRef: [],
    };
  },
  methods: {
    saveAbout() {
      this.aboutRef.update({ text: this.aboutText });
    },
    saveContact() {
      this.aboutRef.update({ text: this.aboutText.phone });
      this.aboutRef.update({ text: this.aboutText.email });
    },
  },
};
