import VueScrollTo  from "vue-scrollto";
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';

import About from "../components/about/about.vue";
import Contact from "../components/contact/contact.vue";
import Showcase from "../components/showcase/showcase.vue";
import Greeting from "../components/greeting/greeting.vue";
import Menu from "../components/menu/menu.vue";
import CMS from "../components/cms/cms.vue";

export default {
  name: "Home",

  components: {
    About,
    Contact,
    Showcase,
    Greeting,
    Menu,
    CMS,
  },

  data() {
    return {
      showMenu: false,
      observer: null,
      menubtn: {
        dark: true
      },
      greetingIntersect: false,
      db: firebase.firestore(),
    };
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  created() {
    this.observer = new IntersectionObserver(
      this.onElementObserved,
      {
        root: this.$el,
        threshold: 0,
      }
    );
  },
  mounted() {
  },
  methods: {
    navigate(to) {
      VueScrollTo.scrollTo(this.$refs[to].$el)
    },
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        const name = target.getAttribute("data-name")
        this.$refs.menu.toggleClass(isIntersecting, name)
        if(name==='greeting') { 
          this.greetingIntersect = isIntersecting
          this.menubtn.dark = isIntersecting || this.showMenu
        }
      });
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
        this.menubtn.dark = this.greetingIntersect
      }
    },
  },
};
