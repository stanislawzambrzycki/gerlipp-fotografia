import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';
import Croppie from 'croppie'
import 'croppie/croppie.css'

export default {
  name: "HomepageDialog",
  data() {
    return {
      storage: firebase.storage().ref(),
      display: false,
      loading: false,
      image: null,
      url: null,
      cropped: null,
      croppieElm: null,
      width: Math.floor(window.innerWidth),
      //height: Math.floor(window.innerWidth * 2 / 3),
      height: Math.floor(window.innerWidth),
      initZoom: 1,
      db: firebase.firestore(),
      lastPoints: [],
      saveLoading: false
    }
  },
  mounted() {
    this.waitForRef('croppieContainer').then(croppieRef => {
      var div = document.createElement("div")
      croppieRef.append(div)
      this.croppieElm = new Croppie(div, {
        //boundary: { width: Math.floor(window.innerWidth) * 0.9, height: Math.floor(window.innerWidth * 2 / 3) * 0.9 },
        //viewport: { width: Math.floor(window.innerWidth) * 0.7, height: Math.floor(window.innerWidth * 2 / 3) * 0.7 },
        boundary: { width: Math.floor(window.innerWidth) * 0.9, height: Math.floor(window.innerWidth) * 0.9 },
        viewport: { width: Math.floor(window.innerWidth) * 0.7, height: Math.floor(window.innerWidth) * 0.7 },
        enableOrientation: true,
        enableExif: true
      });
      this.croppieElm.bind({
        url: 'http://i.imgur.com/Fq2DMeH.jpg',
        zoom: 0.1
      })
    })
  },
  watch: {
    // display() {
    //   if(!this.display) this.$refs.croppieRef.refresh()
    //   console.log(this.display)
    // }
  },
  methods: {
    save() {
      this.saveLoading = true
      this.storage.child('greeting/greetingImage.jpeg').putString(this.cropped, 'data_url').then(
        snapshot => {
          let imagePromise = snapshot.ref.getDownloadURL()
          this.db
            .collection("greeting")
            .get()
            .then(async greetingCollection => {
              greetingCollection.docs[0].ref.update({ image: await imagePromise }).then(() => {
                this.saveLoading = false
                this.cropped = null
                this.display = false
              });
            });
        })
    },
    waitForRef(refName) {
      let intervalID = -1
      let instance = this
      let resolved = false
      return new Promise(resolve => {
        intervalID = setInterval(() => {
          if (resolved) {
            if (instance.$refs[refName]) {
              clearInterval(intervalID);
              resolve(instance.$refs[refName])
            }
          }
          else if (instance.$refs[refName]) {
            resolved = true
          }
        }, 100)
      })
    },
    bindCroppie(url, image) {
      if (this.croppieElm) this.croppieElm.destroy()
      this.croppieElm = null
      this.waitForRef('croppieContainer').then(croppieRef => {
        this.width = Math.floor(window.innerWidth)
        //this.height = Math.floor(window.innerWidth * 2 / 3)
        this.height = Math.floor(window.innerWidth)
        let width = Math.floor(window.innerWidth * 0.7)
        //let height = Math.floor(window.innerWidth * (2 / 3) * 0.7)
        let height = Math.floor(window.innerWidth * 0.7)
        let zoomWidth = width / image.width[0]
        let zoomHeight = height / image.height[0]
        let zoom = zoomWidth > zoomHeight ? zoomWidth : zoomHeight
        zoom = Math.round(zoom * 1000 + 10) / 1000
        croppieRef.innerHTML = ''
        var div = document.createElement("div")
        croppieRef.append(div)
        let croppieOptions = {
          //boundary: { width: Math.floor(window.innerWidth * 0.9), height: Math.floor(window.innerWidth * (2 / 3) * 0.9) },
          boundary: { width: Math.floor(window.innerWidth * 0.9), height: Math.floor(window.innerWidth * 0.9) },
          viewport: { width: width, height: height },
          enforceBoundary: true,
          enableOrientation: true,
        }
        this.croppieElm = new Croppie(div, croppieOptions)
        //console.log(zoom, this.initZoom, zoom !== this.initZoom)
        let optionsToPass = {}
        // if (zoom !== this.initZoom)
        optionsToPass = {
          url: url,
        }
        // else
        //   optionsToPass = {
        //     url: url,
        //     zoom: zoom,
        //     points: [...this.lastPoints]
        //   }
        this.croppieElm.bind(optionsToPass).then(() => {
          let options = this.croppieElm.get()
          console.log(croppieOptions.boundary, croppieOptions.viewport)
          console.log(this.initZoom, options.zoom, zoom, this.lastPoints, options.points)
          // this.initZoom = options.zoom;
          // this.lastPoints = [...options.points]
          //console.log(this.initZoom, options.zoom, zoom, this.lastPoints, options.points)
        })
      })
    },

    crop() {
      let options = {
        type: 'base64',
        size: 'original',
        format: 'jpeg',
        circle: false
      }
      console.log(this.croppieElm.get())
      let vm = this

      this.croppieElm.result(options).then(function (output) {
        vm.cropped = output
        vm.waitForRef('cropped').then(ref => {
          console.log("found")
          ref.$el.scrollIntoView({ behavior: 'smooth' })
        })
      });
    },
    rotate(rotationAngle) {
      this.croppieElm.rotate(rotationAngle);
    },
    show(image) {
      //console.log(image)
      this.image = image
      this.url = image.image
      this.loading = true
      this.display = true
      this.bindCroppie(this.url, image)
      // let intervalID = -1
      // let instance = this
      // if (this.$refs.croppieRef) {
      //   console.log(this.$refs.croppieRef)
      //   let croppieInstance = this.$refs.croppieRef
      //   croppieInstance.destroy()
      //   croppieInstance.initCroppie()
      //   croppieInstance.bind(this.url).then(() => {
      //     this.loading = false
      //   })
      // } else new Promise(resolve => {
      //   intervalID = setInterval(() => {
      //     if (instance.$refs.croppieRef && instance.loading) {
      //       let croppieInstance = this.$refs.croppieRef
      //       clearInterval(intervalID);
      //       croppieInstance.bind(this.url).then(() => {
      //         instance.loading = false
      //         resolve()
      //       })
      //     } else if (!instance.loading) {
      //       console.log("An error occured", this.$refs)
      //       clearInterval(intervalID);
      //       resolve()
      //     }
      //   }, 10)
      // })
      // console.log(this.image)
    },
    result(output) {
      this.cropped = output;
    },
    update(val) {
      console.log(val);
    },
  },
};
