<template>
  <div class="greeting" data-name="greeting">
    <v-parallax
      :height="windowHeight"
      :src="greetingText.display? greetingText['image'+imageNumber]: null"
    >
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
    </v-parallax>
  </div>
</template>
<script src="./greeting.js" />
