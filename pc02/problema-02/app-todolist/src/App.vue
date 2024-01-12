<script setup lang="ts">
import Todolist from "./modules/todo/components/Todolist.vue";
import MyHeader from "./layouts/MyHeader.vue";
</script>

<template>
  <MyHeader/>
  <Todolist />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
