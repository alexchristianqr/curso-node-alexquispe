<script setup lang="ts">
import { ref } from "vue";
import { ActionSignIn } from "../interfaces";
import { useAuthStore } from "../store";

const { signIn } = useAuthStore();

const usernameRef = ref();
const passwordRef = ref();
const loading = ref(false);
const isPwd = ref(true);

const payloadForm = ref<ActionSignIn>({ username: null, password: null });

const loadingSubmit = async (stateLoading: boolean) => {
  return (loading.value = stateLoading);
};
const onSubmit = async (payload: any) => {
  await loadingSubmit(true);
  await onSignIn(payload);
  await loadingSubmit(false);
};
const onSignIn = async (payload: any) => {
  const { success = false } = await signIn(payload);
  if (!success) {
    await loadingSubmit(false);
  }
};
</script>

<template>
  <h4>Login</h4>
  <q-form class="q-gutter-md" @submit.prevent.stop="onSubmit(payloadForm)">
    <q-input :ref="usernameRef" outlined v-model="payloadForm.username" label="Email" :rules="[(val) => !!val || 'Campo obligatorio']" />
    <q-input :type="isPwd ? 'password' : 'text'" :ref="passwordRef" outlined v-model="payloadForm.password" label="Contraseña" :rules="[(val) => !!val || 'Campo obligatorio']">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>
    <div class="row">
      <div class="col">
        <div class="text-right">
          <router-link :to="{ name: 'forgot' }">Olvidé mi contraseña</router-link>
        </div>
      </div>
    </div>
    <div class="q-gutter-md text-center">
      <q-btn type="submit" color="primary" label="Iniciar Sesion" :loading="loading" :disable="loading">
        <template v-slot:loading><q-spinner /></template>
      </q-btn>
      <div>Si no tienes una cuenta, ir a <router-link :to="{ name: 'register' }">registrarme</router-link></div>
    </div>
  </q-form>
</template>

<style scoped></style>
