<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodoStore } from "../store";
import { onMounted } from "vue";

const { todos } = storeToRefs(useTodoStore());
const { getTodos } = useTodoStore();

onMounted(() => {
  getTodos();
});
</script>

<template>
  <div>{{ todos }}</div>
</template>

<style scoped></style>
