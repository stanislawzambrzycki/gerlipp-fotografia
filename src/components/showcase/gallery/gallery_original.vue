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
        <v-img :src="image" @click="openDialog(image, index)" />
        <v-btn icon dark small absolute bottom left fab class="mb-8">
          <v-icon>favorite_border</v-icon>
        </v-btn>
      </v-card>
    </v-card>
    <DialogComponent v-bind:gallery="gallery" v-bind:current="current" />
  </v-card>
</template>

<script src="./gallery.js" />
