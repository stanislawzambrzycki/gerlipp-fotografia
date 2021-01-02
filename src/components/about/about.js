import firebase from "firebase"
import "firebase/firestore"
import 'firebase/app'

export default {
    name: 'About',
    props: {
      observer: IntersectionObserver
    },
    mounted() {
      this.observer.observe(this.$el);
    },
    created() {
      this.db.collection('about').get().then(aboutCollection => {
        this.aboutText = aboutCollection.docs[0].data().text
      })
    },
    data() {
      return {
        db: firebase.firestore(),
        aboutText: ""
      }
    }
  }
  