<template>
  <v-card>
    <v-card-title>
      {{ gallery.name }}
    </v-card-title>
    <v-card-text>
        <v-card v-for="(image, index) in gallery.images" :key="image+''+index">
            {{image}}
        </v-card>
    </v-card-text>
  </v-card>
</template>

<script src="./gallery.js"/>