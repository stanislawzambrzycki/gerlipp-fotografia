<template>
  <v-dialog v-model="display" fullscreen>
    <v-card width="100%" class="d-flex flex-column justify-center align-center">
      <v-card :width="width" :height="height">
        <div ref="croppieContainer" style="width: 100%; height: 80%"></div>
      </v-card>
      <div class="d-flex justify-space-between">
        <v-btn text @click="crop()" :disabled="saveLoading">Przytnij</v-btn>
        <v-btn text @click="display = false" :disabled="saveLoading"
          >Anuluj</v-btn
        >
        <v-btn v-if="cropped" :loading="saveLoading" text @click="save()"
          >Zapisz</v-btn
        >
      </div>
      <v-img v-bind:src="cropped" v-if="cropped" ref="cropped" width="90%" />
    </v-card>
  </v-dialog>
</template>

<script src="./dialog.js" />
