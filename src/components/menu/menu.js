export default {
  name: "menuComponent",
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleClass(isIntersecting, name) {
      if(isIntersecting) this.$refs[name].classList.add('current')
      else this.$refs[name].classList.remove('current')
      //console.log(name, isIntersecting, this.$refs[name].classList)
    },
    toggleMenu(force = false) {
      let menuBtn = document.querySelector(".menu-btn");
      let menu = document.querySelector(".menu");
      let menuNav = document.querySelector(".menu-nav");

      let navItems = document.querySelectorAll(".nav-item");

      if (!this.showMenu && !force) {
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
}
