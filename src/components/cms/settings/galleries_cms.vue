<template>
  <v-card
    style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <div
      class="options"
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      "
    >
      <v-card width="80%" class="mt-12 mx-auto">
        <v-card-subtitle>Upload</v-card-subtitle>
        <v-card-text>
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
        width="100%"
        class="image-card"
        v-for="(image, index) in imageObjects"
        :key="index + 'lowRes'"
      >
        <v-img
          class="image"
          :src="quality? image.thumbnail: image.image"
          @click="quality=!quality"
        />
        <v-btn icon small absolute top right fab class="mt-8">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card>
    </div>
  </v-card>
</template>

<script src="./galleries_cms.js" />
