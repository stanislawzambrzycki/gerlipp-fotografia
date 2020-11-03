<template>
  <v-card height="100vh" color="rgb(255, 255, 255, 0.2)">
    <v-tabs v-model="tab" background-color="deep-purple accent-4" center-active dark grow>
      <v-tab
        v-for="(gallery, index) in galleries"
        :key="'gallery' + index"
        >{{ gallery.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(gallery, index) in galleries"
        :key="'gallery' + index">
        <Gallery v-bind:gallery="gallery"/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script src="./galleries.js"/>