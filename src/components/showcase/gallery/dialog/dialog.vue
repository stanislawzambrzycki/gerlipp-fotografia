<template>
  <v-dialog v-model="current.show" fullscreen>
    <v-sheet height="100vh" class="overflow-x-hidden">
      <v-row no-gutters>
        <v-col class="d-flex flex-column" cols="1">
          <v-btn icon x-large class="ma-4" @click="fullscreen"
            ><v-icon>open_in_full</v-icon></v-btn
          >

          <v-btn icon x-large class="ma-4">
            <v-icon>favorite_border</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="10" class="d-flex justify-space-between align-center">
          <v-btn absolute  center left icon x-large @click="previous"
            ><v-icon>arrow_back_ios</v-icon></v-btn
          >
          <v-sheet height="100vh" width="100%" class="d-flex">
            <v-img
              :max-height="height"
              :max-width="width"
              contain
              :src="current.image"
              class="ma-auto"
            />
          </v-sheet>
          <v-btn absolute center right icon x-large @click="next"
            ><v-icon>arrow_forward_ios</v-icon></v-btn
          >
        </v-col>
        <v-col class="d-flex flex-column" cols="1">
          <v-btn
            icon
            x-large
            class="ma-4"
            @click="current.show = false, closeFullscreen()"
            ><v-icon>close</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script src="./dialog.js" />
