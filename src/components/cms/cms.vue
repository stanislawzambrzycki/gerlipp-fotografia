<template>
  <v-card class="cms">
    <v-toolbar
      app
      absolute
      top
      width="100%"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      class="text-uppercase"
    >
      <v-toolbar-title>
        <span>content management system</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed right class="ml-auto">
        <span>sign out</span>
        <v-icon class="ml-3">mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer absolute permanent left>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script src="./cms.js" />
