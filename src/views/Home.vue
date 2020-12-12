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
    </v-main>
  </v-app>
</template>

<script src="./Home.js" />
<style src="../sass/main.css" />