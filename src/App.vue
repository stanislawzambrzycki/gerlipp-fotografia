<template>
  <div id="app">
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
    <router-view />
  </div>
</template>


  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script src="/__/firebase/8.0.2/firebase-app.js"></script>

  <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
  <script src="/__/firebase/8.0.2/firebase-analytics.js"></script>

  <!-- Initialize Firebase -->
  <script src="/__/firebase/init.js"></script>
  <script src="./App.js"/>