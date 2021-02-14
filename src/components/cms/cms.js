import mainCMS from "./settings/main_cms.vue";
import galleriesCMS from "./settings/galleries_cms.vue";
import menuCMS from "./settings/menu_cms.vue";
import editsCMS from "./settings/edits_cms.vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth";

export default {
  name: "CMS",
  components: {
    mainCMS,
    galleriesCMS,
    menuCMS,
    editsCMS,
  },

  data() {
    return {
      showCMS: true,
      user: null,
      admins: null,
      db: firebase.firestore(),
      showComponent: {
        galleries: true,
        about: false,
      },
      showGalleries: true,
      showMenu: false,
      menubtn: {
        dark: true,
      },
    };
  },
  created() {
    setTimeout(() => { this.$store.dispatch('loginPending', false) }, 30000)
    this.user = this.$store.getters.user
    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        console.log(result)
        if (result.operationType === 'signIn')
          this.$store.dispatch('login', result.user).then(user => {
            this.user = user
            console.log('cms.js logged in', user)
            this.$store.dispatch('loginPending', false)
          });
      })
    this.db.collection("admins").get().then(adminDocs => {
      this.admins = adminDocs.docs.map(doc => { return { ...doc.data(), ref: doc.ref } })
    })
  },
  computed: {
    validUser() {
      let isLoggedIn = !!this.$store.getters.user
      let isNotAnonymous = false
      if (isLoggedIn) isNotAnonymous = !this.$store.getters.user.isAnonymous
      let adminListCreated = this.admins !== null
      let userIsAdmin = false
      if (isLoggedIn && isNotAnonymous && adminListCreated) {
        userIsAdmin = this.admins.map(admin => { return admin.email }).includes(this.$store.getters.user.email)
      }
      return userIsAdmin
    }
  },
  mounted() {
    setTimeout(() => {
      var provider = new firebase.auth.GoogleAuthProvider();
      console.log('cms.js is user set or login pending', this.$store.getters.user, this.$store.getters.loginPending)
      if (!this.$store.getters.user || this.$store.getters.user.isAnonymous) {
        if (!this.$store.getters.loginPending)
          this.$store.dispatch('loginPending', true).then(() => {
            firebase.auth().signInWithRedirect(provider);
          })
      }
    }, 0)
  },
  methods: {
    navigate(to) {
      if (to != "logout") {
        Object.keys(this.showComponent).forEach((key) => {
          this.showComponent[key] = to === key;
        });
        this.toggleMenu();
      } else {
        console.log("Logging out...");
        this.$store.dispatch('logout').then(() => {
          firebase.auth().signOut().then(() => {
            firebase.auth().signInAnonymously().then(result => {
              this.$store.dispatch('login', result.user).then(user => {
                console.log('cms.js anno', user)
                this.$router.push({ name: 'Home' })
              });
            })
          })
        })
      }
    },
    toggleMenu() {
      let menuBtn = document.querySelector(".menu-btn");
      let menu = document.querySelector(".menu");
      let menuNav = document.querySelector(".menu-nav");

      let navItems = document.querySelectorAll(".nav-item");

      if (!this.showMenu) {
        menuBtn.classList.add("close");
        menu.classList.add("show");
        menuNav.classList.add("show");
        navItems.forEach((item) => item.classList.add("show"));

        // Reset Menu State
        this.showMenu = true;
        this.menubtn.dark = true;
      } else {
        menuBtn.classList.remove("close");
        menu.classList.remove("show");
        menuNav.classList.remove("show");
        navItems.forEach((item) => item.classList.remove("show"));

        // Reset Menu State
        this.showMenu = false;

        // Reset Contact State
        this.showContact = false;
        this.menubtn.dark = this.greetingIntersect;
      }
    },
  },
};
