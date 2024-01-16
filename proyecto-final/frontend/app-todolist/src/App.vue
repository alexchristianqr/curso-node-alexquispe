<script setup lang="ts">
import TodoTemplate from "./modules/todo/templates/TodoTemplate.vue";
import LoginForm from "./modules/auth/components/LoginForm.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./modules/auth/store";
import ToolbarHeader from "./core/components/ToolbarHeader.vue";
import UserForm from "./modules/user/components/UserForm.vue";

const { loggedIn } = storeToRefs(useAuthStore());
</script>

<template>
  <div>
    <ToolbarHeader />
    <div class="mypage">
      <UserForm />
      <LoginForm v-if="!loggedIn" />
      <TodoTemplate v-else />
    </div>
  </div>
</template>

<style scoped></style>
