<script setup lang="ts">
import { useAuthStore } from "../../auth/store";
import { ref } from "vue";
import { ActionSignUp } from "../../auth/interfaces";

const { signUp } = useAuthStore();

const fullnameRef = ref();
const usernameRef = ref();
const passwordRef = ref();
const repeatPasswordRef = ref();
const loading = ref(false);
const isPwd = ref(true);

const payloadForm = ref<ActionSignUp>({ fullname: null, username: null, password: null, repeat_password: null });

const loadingSubmit = async (stateLoading: boolean) => {
  return (loading.value = stateLoading);
};
const onSubmit = async (payload: any) => {
  await loadingSubmit(true);
  await onSignUp(payload);
  await loadingSubmit(false);
};
const onSignUp = async (payload: any) => {
  const { success = null } = await signUp(payload);
  if (!success) {
    await loadingSubmit(false);
  }
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
    <q-input :type="isPwd ? 'password' : 'text'" :ref="repeatPasswordRef" outlined v-model="payloadForm.repeat_password" label="Repetir contraseña" :rules="[(val) => !!val || 'Campo obligatorio']">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>
    <div class="q-gutter-md text-center">
      <q-btn type="submit" color="primary" label="Crear usuario" :loading="loading" :disable="loading">
        <template v-slot:loading><q-spinner /></template>
      </q-btn>
      <div>Si estoy registrado, haga clic para <a href="/login">iniciar sesión</a></div>
    </div>
  </q-form>
</template>

<style scoped></style>
