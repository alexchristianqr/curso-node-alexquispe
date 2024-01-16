<script setup lang="ts">
import TodoTemplate from "./modules/todo/templates/TodoTemplate.vue";
import LoginForm from "./modules/auth/components/LoginForm.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./modules/auth/store";

const { loggedIn } = storeToRefs(useAuthStore());
</script>

<template>
  <div>
    <LoginForm v-if="!loggedIn" />
    <TodoTemplate v-else />
  </div>
</template>

<style scoped></style>
