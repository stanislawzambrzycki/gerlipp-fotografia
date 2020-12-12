<template>
  <v-card
    width="100%"
    min-height="100vh"
    class="d-flex flex-column justify-center align-center mt-12"
  >
    <v-select
      style="width: 100%; margin-top: 64px"
      :items="galleries"
      v-model="selectedGallery"
      label="Galleries"
      return-object
      item-text="name"
    />
    <div data-app></div>
    <v-card style="width: 100%">
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
      </v-card-text>
    </v-card>
    <v-card
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
    </v-card>
  </v-card>
</template>

<script src="./galleries_cms.js" />
