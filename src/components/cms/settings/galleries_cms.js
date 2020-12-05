import downscale from "downscale"

class ImageObject {
  constructor(file) {
    this.file = file
    this.image = ""
    this.thumbnail = ""
    this.ready = new Promise((imageReady) => {
      const reader = new FileReader();
      let imgObject = this
      reader.addEventListener("load", function () {
        imgObject.image = reader.result
        downscale(imgObject.image, 400, 0, { quality: 0.85 }).then(item => {
          imgObject.thumbnail = item
          imgObject.thumbnailLength = imgObject.thumbnail.length
          imgObject.imageLength = imgObject.image.length
          imgObject.compressionRatio = Math.floor((imgObject.thumbnailLength / imgObject.imageLength) * 100) + "%"
          const img = new Image();
          img.onload = function () {
            imgObject.width = img.width
            imgObject.height = img.height
          };
          img.src = imgObject.image;
          const img2 = new Image();
          img2.onload = function () {
            imgObject.thumbnailWidth = img2.width
            imgObject.thumbnailHeight = img2.height
          };
          img2.src = imgObject.thumbnail;
          imageReady(imgObject)
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
      files: [],
      imageObjects: [],
      quality: false
    }
  },
  methods: {
    eventHandler(images) {
      console.log(images)
      images.forEach(image => {
        new ImageObject(image).ready.then((imageObj) => {
          this.imageObjects.push(imageObj)
          console.log(this.imageObjects)
        })
      })
    },
  }
};
