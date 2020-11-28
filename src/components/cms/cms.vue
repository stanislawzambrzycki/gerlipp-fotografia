<template>
  <v-card class="cms pa-0">
    <v-toolbar
      app
      absolute
      top
      width="100%"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      class="text-uppercase"
    >
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <span>content management system</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="grey darken-4" depressed right>
        <span>sign out</span>
        <v-icon class="ml-3">mdi-export</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card
      class="mx-auto; elevation-4"
      style="width: auto; height: 100vh;"
      tile
    >
      <v-navigation-drawer color="grey darken-4" dark permanent>
        <v-list style="margin-top: 64px">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                admin_name
              </v-list-item-title>
              <v-list-item-subtitle>email@email.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list style="padding: 0">
          <v-list-item link>
            <v-list-item-content style="padding: .5em 0">
              <v-list-item-title>Main Settings</v-list-item-title>
            </v-list-item-content>
            <v-icon class="ml-3">mdi-menu-right</v-icon>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list style="padding: 0">
          <v-list-item link>
            <v-list-item-content style="padding: .5em 0">
              <v-list-item-title>Galleries</v-list-item-title>
            </v-list-item-content>
            <v-icon class="ml-3">mdi-menu-right</v-icon>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list style="padding: 0">
          <v-list-item link>
            <v-list-item-content style="padding: .5em 0">
              <v-list-item-title>Greeting</v-list-item-title>
            </v-list-item-content>
            <v-icon class="ml-3">mdi-menu-right</v-icon>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list style="padding: 0">
          <v-list-item link>
            <v-list-item-content style="padding: .5em 0">
              <v-list-item-title>Navigation</v-list-item-title>
            </v-list-item-content>
            <v-icon class="ml-3">mdi-menu-right</v-icon>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list style="padding: 0">
          <v-list-item link>
            <v-list-item-content style="padding: .5em 0">
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
            <v-icon class="ml-3">mdi-menu-right</v-icon>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list style="padding: 0">
          <v-list-item link>
            <v-list-item-content style="padding: .5em 0">
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item-content>
            <v-icon class="ml-3">mdi-menu-right</v-icon>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-navigation-drawer>
    </v-card>
    <v-card
      style="width: 100%; height: 100%; background-color: red; display: flex; flex-direction: column;"
      tile
    >
      <mainCMS v-if="showCMS" />
      <galleriesCMS v-if="showCMS" />
    </v-card>
  </v-card>
</template>

<script src="./cms.js" />
