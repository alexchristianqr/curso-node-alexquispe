<script setup lang="ts">
import { useAuthStore } from "../store";
import { ref } from "vue";
import { ActionForgotPassword } from "../interfaces";

const { forgotPassword } = useAuthStore();

const usernameRef = ref();
const passwordRef = ref();
const loading = ref(false);
const isPwd = ref(true);

const payloadForm = ref<ActionForgotPassword>({ username: null });
const loadingSubmit = async (stateLoading: boolean) => {
  return (loading.value = stateLoading);
};
const onSubmit = async (payload: any) => {
  await loadingSubmit(true);
  await onForgot(payload);
  await loadingSubmit(false);
};
const onForgot = async (payload: any) => {
  const { success = false } = await forgotPassword(payload);
  if (!success) {
    await loadingSubmit(false);
  }
};
</script>

<template>
  <h4>Recuperar contraseña</h4>
  <q-form class="q-gutter-md" @submit.prevent.stop="onSubmit(payloadForm)">
    <q-input :ref="usernameRef" outlined v-model="payloadForm.username" label="Email" :rules="[(val) => !!val || 'Campo obligatorio']" />
    <q-btn type="submit" color="primary" label="Enviar" :loading="loading" :disable="loading">
      <template v-slot:loading><q-spinner /></template>
    </q-btn>
    <div class="q-gutter-md text-center">
      <div>Si estoy registrado, haga clic para <a href="/login">iniciar sesión</a></div>
    </div>
  </q-form>
</template>

<style scoped></style>
