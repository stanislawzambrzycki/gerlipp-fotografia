<template>
  <v-card
    width="100%"
    min-height="100vh"
    class="d-flex flex-column justify-center align-center mt-12"
  >
    <v-card style="width: 100%; margin-top: 64px;">
      <v-card-subtitle style="width: 50%; font-size: 1.2rem"
        >Upload</v-card-subtitle
      >
      <v-card-text style="width: 50%;">
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
      max-width="400px"
      height="auto"
      style="margin: 16px;"
      v-for="(image, index) in imageObjects"
      :key="index + 'lowRes'"
    >
      <v-img
        :class="quality ? 'image-blur ma-0' : 'ma-0'"
        max-width="400px"
        contain
        :src="quality ? image.thumbnail : image.image"
        @click="quality = !quality"
      />
      <!-- <v-btn icon small absolute top right fab class="mt-8">
          <v-icon>close</v-icon>
        </v-btn> -->
    </v-card>
  </v-card>
</template>

<script src="./galleries_cms.js" />
