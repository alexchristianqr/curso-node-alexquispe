<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../modules/auth/store";
import { ref } from "vue";

const { userAuthenticate, loggedIn } = storeToRefs(useAuthStore());
const { signOut } = useAuthStore();

const loading = ref(false);

const loadingSubmit = async (stateLoading: boolean) => {
  return (loading.value = stateLoading);
};
const onSignOut = async () => {
  await loadingSubmit(true);
  await signOut();
  await loadingSubmit(false);
};
</script>

<template>
  <q-header elevated>
    <q-toolbar class="bg-primary text-white q-py-md">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />

      <q-space />

      <template v-if="loggedIn">
        <q-btn-dropdown flat :label="userAuthenticate.fullname || '-'" :loading="loading" :disable="loading">
          <q-list>
            <q-item-label header>Inicio de sesión</q-item-label>
            <q-item clickable v-close-popup tabindex="0" class="q-mb-sm" @click="onSignOut">
              <q-item-section avatar>
                <q-avatar icon="logout" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label style="width: 150px">Cerrar sesión</q-item-label>
              </q-item-section>
            </q-item>

            <!--          <q-separator inset spaced />-->

            <!--          <q-item-label header>Información personal</q-item-label>-->
            <!--          <q-item clickable v-close-popup tabindex="0">-->
            <!--            <q-item-section avatar>-->
            <!--              <q-avatar icon="edit" color="primary" text-color="white" />-->
            <!--            </q-item-section>-->
            <!--            <q-item-section>-->
            <!--              <q-item-label style="width: 150px">Actualizar usuario</q-item-label>-->
            <!--            </q-item-section>-->
            <!--          </q-item>-->
            <!--          <q-item clickable v-close-popup tabindex="0">-->
            <!--            <q-item-section avatar>-->
            <!--              <q-avatar icon="delete" color="primary" text-color="white" />-->
            <!--            </q-item-section>-->
            <!--            <q-item-section>-->
            <!--              <q-item-label style="width: 150px">Eliminar usuario</q-item-label>-->
            <!--            </q-item-section>-->
            <!--          </q-item>-->
          </q-list>
          <template v-slot:loading><q-spinner /></template>
        </q-btn-dropdown>
      </template>
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
