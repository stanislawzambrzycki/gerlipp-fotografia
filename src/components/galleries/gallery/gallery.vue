<template>
  <v-card>
    <v-card-title>
      {{ gallery.name }}
    </v-card-title>
    <v-card-text class="d-flex flex-wrap justify-space-around">
        <v-card color="pink" v-for="(image, index) in gallery.images" :key="image+''+index" width="20%">
            <v-img :src='image'/>
        </v-card>
    </v-card-text>
  </v-card>
</template>

<script src="./gallery.js"/>