<template>
  <v-responsive :aspect-ratio="1 / 1" class="greeting" data-name="greeting">
    <v-img
      class="greeting-image scroll"
      data-rate="0.25"
      :src="greetingText.display ? greetingText.image : null"
    />
    <div class="hello">
      <h1>
        <span>{{ greetingText.top }}</span>
      </h1>
      <h1>{{ greetingText.center }}</h1>

      <div>
        <h5>{{ greetingText.bottom }}</h5>
        <v-btn icon dark large @click="$emit('navigate', 'showcase')"
          ><v-icon large>expand_more</v-icon></v-btn
        >
      </div>
    </div>
  </v-responsive>
</template>
<script src="./greeting.js" />