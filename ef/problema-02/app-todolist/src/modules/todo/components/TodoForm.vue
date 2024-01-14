<script setup lang="ts">
import { computed, reactive } from "vue";
import { ConfigForm, Todo } from "../interfaces";
import { useTodoStore } from "../store";

const { createTodo, updateTodo, deleteTodo } = useTodoStore();

const props = defineProps<{
  configForm: ConfigForm;
  payloadForm?: Todo;
}>();
const statuses = [
  { value: "todo", label: "Por hacer" },
  { value: "in_progress", label: "En progreso" },
  { value: "complete", label: "Completado" },
];
const payloadForm = reactive<Todo | any>(props.payloadForm);
const actionForm = computed(() => props.configForm);

const onRegister = (payload: any) => {
  createTodo(payload);
  onReset();
};
const onEdit = (payload: any) => {
  updateTodo(payload);
  onReset();
};
const onRemove = (payload: any) => {
  deleteTodo(payload);
  onReset();
};
const onReset = () => {
  payloadForm._id = undefined;
  payloadForm.description = null;
  payloadForm.status = "todo";
  payloadForm.created_at = null;
  payloadForm.updated_at = null;
  actionForm.value.action = "register";
};
</script>

<template>
  <!--  <div style="border: solid 1px; padding: 0.5rem; margin: 1rem 0 1rem 0">-->
  <!--    <pre>{{ payloadForm }}</pre>-->
  <!--  </div>-->

  <q-form class="q-gutter-md">
    <template v-if="actionForm.action === 'remove'">
      <q-input outlined v-model="payloadForm._id" disable label="Descripción" />
    </template>
    <template v-else>
      <q-input outlined v-model="payloadForm.description" label="Descripción" />
      <q-select outlined v-model="payloadForm.status" :options="statuses" map-options label="Estado" emit-value />
    </template>

    <q-btn outline color="primary" label="Guardar" v-if="actionForm.action === 'register'" @click="onRegister(payloadForm)" />
    <q-btn outline color="secondary" label="Actualizar" v-if="actionForm.action === 'edit'" @click="onEdit(payloadForm)" />
    <q-btn outline color="red" label="Eliminar" v-if="actionForm.action === 'remove'" @click="onRemove(payloadForm)" />
    <q-btn outline color="purple" label="Cancelar" v-if="actionForm.action === 'edit' || actionForm.action === 'remove'" @click="onReset()" />
  </q-form>
</template>

<style scoped></style>
