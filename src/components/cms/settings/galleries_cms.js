import downscale from "downscale"
import Gallery from "./gallery.vue";
import firebase from "firebase"
import "firebase/firestore"
import 'firebase/app'
import 'firebase/storage'

class ImageObject {
  constructor(file) {
    this.file = file
    this.thumbnail = null
    this.lazy = null
    this.imageList = []
    this.lengthList = []
    this.compressionList = []
    this.widthList = []
    this.heightList = []
    this.index = 0
    this.ready = new Promise((imageReady) => {
      const reader = new FileReader();
      let imgObject = this
      reader.addEventListener("load", function () {
        imgObject.imageList.push(reader.result)
        downscale(imgObject.imageList[0], 400, 0, { quality: 0.80 }).then(lazyThumbnail => {
          imgObject.imageList.push(lazyThumbnail)
          imgObject.lazy = lazyThumbnail
          downscale(imgObject.imageList[0], 800, 0, { quality: 0.85 }).then(thumbnail => {
            imgObject.thumbnail = thumbnail
            imgObject.imageList.push(thumbnail)
            imgObject.imageList.forEach(image => {
              imgObject.lengthList.push(image.length)
              imgObject.compressionList.push(Math.floor((image.length / imgObject.lengthList[0]) * 100) + "%")
              const img = new Image();
              img.onload = function () {
                imgObject.widthList.push(img.width)
                imgObject.heightList.push(img.height)
              };
              img.src = image;
            })
            imageReady(imgObject)
          })
        })
      }, false);
      reader.readAsDataURL(file);
    })
  }
}

export default {
  name: "galleries_CMS",
  components: {
    Gallery
  },
  data() {
    return {
      db: firebase.firestore(),
      storage: firebase.app().storage().ref(),
      files: [],
      galleries: [],
      selectedGallery: null,
      imageObjects: [],
      imageIndex: 0
    }
  },
  async mounted() {
    await this.db.collection('galleries').get().then(async galleriesDocs => {
      for (let i = 0; i < galleriesDocs.docs.length; i++) {
        let doc = galleriesDocs.docs[i]
        let galleryObj = {
          name: doc.data().name,
          images: [],
          ref: doc.ref
        }
        this.galleries.push(galleryObj)
        await doc.ref.collection('images').get().then(imageDocs => {
          galleryObj.images.push(...imageDocs.docs.map(imageDoc => { return {...imageDoc.data(), ref: imageDoc.ref} }))
          if(this.$refs.gallery) this.$refs.gallery.forEach(gal => { gal.splitGallery() })
        })
      }
    })
  },
  methods: {
    swapElement(array, indexA, indexB) {
      var tmp = array[indexA];
      array[indexA] = array[indexB];
      array[indexB] = tmp;
    },
    async saveImages() {
      for (let i = 0; i < this.imageObjects.length; i++) {
        let image = this.imageObjects[i]
        let imageRef = null
        let lazyRef = null
        let thumbnailRef = null
        let imgObj = {
          name: image.file.name,
          height: image.heightList,
          width: image.widthList,
          index: image.index,
          image: imageRef,
          lazy: lazyRef,
          thumbnail: thumbnailRef,
        }
        this.selectedGallery.ref.collection('images').add(imgObj).then(ref => {
          this.selectedGallery.images.push(imgObj)
          console.log(ref)
          imageRef = this.storage.child('images/' + image.file.name).putString(image.imageList[0], 'data_url').then(async snapshot => {
            let url = await snapshot.ref.getDownloadURL()
            console.log(url, 'image')
            ref.update({ image: url })
            imgObj.image = url
          })
          lazyRef = this.storage.child('lazy/' + image.file.name).putString(image.imageList[1], 'data_url').then(async snapshot => {
            let url = await snapshot.ref.getDownloadURL()
            console.log(url, 'lazy')
            ref.update({ lazy: url })
            imgObj.lazy = url
          })
          thumbnailRef = this.storage.child('thumbnails/' + image.file.name).putString(image.imageList[2], 'data_url').then(async snapshot => {
            let url = await snapshot.ref.getDownloadURL()
            console.log(url, 'thumbnail')
            ref.update({ thumbnail: url })
            imgObj.thumbnail = url
          })
        })
      }
    },
    changeImage() {
      if (this.imageIndex === 2) this.imageIndex = 0;
      else this.imageIndex++
      console.log(this.imageIndex)
    },
    repairGallery() {
      console.log(this.selectedGallery)
      this.selectedGallery.images.forEach((image, index) => {
        console.log(image, index)
        image.index = index
        image.height = [0, 0, 0]
        image.width = [0, 0, 0]
        let imagePromise = this.setHeightAndWidth(image, 0, 'image')
        let lazyPromise = this.setHeightAndWidth(image, 1, 'lazy')
        let thumbnailPromise = this.setHeightAndWidth(image, 2, 'thumbnail')
        Promise.all([imagePromise, lazyPromise, thumbnailPromise]).then(()=> {
          let imgObject = {...image}
          delete imgObject.ref
          image.ref.update(imgObject)
          console.log(imgObject, image)
        })
      })
    },
    setHeightAndWidth(image, index, key) {
      return new Promise( resolve => {
        const img = new Image();
        img.onload = function () {
          image.height[index] = img.height
          image.width[index] = img.width
          resolve()
        };
        img.src = image[key];
      })
    },
    eventHandler(images) {
      this.imageObjects = []
      console.log(images)
      images.forEach(image => {
        new ImageObject(image).ready.then((imageObj) => {
          this.imageObjects.push(imageObj)
          imageObj.index = this.selectedGallery.images.length + this.imageObjects.length - 2
          console.log(this.imageObjects)
        })
      })
    },
  }
};
