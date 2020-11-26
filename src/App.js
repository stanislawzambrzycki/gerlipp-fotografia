import About from "./components/about/about.vue";
import Contact from "./components/contact/contact.vue";
import Showcase from "./components/showcase/showcase.vue";
import Greeting from "./components/greeting/greeting.vue";
import Menu from "./components/menu/menu.vue";
import CMS from "./components/cms/cms.vue";

export default {
  name: "App",

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
      showCMS: true,
    };
  },
  methods: {
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
      } else {
        menuBtn.classList.remove("close");
        menu.classList.remove("show");
        menuNav.classList.remove("show");
        navItems.forEach((item) => item.classList.remove("show"));

        // Reset Menu State
        this.showMenu = false;

        // Reset Contact State
        this.showContact = false;
      }
    },
  },
};
