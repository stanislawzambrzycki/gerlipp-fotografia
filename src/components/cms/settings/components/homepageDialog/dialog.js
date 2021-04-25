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
      croppieElm: [],
      picturesInRow: 3,
      width: Math.floor(window.innerWidth),
      //height: Math.floor(window.innerWidth * 2 / 3),
      height: Math.floor(window.innerWidth),
      initZoom: 1,
      db: firebase.firestore(),
      lastPoints: [],
      saveLoading: false,
      saved: 0,
      commonRatios: [
        { width: 1, height: 2, ratio: 1 / 2 }, //1 0,5
        //{ width: 9, height: 16, ratio: 9 / 16 }, //2 0,5625
        { width: 3, height: 4, ratio: 3 / 4 }, //3 0,75
        { width: 5, height: 4, ratio: 5 / 4 }, //4 1,25
        { width: 4, height: 3, ratio: 4 / 3 }, //5 1,33333333333333
        { width: 8, height: 5, ratio: 8 / 5 }, //6 1,6
        { width: 16, height: 9, ratio: 16 / 9 }, //7 1,77777777777778
      ]
    }
  },
  mounted() {
    console.log(this.commonRatios, this.commonRatios.map(rat => rat.ratio))
    this.croppieElm = []
    this.waitForRef('croppieContainer').then(croppieRefs => {
      for (let croppieRef of croppieRefs) {
        var div = document.createElement("div")
        croppieRef.append(div)
        let croppieElm = new Croppie(div, {
          //boundary: { width: Math.floor(window.innerWidth) * 0.9, height: Math.floor(window.innerWidth * 2 / 3) * 0.9 },
          //viewport: { width: Math.floor(window.innerWidth) * 0.7, height: Math.floor(window.innerWidth * 2 / 3) * 0.7 },
          boundary: { width: Math.floor(window.innerWidth) * 0.9 * 0.25, height: Math.floor(window.innerWidth) * 0.9 * 0.25 },
          viewport: { width: Math.floor(window.innerWidth) * 0.7 * 0.25, height: Math.floor(window.innerWidth) * 0.7 * 0.25 },
          enableOrientation: true,
          enableExif: true
        });
        croppieElm.bind({
          url: 'http://i.imgur.com/Fq2DMeH.jpg',
          zoom: 0.1
        })
        //this.croppieElm.push(croppieElm)
      }
    })
  },
  watch: {
    // display() {
    //   if(!this.display) this.$refs.croppieRef.refresh()
    //   console.log(this.display)
    // }
  },
  methods: {
    save(cropped, index) {
      this.storage.child('greeting/greetingImage'+index+'.jpeg').putString(cropped, 'data_url').then(
        snapshot => {
          let imagePromise = snapshot.ref.getDownloadURL()
          this.db
            .collection("greeting")
            .get()
            .then(async greetingCollection => {
              let update = {}
              update['image'+index] = await imagePromise
              greetingCollection.docs[0].ref.update(update).then(() => {
                this.saved++
                if(this.saved === this.commonRatios.length) {
                  this.saved = 0
                  this.saveLoading = false
                  this.cropped = null
                  this.display = false
                }
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
      this.croppieElm.forEach(cro => cro.destroy())
      this.croppieElm = []
      this.waitForRef('croppieContainer').then(croppieRefs => {
        for (let croppieRef of croppieRefs) {
          let ratio = croppieRef.getAttribute('data-ratio')
          let rowWidth = 1 / this.picturesInRow
          let width = Math.floor(window.innerWidth)
          let height = Math.floor(window.innerWidth)
          let widthMult = ratio > 1 ? 1 : ratio
          let heightMult = ratio < 1 ? 1 : 1 / ratio
          let zoomWidth = width / image.width[0]
          let zoomHeight = height / image.height[0]
          let zoom = zoomWidth > zoomHeight ? zoomWidth : zoomHeight
          //zoom = Math.round(zoom * 1000 + 10) / 1000
          zoom = 0.01
          croppieRef.innerHTML = ''
          var div = document.createElement("div")
          croppieRef.append(div)
          let croppieOptions = {
            //boundary: { width: Math.floor(window.innerWidth * 0.9), height: Math.floor(window.innerWidth * (2 / 3) * 0.9) },
            boundary: { width: width * 0.85 * rowWidth, height: width * 0.85 * rowWidth },
            viewport: { width: width * 0.7 * rowWidth * widthMult, height: height * 0.7 * rowWidth * heightMult },
            enforceBoundary: true,
            enableOrientation: true,
          }
          let croppieElm = new Croppie(div, croppieOptions)
          //console.log(zoom, this.initZoom, zoom !== this.initZoom)
          let optionsToPass = {}
          // if (zoom !== this.initZoom)
          optionsToPass = {
            url: url,
            zoom
          }
          // else
          //   optionsToPass = {
          //     url: url,
          //     zoom: zoom,
          //     points: [...this.lastPoints]
          //   }
          croppieElm.bind(optionsToPass).then(() => {
            //let options = this.croppieElm.get()
            //console.log(croppieOptions.boundary, croppieOptions.viewport)
            //console.log(this.initZoom, options.zoom, zoom, this.lastPoints, options.points)
            // this.initZoom = options.zoom;
            // this.lastPoints = [...options.points]
            //console.log(this.initZoom, options.zoom, zoom, this.lastPoints, options.points)
          })
          this.croppieElm.push(croppieElm)
        }
      })
    },

    crop() {
      this.saveLoading = true
      let options = {
        type: 'base64',
        size: 'original',
        format: 'jpeg',
        circle: false
      }
      for (let index in this.croppieElm) {
        console.log(index)
        let croppieElm = this.croppieElm[index]
        console.log(croppieElm.get())
        let vm = this

        croppieElm.result(options).then(function (output) {
          vm.save(output, index)
        });
      }
    },
    show(image) {
      this.image = image
      this.url = image.image
      this.loading = true
      this.display = true
      this.bindCroppie(this.url, image)
    },
    result(output) {
      this.cropped = output;
    },
    update(val) {
      console.log(val);
    },
  },
};
