<template>
  <v-card width="100%" class="mt-5">
    <v-card-title> About </v-card-title>
    <v-card-text>
      <v-textarea
        auto-grow
        clearable
        full-width
        v-model="aboutText"
      >
      </v-textarea>
    </v-card-text>
    <v-card-actions>
        <v-btn text @click="saveAbout()">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./about_cms.js" />
