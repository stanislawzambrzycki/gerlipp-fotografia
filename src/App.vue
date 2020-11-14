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

/* 1. do poprawienia w przyszłości z-indexy na ikonach i menu, na potrzeby
prezentacji myślę, że ok 2. parallax działa tylko na dużych i bardzo duzych
ekranach, na pozostałych mamy usmiechniętą buzię 3. obrazek z about na razie ma
"display: none", wydawał się w jakiś sposob kolidować z Twoją galerią (tworzył
jej duzy margines po prawej strtonie, chociaż bez niego tez jest krótki moment
gdy sie pojawia) 4. w menu zająłem się responsywnością, ale zostawiłem Ci js-a,
padam na twarz. 5. dialog ma problemy z responsywnością na małych ekranachale
nie chciałem w nim grzebać bez ciebie */
