<template>
  <v-card width="100%">
    <v-card width="100%" class="ma-5">
      <v-card-title> Greeting </v-card-title>
      <v-form>
        <v-container width="100%" class="mx-0">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="contactText.top"
                label="Top"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="contactText.center"
                label="Center"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="contactText.bottom"
                label="Bottom"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-btn text @click="saveGreeting()">Save</v-btn>
      </v-card-actions>
    </v-card>
    <v-card width="100%" class="ma-5">
      <v-card-title> About </v-card-title>
      <v-card-text>
        <v-textarea auto-grow clearable full-width outlined v-model="aboutText">
        </v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="saveAbout()">Save</v-btn>
      </v-card-actions>
    </v-card>
    <v-card width="100%" class="ma-5">
      <v-card-title> Contact </v-card-title>
      <v-form>
        <v-container width="100%" class="mx-0">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="contactText.phone"
                label="Phone"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="contactText.email"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-btn text @click="saveContact()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script src="./edits_cms.js" />
