import mainCMS from "./settings/main_cms.vue";
import galleriesCMS from "./settings/galleries_cms.vue";
import menuCMS from "./settings/menu_cms.vue";

export default {
  name: "CMS",
  components: {
    mainCMS,
    galleriesCMS,
    menuCMS,
    // greetingCMS,
    // navigationCMS,
    // aboutCMS,
    // contactCMS,
  },

  data() {
    return {
      showCMS: true,
      showMainSettings: true,
      showGalleries: false,
      showMenu: false,
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
