<script setup lang="ts">
import ToolbarHeader from "./core/components/ToolbarHeader.vue";
</script>

<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 100vh">
      <ToolbarHeader />
      <div class="mypage q-py-xl">
        <router-view class="q-py-xl" />
      </div>
      <q-footer elevated class="text-center">
        <q-toolbar>
          <div class="q-mx-auto">
            <span>Desarrollado con <span style="font-size: 1.25rem">&hearts;</span> por </span>
            <strong>
              <a href="https://github.com/alexchristianqr" style="text-decoration: none; color: white; font-size: 1rem">Alex Christian</a>
            </strong>
          </div>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<style scoped></style>
