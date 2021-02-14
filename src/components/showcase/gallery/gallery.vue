<template>
  <v-card class="gallery" width="100%">
    <v-row no-gutters>
      <v-col
        v-for="(split, index) in splitted"
        :key="index + 'split'"
        class="d-flex flex-column"
        :cols="Math.floor(12 / splitted.length)"
      >
        <v-card
          width="100%"
          class="image-card"
          v-for="(image, index2) in split"
          :key="image + '' + index2"
        >
          <v-img
            eager
            class="image"
            :src="image.thumbnail"
            :lazy-src="image.lazy"
            @click="openDialog(image.closeup, image.thumbnail, image.index, image)"
          />
          <v-btn
            icon
            dark
            small
            absolute
            bottom
            left
            fab
            class="mb-8"
            @click="toggleLike(image)"
          >
            <v-badge
              :value="image.hover && image.likes>0"
              color="red"
              :content="image.likes"
              left
              transition="slide-x-transition"
            >
              <v-hover v-model="image.hover">
                <v-icon color="red" v-if="gallery.likes.includes(image.ref.id)"
                  >favorite</v-icon
                >
                <v-icon v-else>favorite_border</v-icon>
              </v-hover>
            </v-badge>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <DialogComponent v-bind:gallery="gallery" v-bind:current="current" />
  </v-card>
</template>

<script src="./gallery.js" />
