<template>
  <v-card class="showcase">
    <v-tabs class="tabs" v-model="tab" center-active grow>
      <v-tab
        class="tab"
        v-for="(gallery, index) in galleries"
        :key="'gallery' + index"
        >{{ gallery.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(gallery, index) in galleries"
        :key="'gallery' + index"
      >
        <Gallery v-bind:gallery="gallery" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script src="./showcase.js" />
