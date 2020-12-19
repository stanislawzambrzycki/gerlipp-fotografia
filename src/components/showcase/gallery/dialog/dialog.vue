<template>
  <v-dialog v-model="current.show" fullscreen>
    <v-sheet height="100vh" class="overflow-x-hidden">
      <v-row no-gutters>
        <v-col class="d-flex flex-column align-center" cols="1">
          <v-btn icon x-large class="ma-4 mr-auto" @click="fullscreen"
            ><v-icon>mdi-arrow-expand</v-icon></v-btn
          >

          <v-btn icon x-large class="ma-4 mr-auto">
            <v-icon>favorite_border</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="10" class="d-flex justify-space-between align-center">
          <v-btn absolute center left icon x-large @click="previous"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          <v-sheet height="100vh" width="100%" class="d-flex">
            <v-img
              :key='"image"+current.index'
              :max-height="height"
              :max-width="width"
              contain
              :src="current.image"
              :lazy-src="current.lazy"
              class="ma-auto"
            />
          </v-sheet>
          <v-btn absolute center right icon x-large @click="next"
            ><v-icon>mdi-arrow-right</v-icon></v-btn
          >
        </v-col>
        <v-col class="d-flex flex-column" cols="1">
          <v-btn
            icon
            right
            x-large
            class="ma-4 ml-auto"
            @click="(current.show = false), closeFullscreen()"
            ><v-icon>close</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script src="./dialog.js" />
