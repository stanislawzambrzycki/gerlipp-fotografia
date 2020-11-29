<template>
  <v-card
    style="width: 100%; height: 100%; display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;"
  >
    <div
      class="options"
      style="width: 100%; height: 100%; display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;"
    >
      <!-- <p>SCSS NIE ZAPISUJE NOWYCH DANYCH</p> -->
      <v-card width="80%" class="mt-12 mx-auto">
        <v-card-subtitle>
           Colors
        </v-card-subtitle>
        <v-card-text>
          <v-text-field label="$primary-color(z sass)"></v-text-field>
          <v-text-field label="$secondary-color (z sass)"></v-text-field>
          <v-text-field label="Teritiarty color (primary z vuetify)"></v-text-field>
        </v-card-text>
      </v-card>
      <v-card width="80%" class="mt-12 mx-auto">
        <v-card-subtitle>
           Fonts
        </v-card-subtitle>
        <v-card-text>
          <v-text-field label="Font family"></v-text-field>
          <v-text-field label="Line height"></v-text-field>
          <v-text-field label="Letter spacing"></v-text-field>
        </v-card-text>
      </v-card>
    </div>
  </v-card>
</template>

<script src="./main_cms.js" />
