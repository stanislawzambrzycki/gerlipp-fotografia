import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';

export default {
  name: "Gallery",
  props: {
    gallery: Object,
  },
  data() {
    return {
      splitted: [],
      splittedHeight: [],
      preloadedImages: [],
      preloaded: false,
      //prefferedWidth: 500,
      widthBreakpoints: [
        {width: 1600, preffered: 4},
        {width: 1000, preffered: 3},
        {width: 800, preffered: 1}
      ],
      current: {
        image: "",
        show: false,
        index: 0,
      },      
      storage: firebase.storage().ref()
    }
  },
  methods: {
    openDialog(image, lazy, index) {
      this.current.image = image
      this.current.lazy = lazy
      this.current.index = index
      this.current.show = true
    },
    preloadImages(type) {
      let images = []      
      let promises = []      
      this.gallery.images.forEach(image => {
        promises.push(new Promise( resolve => {
          let img = new Image();
          img.onload = function () {
            resolve()
          };
          img.src = image[type]
          images.push(img)
        }))
      })
      return [images, promises]
    },
    getBreakPoint() {
      for(let i = 0; i<this.widthBreakpoints.length; i++) {
        if(this.$el.clientWidth>=this.widthBreakpoints[i].width) return this.widthBreakpoints[i].preffered
      }
      return 1
    },
    deletePhoto(image) {
      console.log(image)
      let list = ['images/', 'lazy/', 'closeups/', 'thumbnails/']
      list.forEach(folder => {
        let child = this.storage.child(folder+image.name)
        child.delete().then(() => {
          console.log(folder+image.name+" deleted sucessfully")
        }).catch((error) => {
          console.log(error)
        });
      })
      image.ref.delete().then(() => {
        console.log(image.name+" deleted sucessfully from db")
      })
      this.gallery.images = this.gallery.images.filter(item => {return item.name !== image.name})
    },
    allowDrop(ev) {
      ev.preventDefault();
    },    
    drag(ev) {
      ev.dataTransfer.setData("index", ev.target.getAttribute('data-index'));
    },    
    drop(ev) {
      ev.preventDefault();
      let fromIndex = ev.dataTransfer.getData("index");
      let toIndex = ev.target.parentElement.parentElement.parentElement.getAttribute('data-index');
      let from = this.gallery.images[fromIndex]
      let to = this.gallery.images[toIndex]
      from.index = toIndex;
      to.index = fromIndex;
      let tmpFrom = {...from}
      let tmpTo = {...to}
      delete tmpFrom.ref
      delete tmpTo.ref
      from.ref.update(tmpFrom)
      to.ref.update(tmpTo)
      this.gallery.images.sort((a, b) => {return a.index-b.index})
      this.splitGallery()
    },
    splitGallery() {
      let sections = this.getBreakPoint()
      let tmpSplitted = []
      this.splitted = []
      this.splittedHeight = []
      for (let i = 0; i < sections; i++) {
        tmpSplitted.push([])
        this.splittedHeight.push(0)
      }
      let index = 0
      this.gallery.images.forEach((image, index2) => {
        index = this.splittedHeight.indexOf(Math.min(...this.splittedHeight))
        tmpSplitted[index].push({ image: image.image, thumbnail: image.thumbnail, lazy: image.lazy, index: index2, parent: image })
        this.splittedHeight[index] = this.splittedHeight[index] + image.height[2]
      })
      this.splitted = tmpSplitted
      // if(!this.preloaded) {        
      //   Promise.all(this.preloadImages('thumbnail')[1]).then(() => {
      //     this.preloadedImages = this.preloadImages('image')[0]
      //     this.preloaded = true
      //   })
      // }
    }
  },
  created() {
    window.addEventListener("resize", this.splitGallery);
  },
  mounted() {
    this.splitGallery()
  },
  destroyed() {
    window.removeEventListener("resize", this.splitGallery);
  },
};
