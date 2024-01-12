<script setup lang="ts">
import { reactive } from "vue";
import { ConfigForm, Todo } from "../interfaces";
import { useTodoStore } from "../store";

const { createTodo, updateTodo, deleteTodo } = useTodoStore();

const props = defineProps<{
  configForm?: ConfigForm;
  payloadForm?: Todo;
}>();
const statuses = [
  { key: "todo", value: "Por hacer" },
  { key: "in_progress", value: "En progreso" },
  { key: "complete", value: "Completado" },
];
const payloadForm = reactive<Todo>(props.payloadForm);

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

  <form>
    <div>
      <label>Descripción:</label>
      <input type="text" v-model="payloadForm.description" />
    </div>
    <div>
      <label>Estado:</label>
      <select v-model="payloadForm.status">
        <option v-for="status in statuses" :key="status.key" :value="status.key">{{ status.value }}</option>
      </select>
    </div>
    <div>
      <label>Accion:</label>
      <button type="button" v-if="props.configForm?.action === 'register'" @click="onRegister(payloadForm)">Registrar</button>
      <button type="button" v-if="props.configForm?.action === 'edit'" @click="onEdit(payloadForm)">Actualizar registro</button>
      <button type="button" v-if="props.configForm?.action === 'remove'" @click="onRemove(payloadForm)">Eliminar registro</button>
      <button type="reset" v-if="props.configForm?.action === 'edit' || props.configForm?.action === 'remove'">Cancelar</button>
      <button type="submit" v-if="props.configForm?.action !== 'register'">Nuevo</button>
    </div>
  </form>
</template>

<style scoped></style>
