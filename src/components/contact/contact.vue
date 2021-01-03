<template>
  <v-card class="contact" data-name="contact">
    <div class="text-content">
      <div class="header">Contact</div>
      <div class="p">
        <v-icon large color="primary" class="mr-5">mdi-phone-outline</v-icon>+48
        {{ contactText.phone }}
      </div>
      <div class="p">
        <v-icon large color="primary" class="mr-5">mdi-at</v-icon>
        {{ contactText.email }}
      </div>
    </div>
  </v-card>
</template>

<script src="./contact.js" />
