<template>
  <v-card class="cms pa-0">
    <menuCMS @navigate="navigate($event)" ref="menu" />

    <v-btn
      ref="menubtn"
      fixed
      top
      right
      icon
      fab
      class="menu-btn"
      @click="toggleMenu"
      ><v-icon large>M</v-icon></v-btn
    >
    <mainCMS v-if="showMainSettings" />
    <galleriesCMS v-if="showGalleries" />
  </v-card>
  <!-- </v-card> -->
</template>

<script src="./cms.js" />
