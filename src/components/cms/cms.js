import mainCMS from './settings/main_cms.vue'
import galleriesCMS from './settings/galleries_cms.vue'

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
      showMainSettings: true,
      showGalleries: false
    };
  },
};
