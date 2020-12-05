<template>
  <v-card
    min-height="100vh"
    style="width: 100%; height: 100%; display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
      <v-card style="width: 100%; margin-top: 64px; font-size: 1.2rem" tile>
        <v-card-subtitle style="width: 50%; font-size: 1.2rem">
          Colors
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            style="width: 50%;"
            label="$primary-color(z sass)"
          ></v-text-field>
          <v-text-field
            style="width: 50%;"
            label="$secondary-color (z sass)"
          ></v-text-field>
          <v-text-field
            style="width: 50%;"
            label="Teritiarty color (primary z vuetify)"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-card style="width: 100%; margin-top: 8px; font-size: 1.2rem" tile>
        <v-card-subtitle style="width: 50%; font-size: 1.2rem">
          Fonts
        </v-card-subtitle>
        <v-card-text>
          <v-text-field style="width: 50%;" label="Font family"></v-text-field>
          <v-text-field style="width: 50%;" label="Line height"></v-text-field>
          <v-text-field
            style="width: 50%;"
            label="Letter spacing"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </div>
  </v-card>
</template>

<script src="./main_cms.js" />
