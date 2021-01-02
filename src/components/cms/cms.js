import mainCMS from "./settings/main_cms.vue";
import galleriesCMS from "./settings/galleries_cms.vue";
import menuCMS from "./settings/menu_cms.vue";
import aboutCMS from "./settings/about_cms.vue";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default {
  name: "CMS",
  components: {
    mainCMS,
    galleriesCMS,
    menuCMS,
    aboutCMS
  },

  data() {
    return {
      showCMS: true,
      showComponent: {
        main: true,
        galleries: false,
        about: false
      },
      showMainSettings: true,
      showGalleries: false,
      showMenu: false,
      menubtn: {
        dark: true,
      },
    };
  },
  methods: {
    navigate(to) {
      if(to!='logout') {
        Object.keys(this.showComponent).forEach(key => {
          this.showComponent[key] = to===key
        })
        this.toggleMenu()
      } else {
        console.log('Logging out...')
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
