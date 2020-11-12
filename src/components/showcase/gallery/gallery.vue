<template>
  <v-card>
    <!-- <v-card-title>
      {{ gallery.name }}
    </v-card-title> -->
    <v-card class="gallery">
      <v-card
        class="image"
        v-for="(image, index) in gallery.images"
        :key="image + '' + index"
      >
        <v-img :src="image" />
      </v-card>
    </v-card>
  </v-card>
</template>

<script src="./gallery.js" />
