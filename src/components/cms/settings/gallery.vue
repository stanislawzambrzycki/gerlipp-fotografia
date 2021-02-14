<template>
  <v-card class="gallery" width="100%">
    <v-row no-gutters>
      <v-col
        v-for="(split, index) in splitted"
        :key="index + 'split'"
        class="d-flex flex-column"
        :cols="Math.floor(12 / splitted.length)"
      >
        <v-card
          width="100%"
          class="image-card"
          v-for="(image, index2) in split"
          :key="image + '' + index2"
        >
          <div
            v-on:dragover="allowDrop"
            v-on:drop="drop"
            :data-index="image.index"
          >
            <div
              draggable="true"
              v-on:dragstart="drag"
              :data-index="image.index"
            >
              <v-hover v-slot="{ hover }">
                <div>
                  <v-img
                    :class="hover ? 'cmsImage' : ''"
                    :src="image.thumbnail"
                    :lazy-src="image.lazy"
                  />
                  <v-btn icon dark small absolute top right fab class="mt-8" @click="deletePhoto(image.parent)">
                    <v-icon>delete_outline</v-icon>
                  </v-btn>
                </div>
              </v-hover>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script src="./gallery.js" />

<style scoped>
.cmsImage {
  filter: brightness(0.6);
}
</style>