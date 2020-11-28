import mainCMS from "./settings/main_cms.vue";
import galleriesCMS from "./settings/galleries_cms.vue";
// import greetingCMS from "./settings/greeting_cms.vue";
// import navigationCMS from "./settings/navigation_cms.vue";
// import aboutCMS from "./settings/about_cms.vue";
// import contactCMS from "./settings/contact_cms.vue";

export default {
  name: "CMS",
  components: {
    mainCMS,
    galleriesCMS,
    // greetingCMS,
    // navigationCMS,
    // aboutCMS,
    // contactCMS,
  },

  data() {
    return {
      showCMS: true,
    };
  },
};
