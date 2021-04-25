<template>
  <v-dialog v-model="display" fullscreen>
    <v-card width="100%" height="100%" class="d-flex flex-column justify-center align-center">
      <v-card>
        <div class="d-flex flex-wrap justify-center align-center">
          <div
            v-for="(ratio, index) in commonRatios"
            :key="'ratio' + index"
            ref="croppieContainer"
            :style="'width: '+Math.round(100/picturesInRow)+'%;'"
            :data-ratio="ratio.ratio"
          ></div>
        </div>
      </v-card>
      <div class="d-flex justify-space-between">
        <v-btn text @click="crop()" :disabled="saveLoading" :loading="saveLoading">Zapisz</v-btn>
        <v-btn text @click="display = false" :disabled="saveLoading"
          >Anuluj</v-btn
        >
      </div>
      <v-img v-bind:src="cropped" v-if="cropped" ref="cropped" width="90%" />
    </v-card>
  </v-dialog>
</template>

<script src="./dialog.js" />
