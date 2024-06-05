<template>
  <div>
    <button @click="clickMe">Click Me</button>
  </div>
</template>

<script setup>
function clickMe() {
  alert(`I'm clicked!`);
}
</script>

<style scoped>
button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  color: #3333;
  background-color: #ffff;
  border: solid 1px #3333;
}
</style>
