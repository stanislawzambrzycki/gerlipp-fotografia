<template>
  <div data-name="greeting">
    <v-responsive
      v-if="greetingText.display"
      :aspect-ratio="commonRatios[imageNumber].ratio"
      class="greeting"
    >
      <v-img
        class="greeting-image scroll"
        data-rate="0.5"
        :src="greetingText.display ? greetingText['image' + imageNumber] : null"
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
    <v-sheet v-else width="100%" height="200%" color="black" class="pa-6" style="background: black;">
      <div style="width: 80%; color: aliceblue;">
        <h1>
          <span>{{ greetingText.top }}</span>
        </h1>
      </div>
    </v-sheet>
  </div>
</template>
<script src="./greeting.js" />