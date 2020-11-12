<template>
  <div class="greeting">
    <v-parallax
      height="700"
      :src="
        require('@/assets/9579ed_cd65e48812d1417a9ef6d1e60521bf4e_mv2.webp')
      "
    >
      <div class="hello">
        <h3>photography pgerlipp</h3>
        <h1>Models</h1>
        <h6>20 styczeń 2020</h6>

        <div>
          <h5>Obejrzyj zdjęcia</h5>
          <v-btn icon large><v-icon large>expand_more</v-icon></v-btn>
        </div>
      </div>
    </v-parallax>
  </div>
</template>
<script src="./greeting.js" />
