<template>
  <v-dialog v-model="current.show" fullscreen>
    <v-sheet height="100vh" class="overflow-x-hidden">
      <v-sheet
        height="100vh"
        width="100%"
        class="d-flex justify-center align-items-center"
      >
        <v-fade-transition mode="out-in">
          <v-img
            v-if="current.show"
            :key="'image' + current.index"
            :max-height="computedHeight"
            max-width="100%"
            contain
            :src="current.image"
            class="ma-auto"
          >
          </v-img> </v-fade-transition
        ><v-btn
          elevation="0"
          @click="fullscreen"
          light
          fab
          absolute
          large
          top
          left
          style="margin-top: 40px"
        >
          <v-icon large dark>mdi-arrow-expand</v-icon>
        </v-btn>
        <v-btn
          elevation="0"
          @click="toggleLike"
          light
          fab
          absolute
          large
          top
          left
          style="margin-top: 120px"
        >
          <v-badge
            :value="current.hover && current.obj.likes > 0"
            color="red"
            :content="current.obj.likes"
            left
            transition="slide-x-transition"
          >
            <v-hover v-model="current.hover">
              <v-icon color="red" large v-if="inLikes()">favorite</v-icon>
              <v-icon v-else large>favorite_border</v-icon>
            </v-hover>
          </v-badge>
        </v-btn>
        <v-btn
          elevation="0"
          absolute
          center
          left
          light
          fab
          large
          @click="previous"
          style="margin-top: calc(50vh - 20px)"
          ><v-icon large>mdi-arrow-left</v-icon></v-btn
        >
        <v-btn
          elevation="0"
          absolute
          style="margin-top: calc(50vh - 20px)"
          right
          light
          fab
          large
          @click="next"
          ><v-icon large>mdi-arrow-right</v-icon></v-btn
        >
        <v-btn
          elevation="0"
          light
          fab
          absolute
          large
          top
          right
          style="margin-top: 40px"
          @click="(current.show = false), closeFullscreen()"
          ><v-icon large>close</v-icon></v-btn
        >
      </v-sheet>
      <!-- <v-row no-gutters>
        <v-col class="d-flex flex-column align-center" cols="1">
          <v-btn icon x-large class="ma-4 mr-auto" @click="fullscreen"
            ><v-icon>mdi-arrow-expand</v-icon></v-btn
          >

          <v-btn icon x-large class="ma-4 mr-auto" @click="toggleLike()">
            <v-badge
              :value="current.hover && current.obj.likes > 0"
              color="red"
              :content="current.obj.likes"
              left
              transition="slide-x-transition"
            >
              <v-hover v-model="current.hover">
                <v-icon color="red" v-if="inLikes()">favorite</v-icon>
                <v-icon v-else>favorite_border</v-icon>
              </v-hover>
            </v-badge>
          </v-btn>
        </v-col>
        <v-col cols="10" class="d-flex justify-space-between align-center">
          <v-btn absolute center left icon x-large @click="previous"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          <v-sheet height="100vh" width="100%" class="d-flex">
            <v-fade-transition mode="out-in">
              <v-img
                v-if="current.show"
                :key="'image' + current.index"
                :max-height="height"
                :max-width="width"
                contain
                :src="current.image"
                class="ma-auto"
              ><v-btn absolute text top left>top left</v-btn></v-img>
            </v-fade-transition>
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
      </v-row> -->
    </v-sheet>
  </v-dialog>
</template>

<script src="./dialog.js" />
