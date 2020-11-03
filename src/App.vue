<template>
  <v-app>
    <v-main class="background" style="height: 200vh">
        <v-btn fixed top right icon fab><v-icon>menu</v-icon></v-btn>
        <Greeting />
        <Galleries />
        <About />
        <Contact />
    </v-main>
  </v-app>
</template>

<script src="./App.js"/>
<style src="./css/main.css"/>