<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ConfigForm, Todo } from "../interfaces";
import { useTodoStore } from "../store";

const { createTodo } = useTodoStore();

const props = defineProps<{
  configForm?: ConfigForm;
  payloadForm?: Todo;
}>();
const statuses = [
  { key: "todo", value: "Por hacer" },
  { key: "in_progress", value: "En progreso" },
  { key: "complete", value: "Completado" },
];
const payloadForm = ref<Todo>({
  description: props.payloadForm?.description,
  status: props.payloadForm?.status,
  created_at: props.payloadForm?.created_at,
});

onMounted(() => {
  props.configForm.action = "register";
});
</script>

<template>
  <form>
    <div style="border: solid 1px; padding: 0.5rem; margin: 1rem 0 1rem 0">
      <pre>{{ payloadForm }}</pre>
    </div>
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
      <button type="button" v-if="props.configForm?.action === 'register'" @click="createTodo(payloadForm)">Registrar</button>
      <button type="button" v-if="props.configForm?.action === 'edit'">Actualizar</button>
    </div>
  </form>
</template>

<style scoped></style>
