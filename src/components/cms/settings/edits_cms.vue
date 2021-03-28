<template>
  <v-card width="100%">
    <v-card width="auto" class="ma-4">
      <v-card-title>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Powitanie</span>
          </template>
          <span>Edycja elementów nagłówka strony</span>
        </v-tooltip>
      </v-card-title>

      <v-form>
        <v-container width="100%" class="mx-0">
          <v-row>
            <v-col cols="12" md="4">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-text-field
                      v-model="greetingText.top"
                      label="Text góra"
                      required
                    ></v-text-field>
                  </span>
                </template>
                <span>Kliknij by edytować napis na górze nagłówka</span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" md="4">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-text-field
                      v-model="greetingText.center"
                      label="Text centrum"
                      required
                    ></v-text-field>
                  </span>
                </template>
                <span>Kliknij by edytować napis w centrum nagłówka</span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" md="4">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-text-field
                      v-model="greetingText.bottom"
                      label="Text dół"
                      required
                    ></v-text-field>
                  </span>
                </template>
                <span>Kliknij by edytować napis na dole nagłówka</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-checkbox
                      v-model="greetingText.display"
                      label="Wyswietl obrazek tła"
                    >
                    </v-checkbox>
                  </span>
                </template>
                <span>Kliknij by wyświetlić/ukryć zdjęcie w nagłówku</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-btn text @click="saveGreeting()">Zapisz</v-btn>
            </span>
          </template>
          <span>Kliknij by zapisać zmiany</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
    <v-card width="auto" class="ma-4">
      <v-card-title>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">O mnie</span>
          </template>
          <span>Kliknij by edytować sekcję "O mnie"</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-textarea auto-grow clearable full-width outlined v-model="aboutText">
        </v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on"
              ><v-btn text @click="saveAbout()">Zapisz</v-btn>
            </span>
          </template>
          <span>Kliknij by zapisać zmiany</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
    <v-card width="auto" class="ma-4">
      <v-card-title>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Kontakt</span>
          </template>
          <span>Edycja sekcji "Kontakt"</span>
        </v-tooltip>
      </v-card-title>
      <v-form>
        <v-container width="100%" class="mx-0">
          <v-row>
            <v-col cols="12" md="4">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-text-field
                      v-model="contactText.phone"
                      label="Telefon kontaktowy"
                      required
                    ></v-text-field>
                  </span>
                </template>
                <span>Kliknij by edytować numer telefonu</span>
              </v-tooltip>
            </v-col>

            <v-col cols="12" md="4">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-text-field
                      v-model="contactText.email"
                      label="Adres mailowy"
                      required
                    ></v-text-field>
                  </span>
                </template>
                <span>Kliknij by edytować maila</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-btn text @click="saveContact()">Zapisz</v-btn>
            </span>
          </template>
          <span>Kliknij by zapisać zmiany</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script src="./edits_cms.js" />
