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
      authResolved: false,
      authError: "",
      unsubscribeAuth: null,
    };
  },
  created() {
    setTimeout(() => { this.$store.dispatch('loginPending', false) }, 30000)
    this.user = this.$store.getters.user
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      this.user = user
      if (user) {
        this.$store.dispatch('login', user)
        if (!user.isAnonymous) {
          this.$store.dispatch('loginPending', false)
        }
      } else {
        this.$store.dispatch('logout')
      }
      this.authResolved = true
    })
    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        if (result && result.operationType === 'signIn' && result.user)
          this.$store.dispatch('login', result.user).then(user => {
            this.user = user
            this.$store.dispatch('loginPending', false)
          });
        else if (firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) {
          this.$store.dispatch('login', firebase.auth().currentUser).then(user => {
            this.user = user
          })
          this.$store.dispatch('loginPending', false)
        } else {
          this.$store.dispatch('loginPending', false)
        }
      })
      .catch(error => {
        this.authError = error && error.message ? error.message : 'Google sign-in could not be completed.'
        this.$store.dispatch('loginPending', false)
      })
      .finally(() => {
        this.authResolved = true
      })
    this.db.collection("admins").get().then(adminDocs => {
      this.admins = adminDocs.docs.map(doc => { return { ...doc.data(), ref: doc.ref } })
    }).catch(error => {
      this.authError = error && error.message ? error.message : 'The admin allowlist could not be loaded.'
      this.admins = []
    })
  },
  beforeDestroy() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth()
      this.unsubscribeAuth = null
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.user
    },
    validUser() {
      let isLoggedIn = !!this.currentUser
      let isNotAnonymous = false
      if (isLoggedIn) isNotAnonymous = !this.currentUser.isAnonymous
      let adminListCreated = this.admins !== null
      let userIsAdmin = false
      if (isLoggedIn && isNotAnonymous && adminListCreated) {
        userIsAdmin = this.admins.map(admin => { return admin.email }).includes(this.currentUser.email)
      }
      return userIsAdmin
    },
    needsLogin() {
      return !this.currentUser || this.currentUser.isAnonymous
    },
    isResolvingAccess() {
      return !this.authResolved || this.admins === null
    }
  },
  methods: {
    startAdminLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      this.authError = ""
      this.authResolved = false
      const auth = firebase.auth()

      return this.$store.dispatch('loginPending', true).then(() => {
        const startPopupLogin = () => auth.signInWithPopup(provider).then(result => {
          if (result && result.user) {
            return this.$store.dispatch('login', result.user).then(() => {
              this.user = result.user
              this.authResolved = true
              return this.$store.dispatch('loginPending', false)
            })
          }

          this.authResolved = true
          return this.$store.dispatch('loginPending', false)
        }).catch(error => {
          const popupFallbackErrors = [
            'auth/popup-blocked',
            'auth/popup-closed-by-user',
            'auth/cancelled-popup-request',
            'auth/web-storage-unsupported'
          ]

          if (popupFallbackErrors.includes(error.code)) {
            return auth.signInWithRedirect(provider)
          }

          throw error
        })

        if (auth.currentUser) {
          return auth.signOut().then(() => {
            this.$store.dispatch('logout')
            return startPopupLogin()
          })
        }

        this.$store.dispatch('logout')
        return startPopupLogin()
      }).catch(error => {
        this.authResolved = true
        this.authError = error && error.message ? error.message : 'Google sign-in could not be started.'
        return this.$store.dispatch('loginPending', false)
      })
    },
    navigateHome() {
      this.$router.push({ name: 'Home' })
    },
    logoutAndRetry() {
      this.authError = ""
      this.$store.dispatch('logout').then(() => {
        firebase.auth().signOut().finally(() => {
          this.startAdminLogin()
        })
      })
    },
    navigate(to) {
      if (to != "logout") {
        Object.keys(this.showComponent).forEach((key) => {
          this.showComponent[key] = to === key;
        });
        this.toggleMenu();
      } else {
        this.$store.dispatch('logout').then(() => {
          firebase.auth().signOut().then(() => {
            firebase.auth().signInAnonymously().then(result => {
              this.$store.dispatch('login', result.user).then(() => {
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
