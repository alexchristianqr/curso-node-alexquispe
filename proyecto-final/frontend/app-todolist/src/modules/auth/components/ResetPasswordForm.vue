<script setup lang="ts">
import { useAuthStore } from "../store";
import { ref, onMounted } from "vue";
import { ActionResetPassword } from "../interfaces";
import { useRoute, useRouter } from "vue-router";

const { resetPassword } = useAuthStore();
const { params } = useRoute();

const passwordRef = ref();
const repeatPasswordRef = ref();
const loading = ref(false);
const isPwd = ref(true);
const isRepeatPwd = ref(true);

const payloadForm = ref<ActionResetPassword>({ token: null, password: null, repeat_password: null });

onMounted(() => {
  console.log({ params });
  payloadForm.value.token = params.token.toString();
});

const loadingSubmit = async (stateLoading: boolean) => {
  return (loading.value = stateLoading);
};
const onSubmit = async (payload: any) => {
  await loadingSubmit(true);
  await onReset(payload);
  await loadingSubmit(false);
};
const onReset = async (payload: any) => {
  const { success = false } = await resetPassword(payload);
  if (!success) {
    await loadingSubmit(false);
  }
};
</script>

<template>
  <h4>Cambiar contraseña</h4>
  <q-form class="q-gutter-md" @submit.prevent.stop="onSubmit(payloadForm)">
    <q-input :type="isPwd ? 'password' : 'text'" :ref="passwordRef" outlined v-model="payloadForm.password" label="Contraseña" :rules="[(val) => !!val || 'Campo obligatorio']">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>
    <q-input
      :type="isRepeatPwd ? 'password' : 'text'"
      :ref="repeatPasswordRef"
      outlined
      v-model="payloadForm.repeat_password"
      label="Repetir contraseña"
      :rules="[(val) => !!val || 'Campo obligatorio']"
    >
      <template v-slot:append>
        <q-icon :name="isRepeatPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isRepeatPwd = !isRepeatPwd" />
      </template>
    </q-input>
    <q-btn type="submit" color="primary" label="Actualizar" :loading="loading" :disable="loading">
      <template v-slot:loading><q-spinner /></template>
    </q-btn>
    <div class="q-gutter-md text-center">
      <div>¡Ups! ya recordé mi contraseña, ir a <router-link :to="{ name: 'login' }">iniciar sesión</router-link></div>
    </div>
  </q-form>
</template>

<style scoped></style>
