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
          <v-img
            class="image"
            :src="image.thumbnail"
            :lazy-src="image.lazy"
          />
          <v-btn icon dark small absolute bottom left fab class="mb-8"
            ><v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon dark small absolute bottom right fab class="mb-8"
            ><v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script src="./gallery.js" />
