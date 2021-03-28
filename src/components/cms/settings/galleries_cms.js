import downscale from "downscale"
import Gallery from "./components/gallery/gallery.vue";
import HomepageDialog from "./components/homepageDialog/dialog.vue";
import firebase from "firebase"
import "firebase/firestore"
import 'firebase/app'
import 'firebase/storage'

class ImageObject {
  constructor(file) {
    let promises = []
    this.createCloseup = true
    this.file = file
    this.thumbnail = null
    this.lazy = null
    this.imageList = []
    this.lengthList = []
    this.compressionList = []
    this.width = []
    this.height = []
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
              promises.push(new Promise(resolve => {
                const img = new Image();
                img.onload = function () {
                  imgObject.width.push(img.width)
                  imgObject.height.push(img.height)
                  resolve([img.width, img.height])
                };
                img.src = image;

              }))
            })
            Promise.all(promises).then((dims) => {
              let width = 0
              let height = 0
              let scale = true
              if (dims[0][0] > 1600 && dims[0][0] >= dims[0][1]) width = 1600;
              else if (dims[0][1] > 1600 && dims[0][0] <= dims[0][1]) height = 1600;
              else scale = false
              if (scale) {
                downscale(imgObject.imageList[0], width, height, { quality: 0.85 }).then(closeup => {
                  imgObject.closeup = closeup
                  imgObject.imageList.push(closeup)
                  imgObject.lengthList.push(closeup.length)
                  imgObject.compressionList.push(Math.floor((closeup.length / imgObject.lengthList[0]) * 100) + "%")
                  let loadImage = new Promise(resolve => {
                    const img = new Image();
                    img.onload = function () {
                      imgObject.width.push(img.width)
                      imgObject.height.push(img.height)
                      resolve([img.width, img.height])
                    };
                    img.src = closeup;
                  })
                  loadImage.then(() => {
                    imageReady(imgObject)
                  })
                })
              }
              else {
                imgObject.createCloseup = false
                imageReady(imgObject)
              }
            })
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
    Gallery, HomepageDialog
  },
  data() {
    return {
      db: firebase.firestore(),
      storage: firebase.app().storage().ref(),
      files: [],
      galleries: [],
      selectedGallery: null,
      imageObjects: [],
      imageIndex: 0,
      unsaved: false,
      settingsSaving: false,
      imagesSaving: false,
      deleteQuestionDialog: false
    }
  },
  beforeRouteLeave (to, from, next) {
    // If the form is dirty and the user did not confirm leave,
    // prevent losing unsaved changes by canceling navigation
    if (this.confirmStayInDirtyForm()){
      next(false)
    } else {
      // Navigate to next view
      next()
    }
  },
  created() {
    window.addEventListener('beforeunload', this.beforeWindowUnload)
  },
  
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.beforeWindowUnload)
  },
  async mounted() {
    await this.db.collection('galleries').get().then(async galleriesDocs => {
      let docs = galleriesDocs.docs
      docs.sort((a, b) => {
        return a.data().order - b.data().order
      })
      for (let i = 0; i < docs.length; i++) {
        let doc = docs[i]
        let galleryObj = {
          name: doc.data().name,
          order: doc.data().order,
          hidden: doc.data().hidden,
          images: [],
          ref: doc.ref
        }
        this.galleries.push(galleryObj)
        await doc.ref.collection('images').get().then(imageDocs => {
          galleryObj.images.push(...imageDocs.docs.map(imageDoc => { return { ...imageDoc.data(), ref: imageDoc.ref } }))
          galleryObj.images.sort((a, b) => { return a.index - b.index })
          let dimensions = galleryObj.images.map(image => { return image.width[0] })
          dimensions.sort((a, b) => { return a - b })
          console.log(dimensions)
          if (this.$refs.gallery) {
            if(this.$refs.gallery.length) this.$refs.gallery.forEach(gal => { gal.splitGallery() })
            else this.$refs.gallery.splitGallery()
          }
        })
      }
    })
  },
  methods: {
    confirmLeave() {
      return window.confirm('Do you really want to leave? You have unsaved changes!')
    },
  
    confirmStayInDirtyForm() {
      return this.imageObjects.length > 0 && !this.confirmLeave()
    },
  
    beforeWindowUnload(e) {
      if (this.confirmStayInDirtyForm()) {
        // Cancel the event
        e.preventDefault()
        // Chrome requires returnValue to be set
        e.returnValue = ''
      }   
    },
    swapElement(array, indexA, indexB) {
      var tmp = array[indexA];
      array[indexA] = array[indexB];
      array[indexB] = tmp;
    },
    saveSettings() {
      this.settingsSaving = true
      this.selectedGallery.ref.update({
        name: this.selectedGallery.name,
        order: this.selectedGallery.order,
        hidden: this.selectedGallery.hidden ? this.selectedGallery.hidden : false
      }).then(() => {
        this.settingsSaving = false
      })
    },
    deleteGallery() {
      if (this.selectedGallery.images && this.selectedGallery.images.length > 0) {
        this.deleteQuestionDialog = true
      } else {
        this.selectedGallery.ref.delete().then(() => {
          this.galleries.splice(this.galleries.indexOf(this.selectedGallery), 1)
          this.selectedGallery = null
        })
      }
    },
    createGallery() {
      this.selectedGallery = {
        name: "New gallery",
        order: this.galleries.length + 1,
        hidden: true,
        images: []
      }
      this.db.collection('galleries').add(this.selectedGallery).then(ref => {
        this.selectedGallery.ref = ref
        this.galleries.push(this.selectedGallery)
      })
    },
    async saveImages() {
      this.imagesSaving = true
      let promises = []
      for (let i = 0; i < this.imageObjects.length; i++) {
        let image = this.imageObjects[i]
        let imageRef = null
        let lazyRef = null
        let thumbnailRef = null
        let closeupRef = null
        let imgObj = {
          name: image.file.name,
          height: image.height,
          width: image.width,
          index: image.index,
          image: imageRef,
          lazy: lazyRef,
          thumbnail: thumbnailRef,
          closeup: closeupRef,
        }
        let addProm = this.selectedGallery.ref.collection('images').add(imgObj).then(ref => {
          this.selectedGallery.images.push(imgObj)
          let newName = this.randomizeName(image.file.name)
          imageRef = this.storage.child('images/' + newName).putString(image.imageList[0], 'data_url').then(async snapshot => {
            let url = await snapshot.ref.getDownloadURL()
            if (image.createCloseup) ref.update({ image: url })
            else {
              ref.update({ image: url, closeup: url })
              imgObj.closeup = url
            }
            imgObj.image = url
          })
          lazyRef = this.storage.child('lazy/' + newName).putString(image.imageList[1], 'data_url').then(async snapshot => {
            let url = await snapshot.ref.getDownloadURL()
            ref.update({ lazy: url })
            imgObj.lazy = url
          })
          thumbnailRef = this.storage.child('thumbnails/' + newName).putString(image.imageList[2], 'data_url').then(async snapshot => {
            let url = await snapshot.ref.getDownloadURL()
            ref.update({ thumbnail: url })
            imgObj.thumbnail = url
          })
          if (image.createCloseup) {
            closeupRef = this.storage.child('closeups/' + newName).putString(image.imageList[3], 'data_url').then(async snapshot => {
              let url = await snapshot.ref.getDownloadURL()
              ref.update({ closeup: url })
              imgObj.closeup = url
            })
            promises.push(closeupRef)
          }
          promises.push(imageRef, lazyRef, thumbnailRef)
        })
        promises.push(addProm)
      }
      Promise.all(promises).then(() => {
        this.imageObjects.forEach(image => {
          this.selectedGallery.images.push(image)
        })
        this.imageObjects = []
        this.unsaved = this.imageObjects.length > 0
        this.imagesSaving = false
        this.$refs.gallery.splitGallery()
      })
    },
    randomizeName(realName){
      const length = 20
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      result += realName.split(".")[1]
      return result;
    },
    changeImage() {
      if (this.imageIndex === 2) this.imageIndex = 0;
      else this.imageIndex++
    },
    repairGallery() {
      this.selectedGallery.images.forEach((image, index) => {
        image.index = index
        image.height = [0, 0, 0]
        image.width = [0, 0, 0]
        let imagePromise = this.setHeightAndWidth(image, 0, 'image')
        let lazyPromise = this.setHeightAndWidth(image, 1, 'lazy')
        let thumbnailPromise = this.setHeightAndWidth(image, 2, 'thumbnail')
        Promise.all([imagePromise, lazyPromise, thumbnailPromise]).then(() => {
          let imgObject = { ...image }
          delete imgObject.ref
          image.ref.update(imgObject)
        })
      })
    },
    repairCloseups() {
      let progress = 0
      this.selectedGallery.images.forEach((image, index) => {
        image.closeup = null
        let width = 0
        let height = 0
        let scale = true
        if (image.width[0] > 1600 && image.width[0] >= image.height[0]) width = 1600;
        else if (image.height[0] > 1600 && image.width[0] <= image.height[0]) height = 1600;
        else scale = false
        if (scale) {
          let loadOriginalImage = new Promise(resolve => {
            const originalImage = new Image()
            originalImage.crossOrigin = "Anonymous";
            originalImage.onload = function () {
              resolve(originalImage)
            };
            originalImage.src = image.image;
          })
          loadOriginalImage.then(originalImage => {
            downscale(originalImage, width, height, { quality: 0.85 }).then(closeup => {
              let loadImage = new Promise(resolve => {
                const img = new Image();
                img.onload = function () {
                  image.width.push(img.width)
                  image.height.push(img.height)
                  resolve(closeup)
                };
                img.src = closeup;
              })
              loadImage.then(closeup => {
                this.storage.child('closeups/' + image.name).putString(closeup, 'data_url').then(async snapshot => {
                  let url = await snapshot.ref.getDownloadURL()
                  image.ref.update({ closeup: url }).then(() => {
                    progress += 1/this.selectedGallery.images.length
                    console.log(progress, (index+1)+"/"+this.selectedGallery.images.length)
                  })
                  image.closeup = url
                })
              })
            })
          })
        }
        else {
          image.ref.update({ closeup: image.image }).then(() => {
            progress += 1/this.selectedGallery.images.length
            console.log(progress, (index+1)+"/"+this.selectedGallery.images.length)
          })
          image.closeup = image.image
        }
      })
    },
    setHeightAndWidth(image, index, key) {
      return new Promise(resolve => {
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
      this.imagesSaving = true
      let promises = []
      images.forEach(image => {
        let img = new ImageObject(image)
        promises.push(img.ready)
        img.ready.then((imageObj) => {
          this.imageObjects.push(imageObj)
          this.unsaved = this.imageObjects.length > 0
          imageObj.index = this.selectedGallery.images.length + this.imageObjects.length - 2
        })
      })
      Promise.all(promises).then(() => {
        this.imagesSaving = false
        this.$refs.gallery.splitGallery()
      })
    },
    deletePhoto(image) {
      this.imageObjects.splice(this.imageObjects.indexOf(image), 1)
      this.files = this.files.filter(obj => obj !== image.file)
    },
  }
};
