<template>
  <h1>Howdy! I'm a Options Page.</h1>
  <p>Counter: {{ counter }}</p>
  <button @click="clickMe">Click Me!</button>
	<p>This is awesome. </p>
	<Paragraph />
	<Paragraph />
</template>

<script setup>
import Paragraph from "./Paragraph.vue";

import { ref } from "vue";
const counter = ref(0);

function clickMe() {
  counter.value++;
}
</script>
