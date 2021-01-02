<template>
  <v-card
    width="100%"
    min-height="100vh"
    class="d-flex flex-column align-center"
  >
    <v-card-text>
      <v-row align="center">
        <v-col cols="6">
          <v-select
            width="50%"
            :items="galleries"
            v-model="selectedGallery"
            label="Select gallery"
            return-object
            item-text="name"
          /> </v-col
      ></v-row>
      <!-- <div data-app></div> -->

      <transition name="fade">
        <v-card style="width: 100%" v-if="selectedGallery" elevation="5" class='my-3'>
          <v-btn text @click="repairGallery()">Repair gallery</v-btn>
          <v-card-subtitle style="width: 50%; font-size: 1.2rem"
            >Upload</v-card-subtitle
          >
          <v-card-text style="width: 50%">
            <v-file-input
              accept="image/*"
              label="File input"
              small-chips
              multiple
              clearable
              v-model="files"
              @change="eventHandler"
              @click:clear="imageObjects = []"
            ></v-file-input>
            <v-btn v-if="imageObjects.length > 0" @click="saveImages()"
              >Save</v-btn
            >
          </v-card-text>
        </v-card>
      </transition>
      <Gallery v-if="imageObjects.length>0" v-bind:gallery="{name: selectedGallery.name, ref: selectedGallery.ref, images:imageObjects}" ref='tmp_gallery' :key='"temporary"+Math.random()' />
      <Gallery v-if="selectedGallery" v-bind:gallery="selectedGallery" ref='gallery' :key='selectedGallery.name' />
      <!-- <v-card
        width="80%"
        height="auto"
        style="margin: 16px"
        v-for="(image, index) in imageObjects"
        :key="index + 'lowRes'"
      >
        <v-img
          :class="imageIndex === 1 ? 'image-blur ma-0' : 'ma-0'"
          width="100%"
          contain
          :src="image.imageList[imageIndex]"
          @click="changeImage()"
        />
        <v-btn icon dark small absolute bottom left fab class="mb-8">
          <v-icon>favorite_border</v-icon>
        </v-btn>
      </v-card> -->
    </v-card-text>
  </v-card>
</template>

<script src="./galleries_cms.js" />


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>