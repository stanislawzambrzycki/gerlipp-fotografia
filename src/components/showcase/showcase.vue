<template>
  <v-card class="showcase" data-name="showcase">
    <v-tabs class="tabs" v-model="tab" center-active grow>
      <v-tab
        class="tab"
        v-for="(gallery, index) in galleries"
        :key="'gallery' + index"
        @click="tabClick('gallery'+index)"
        >{{ gallery.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(gallery, index) in galleries"
        :key="'gallery' + index"
        ref='galleryTab'
      >
        <Gallery :ref="'gallery'+index" class="px-6" v-bind:gallery="gallery" :key="'galleryComponent'+index" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script src="./showcase.js" />
