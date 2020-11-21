<template>
  <v-card class="gallery" width="100%">
    <!-- <v-card-title>
      {{ gallery.name }}
    </v-card-title> -->
    <!-- <magic-grid maxCols="5" maxColWidth="420">
      <v-card
        class="image"
        v-for="(image, index) in gallery.images"
        :key="image + '' + index"
      >
        <v-img :src="image" @click="openDialog(image, index)" />
        <v-btn icon dark small absolute bottom left fab class="mb-8">
          <v-icon>favorite_border</v-icon>
        </v-btn>
      </v-card>
    </magic-grid> -->
    <v-row no-gutters>
      <v-col
        v-for="(split, index) in splitted"
        :key="index + 'split'"
        class="d-flex flex-column"
        :cols="Math.floor(12/splitted.length)"
      >
        <v-card
        width="100%"
          class="image"
          v-for="(image, index2) in split"
          :key="image + '' + index2"
        >
          <v-img :src="image.image" @click="openDialog(image.image, image.index)" />
          <v-btn icon dark small absolute bottom left fab class="mb-8" @click="color='red'">
            <v-icon>favorite_border</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <DialogComponent v-bind:gallery="gallery" v-bind:current="current" />
  </v-card>
</template>

<script src="./gallery.js" />
