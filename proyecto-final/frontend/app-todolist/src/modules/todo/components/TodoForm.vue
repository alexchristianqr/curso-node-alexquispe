<script setup lang="ts">
import { computed, ref } from "vue";
import { ConfigForm, Todo } from "../interfaces";
import { useTodoStore } from "../store";
import { useAuthStore } from "../../auth/store";

const { createTodo, updateTodo, deleteTodo } = useTodoStore();
const { userAuthenticate } = useAuthStore();

const props = defineProps<{
  configForm: ConfigForm;
  payloadForm?: Todo;
}>();
const statuses = [
  { value: "todo", label: "Por hacer" },
  { value: "in_progress", label: "En progreso" },
  { value: "complete", label: "Completado" },
];
const payloadForm = ref<Todo | any>(props.payloadForm);
const actionForm = computed(() => props.configForm);

const descriptionRef = ref();
const statusRef = ref();
const uuidRef = ref();
const loading = ref(false);

const loadingSubmit = async (stateLoading: boolean) => {
  return (loading.value = stateLoading);
};
const onSubmit = async (payload: any) => {
  await loadingSubmit(true);
  if (actionForm.value.action === "register") {
    await onRegister(payload);
  }
  if (actionForm.value.action === "edit") {
    await onEdit(payload);
  }
  if (actionForm.value.action === "remove") {
    await onRemove(payload);
  }
  await loadingSubmit(false);
};
const onRegister = async (payload: any) => {
  payload.user_id = userAuthenticate._id;
  await createTodo(payload);
  onReset();
};
const onEdit = async (payload: any) => {
  await updateTodo(payload);
  onReset();
};
const onRemove = async (payload: any) => {
  await deleteTodo(payload);
  onReset();
};
const onReset = () => {
  payloadForm.value._id = undefined;
  payloadForm.value.description = null;
  payloadForm.value.status = "todo";

  actionForm.value.action = "register";

  if (uuidRef.value) uuidRef.value.resetValidation();
  if (descriptionRef.value) descriptionRef.value.resetValidation();
  if (statusRef.value) statusRef.value.resetValidation();
};
</script>

<template>
  <!--  <div class="q-px-md q-py-md bg-dark text-white q-my-md">-->
  <!--    <pre>{{ payloadForm }}</pre>-->
  <!--  </div>-->

  <q-form class="q-gutter-md" @submit.prevent.stop="onSubmit(payloadForm)" @reset="onReset">
    <template v-if="actionForm.action === 'remove'">
      <q-input :ref="descriptionRef" outlined v-model="payloadForm.description" disable label="Descripción" :rules="[(val) => !!val || 'Campo obligatorio']" />
    </template>
    <template v-else>
      <q-input :ref="descriptionRef" outlined v-model="payloadForm.description" label="Descripción" :rules="[(val) => !!val || 'Campo obligatorio']" />
      <q-select :ref="statusRef" outlined v-model="payloadForm.status" :options="statuses" map-options label="Estado" emit-value :rules="[(val) => !!val || 'Campo obligatorio']" />
    </template>
    <q-btn type="submit" color="primary" label="Guardar" v-if="actionForm.action === 'register'" :loading="loading" :disable="loading">
      <template v-slot:loading><q-spinner /></template>
    </q-btn>
    <q-btn type="submit" color="secondary" label="Actualizar" v-if="actionForm.action === 'edit'" :loading="loading" :disable="loading">
      <template v-slot:loading><q-spinner /></template>
    </q-btn>
    <q-btn type="submit" color="red" label="Eliminar" v-if="actionForm.action === 'remove'" :loading="loading" :disable="loading">
      <template v-slot:loading><q-spinner /></template>
    </q-btn>
    <q-btn type="reset" outline color="primary" label="Cancelar" :disable="loading" />
  </q-form>
</template>

<style scoped></style>
