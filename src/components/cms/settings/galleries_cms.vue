<template>
  <v-card
    width="100%"
    min-height="100vh"
    class="d-flex flex-column align-center"
  >
    <v-card-text>
      <v-row align="center">
        <v-col cols="6">
          <v-tooltip top nudge-left="50">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                <v-select
                  width="50%"
                  :items="galleries"
                  v-model="selectedGallery"
                  label="Select gallery"
                  return-object
                  item-text="name"
                />
              </span>
            </template>
            <span>Kliknij by wybrać galerię do edycji</span>
          </v-tooltip>
        </v-col>
        <v-col cols="2">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                <v-btn icon @click="createGallery()"
                  ><v-icon>add</v-icon></v-btn
                >
              </span>
            </template>
            <span>Kliknij by dodać galerię</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <!-- <div data-app></div> -->
      <transition name="fade">
        <v-card
          style="width: 100%"
          v-if="selectedGallery"
          elevation="3"
          class="my-4"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                <v-btn text @click="repairCloseups()"
                  >Repair gallery</v-btn
                ></span
              >
            </template>
            <span>Kliknij by przywróćić galerię</span>
          </v-tooltip>

          <v-card-subtitle style="width: 50%; font-size: 1.2rem"
            ><v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">Settings</span>
              </template>
              <span>Edycja galerii</span>
            </v-tooltip></v-card-subtitle
          >
          <v-card-text style="width: 50%">
            <v-tooltip top nudge-bottom="30">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-text-field
                    v-model="selectedGallery.name"
                    label="Gallery name"
                  />
                </span>
              </template>
              <span>Kliknij by edytować nazwę galerii</span>
            </v-tooltip>
            <v-tooltip top nudge-bottom="30">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-text-field
                    type="number"
                    v-model="selectedGallery.order"
                    label="Gallery display order"
                  />
                </span>
              </template>
              <span>Kliknij by edytować kolejność galerii</span>
            </v-tooltip>
            <div class="d-flex align-center">
              <v-tooltip top nudge-bottom="15">
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-checkbox
                      label="Hide gallery"
                      v-model="selectedGallery.hidden"
                    />
                  </span>
                </template>
                <span>Kliknij by ukryć galerię</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-btn icon @click="deleteGallery()"
                      ><v-icon>delete</v-icon></v-btn
                    >
                  </span>
                </template>
                <span>Kliknij by usunąć pustą galerię</span>
              </v-tooltip>
            </div>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-btn @click="saveSettings()" :loading="settingsSaving"
                    >Save</v-btn
                  >
                </span>
              </template>
              <span>Kliknij by zapisać zmiany</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </transition>

      <transition name="fade">
        <v-card
          style="width: 100%"
          v-if="selectedGallery"
          elevation="3"
          class="my-4"
        >
          <!-- <v-btn text @click="repairGallery()">Repair gallery</v-btn> -->
          <v-card-subtitle style="width: 50%; font-size: 1.2rem"
            ><v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">Upload</span>
              </template>
              <span>Edycja zawartości galerii</span>
            </v-tooltip>
          </v-card-subtitle>
          <v-card-text style="width: 50%">
            <v-tooltip top nudge-bottom="30">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-file-input
                    accept="image/*"
                    label="File input"
                    small-chips
                    multiple
                    clearable
                    v-model="files"
                    @change="eventHandler"
                    @click:clear="(imageObjects = []), (files = [])"
                  ></v-file-input>
                </span>
              </template>
              <span>Kliknij by dodać zdjęcia do galerii</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-btn
                    v-if="unsaved"
                    @click="saveImages()"
                    :disabled="imagesSaving"
                    :loading="imagesSaving"
                    >Save</v-btn
                  >
                </span>
              </template>
              <span>Kliknij by zapisać zmiany</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </transition>
      <Gallery
        v-if="selectedGallery"
        v-bind:gallery="selectedGallery"
        v-bind:uploadImages="imageObjects"
        @setHomepageImage="$refs.homepageDialog.show($event)"
        @deletePhoto="deletePhoto"
        ref="gallery"
        :key="selectedGallery.name"
      />
      <HomepageDialog ref="homepageDialog" />
    </v-card-text>
  </v-card>
</template>

<script src="./galleries_cms.js" />

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
