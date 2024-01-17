<script setup lang="ts">
import ToolbarHeader from "./core/components/ToolbarHeader.vue";
</script>

<template>
  <div>
    <ToolbarHeader />
    <div class="mypage">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
