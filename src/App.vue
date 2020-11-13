<template>
  <v-app>
    <v-main class="background">
      <v-btn
        fixed
        top
        right
        icon
        dark
        fab
        x-large
        class="menu-btn"
        @click="toggleMenu"
        ><v-icon large>menu</v-icon></v-btn
      >
      <Greeting />
      <Menu />
      <Showcase />
      <About />
      <Contact />
    </v-main>
  </v-app>
</template>

<script src="./App.js" />
<style src="../public/css/main.css" />
