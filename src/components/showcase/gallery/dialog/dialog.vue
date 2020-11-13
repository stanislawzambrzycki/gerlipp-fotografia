<template>
    <v-dialog v-model="current.show"
    >
    <v-card>
        <v-img :src="current.image" contain/>
    </v-card>
    </v-dialog>
</template>

<script src="./dialog.js" />
