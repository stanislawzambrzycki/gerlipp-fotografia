import downscale from "downscale"
import firebase from "firebase"
import "firebase/firestore"
import 'firebase/app'
import 'firebase/storage'

class ImageObject {
  constructor(file) {
    this.file = file
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
          downscale(imgObject.imageList[0], 800, 0, { quality: 0.85 }).then(thumbnail => {
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
    this.galleries = (await this.db.collection('galleries').get()).docs.map(doc => {return {ref: doc.ref, ...doc.data()}})
    console.log(this.galleries)
  },
  methods: {
    swapElement(array, indexA, indexB) {
      var tmp = array[indexA];
      array[indexA] = array[indexB];
      array[indexB] = tmp;
    },
    async saveImages() {
      for(let i=0; i<this.imageObjects.length; i++) {
        let image = this.imageObjects[i]
        let imageRef = null
        let lazyRef = null
        let thumbnailRef = null
        this.selectedGallery.ref.collection('images').add({
          name: image.file.name,
          height: image.heightList,
          width: image.widthList,
          index: image.index,
          image: imageRef,
          lazy: lazyRef,
          thumbnail: thumbnailRef,
        }).then(ref => {
          console.log(ref)
          imageRef = this.storage.child('images/'+image.file.name).putString(image.imageList[0], 'data_url').then(async snapshot => {
            let url = await snapshot.ref.getDownloadURL()
            console.log(url, 'image')
            ref.update({image: url})
          })
          lazyRef = this.storage.child('lazy/'+image.file.name).putString(image.imageList[1], 'data_url').then(async snapshot => {
            let url = await snapshot.ref.getDownloadURL()
            console.log(url, 'lazy')
            ref.update({lazy: url})
          })
          thumbnailRef = this.storage.child('thumbnails/'+image.file.name).putString(image.imageList[2], 'data_url').then(async snapshot => {
            let url = await snapshot.ref.getDownloadURL()
            console.log(url, 'thumbnail')
            ref.update({thumbnail: url})
          })
        })
      }
    },
    changeImage() {
      if (this.imageIndex === 2) this.imageIndex = 0;
      else this.imageIndex++
      console.log(this.imageIndex)
    },
    eventHandler(images) {
      this.imageObjects = []
      console.log(images)
      images.forEach(image => {
        new ImageObject(image).ready.then((imageObj) => {
          this.imageObjects.push(imageObj)
          imageObj.index = this.imageObjects.length - 1
          console.log(this.imageObjects)
        })
      })
    },
  }
};
