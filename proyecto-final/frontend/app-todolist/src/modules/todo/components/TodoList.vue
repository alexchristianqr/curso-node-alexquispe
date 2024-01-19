<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodoStore } from "../store";
import { onMounted, reactive, ref } from "vue";
import TodoForm from "./TodoForm.vue";
import { ConfigForm, Todo } from "../interfaces";

const { todos } = storeToRefs(useTodoStore());
const { getTodos } = useTodoStore();

const configForm = ref<ConfigForm>({ action: "register" });
const payloadForm = reactive<Todo>({});

const columns = [
  { name: "description", label: "Descripción", field: "description", sortable: true, align: "left" },
  { name: "status", label: "Estado", field: "status", sortable: false, align: "left" },
  { name: "created_at", label: "Fecha creado", field: "created_at", sortable: true, align: "left" },
  { name: "updated_at", label: "Fecha actualizado", field: "updated_at", sortable: true, align: "left" },
  { name: "actions", label: "Acciones", field: "actions", sortable: false, align: "left" },
];
const rows = todos;

onMounted(() => {
  getTodos();
  configForm.value.action = "register";
  payloadForm.status = "todo";
});

const editForm = (data: Todo) => {
  configForm.value.action = "edit";
  payloadForm._id = data._id;
  payloadForm.description = data.description;
  payloadForm.status = data.status;
  payloadForm.created_at = data.created_at;
  payloadForm.updated_at = data.updated_at;
};
const removeForm = (data: Todo) => {
  configForm.value.action = "remove";
  payloadForm._id = data._id;
  payloadForm.description = data.description;
  payloadForm.status = data.status;
  payloadForm.created_at = data.created_at;
};
</script>

<template>
  <h4>Formulario</h4>
  <TodoForm :config-form="configForm" :payload-form="payloadForm" />

  <h4>Listado</h4>
  <div class="q-pb-xl">
    <q-table :columns="columns" :rows="rows" bordered flat row-key="name">
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge color="warning" v-if="props.row.status === 'todo'">Por hacer</q-badge>
          <q-badge color="purple" v-if="props.row.status === 'in_progress'">En progreso</q-badge>
          <q-badge color="green" v-if="props.row.status === 'complete'">Completado</q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round icon="edit" color="primary" @click="editForm(props.row)" :disable="props.row.status === 'complete'" />
          <q-btn flat round icon="delete" color="primary" @click="removeForm(props.row)" :disable="props.row.status === 'in_progress'" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
