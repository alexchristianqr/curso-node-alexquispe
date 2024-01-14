<script setup lang="ts">
import { reactive } from "vue";
import { ConfigForm, Todo } from "../interfaces";
import { useTodoStore } from "../store";

const { createTodo, updateTodo, deleteTodo } = useTodoStore();

const props = defineProps<{
  configForm?: ConfigForm;
  payloadForms?: Todo;
}>();
const statuses = [
  { value: "todo", label: "Por hacer" },
  { value: "in_progress", label: "En progreso" },
  { value: "complete", label: "Completado" },
];
const payloadForm = reactive<Todo | any>(props.payloadForms);

const onRegister = (data: any) => {
  createTodo(data);
  window.location.reload();
};
const onEdit = (data: any) => {
  updateTodo(data);
  window.location.reload();
};
const onRemove = (data: any) => {
  deleteTodo(data);
  window.location.reload();
};
</script>

<template>
  <!--  <div style="border: solid 1px; padding: 0.5rem; margin: 1rem 0 1rem 0">-->
  <!--    <pre>{{ payloadForm }}</pre>-->
  <!--  </div>-->

  <q-form class="q-gutter-md">
    <q-input outlined v-model="payloadForm.description" label="Descripción" />

    <q-select outlined v-model="payloadForm.status" :options="statuses" map-options label="Estado" emit-value />

    <q-btn outline color="primary" label="Guardar" v-if="props.configForm?.action === 'register'" @click="onRegister(payloadForm)" />
    <q-btn outline color="secondary" label="Actualizar" v-if="props.configForm?.action === 'edit'" @click="onEdit(payloadForm)" />
    <q-btn outline color="red" label="Eliminar" v-if="props.configForm?.action === 'remove'" @click="onRemove(payloadForm)" />
    <q-btn outline color="purple" label="Cancelar" v-if="props.configForm?.action === 'edit' || props.configForm?.action === 'remove'" @click="onRemove(payloadForm)" />
    <q-btn outline color="standard" label="Nuevo" v-if="props.configForm?.action !== 'register'" @click="onRemove(payloadForm)" />
  </q-form>
</template>

<style scoped></style>
