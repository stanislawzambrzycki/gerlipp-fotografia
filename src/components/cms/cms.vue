<template>
  <v-app>
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
        @click.stop="toggleMenu"
        ><v-icon large>menu</v-icon></v-btn
      >
      <transition name="fade" mode="out-in">
        <mainCMS v-if="showComponent.main" />
        <galleriesCMS v-if="showComponent.galleries" />
        <aboutCMS v-if="showComponent.about" />
      </transition>
    </v-card>
    <!-- </v-card> -->
  </v-app>
</template>

<script src="./cms.js" />

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>