<script setup lang="ts">
import { useAuthStore } from "../../auth/store";
import { ref } from "vue";
import { ActionUserForm } from "../interfaces";

const { signIn } = useAuthStore();

const fullnameRef = ref();
const usernameRef = ref();
const passwordRef = ref();
const loading = ref(false);
const isPwd = ref(true);

const payloadForm = ref<ActionUserForm>({ fullname: null, username: null, password: null });

const loadingSubmit = async (stateLoading: boolean) => {
  return (loading.value = stateLoading);
};
const onSubmit = async (payload: any) => {
  await loadingSubmit(true);
  await onSignIn(payload);
  await loadingSubmit(false);
};
const onSignIn = async (payload: any) => {
  await signIn(payload);
};
</script>

<template>
  <h4>Registro</h4>
  <q-form class="q-gutter-md" @submit.prevent.stop="onSubmit(payloadForm)">
    <q-input :ref="fullnameRef" outlined v-model="payloadForm.fullname" label="Nombre completo" :rules="[(val) => !!val || 'Campo obligatorio']" />
    <q-input :ref="usernameRef" outlined v-model="payloadForm.username" label="Usuario" :rules="[(val) => !!val || 'Campo obligatorio']" />
    <q-input :type="isPwd ? 'password' : 'text'" :ref="passwordRef" outlined v-model="payloadForm.password" label="Contraseña" :rules="[(val) => !!val || 'Campo obligatorio']">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>
    <q-btn type="submit" color="primary" label="Crear usuario" :loading="loading" :disable="loading">
      <template v-slot:loading><q-spinner /></template>
    </q-btn>
  </q-form>
</template>

<style scoped></style>
