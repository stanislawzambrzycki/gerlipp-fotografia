import firebase from "firebase"
import "firebase/firestore"
import 'firebase/app'

export default {
    name: "aboutCMS",
    created() {
        this.db.collection('about').get().then(aboutCollection => {
            this.aboutRef = aboutCollection.docs[0].ref
            this.aboutText = aboutCollection.docs[0].data().text
        })
    },
    data() {
        return {
            db: firebase.firestore(),
            aboutText: "",
            aboutRef: null
        }
    },
    methods: {
        saveAbout() {
            this.aboutRef.update({text: this.aboutText})
        }
    },
};
