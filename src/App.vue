<template>
  <v-app>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Material+Icons"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"
    />
    <v-main class="background">
      <v-btn
        ref="menubtn"
        fixed
        top
        right
        icon
        :dark="menubtn.dark"
        fab
        x-large
        class="menu-btn"
        @click="toggleMenu"
        ><v-icon large>menu</v-icon></v-btn
      >
      <Greeting
        @navigate="navigate($event)"
        ref="greeting"
        v-bind:observer="observer"
      />
      <Menu @navigate="navigate($event)" ref="menu" />
      <Showcase
        @navigate="navigate($event)"
        ref="showcase"
        v-bind:observer="observer"
      />
      <About
        @navigate="navigate($event)"
        ref="about"
        v-bind:observer="observer"
      />
      <Contact
        @navigate="navigate($event)"
        ref="contact"
        v-bind:observer="observer"
      />
      <CMS v-if="showCMS" />
    </v-main>
  </v-app>
</template>

  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script src="/__/firebase/8.0.2/firebase-app.js"></script>

  <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
  <script src="/__/firebase/8.0.2/firebase-analytics.js"></script>

  <!-- Initialize Firebase -->
  <script src="/__/firebase/init.js"></script>
<script src="./App.js" />

<style src="./sass/main.css" />
