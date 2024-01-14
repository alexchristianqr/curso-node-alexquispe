<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodoStore } from "../store";
import { onMounted, reactive, ref } from "vue";
import TodoForm from "./TodoForm.vue";
import { Todo } from "../interfaces";

const { todos } = storeToRefs(useTodoStore());
const { getTodos } = useTodoStore();

const configForm = ref({ action: "register" });
const payloadForm = reactive<Todo>({});

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
  <h2>Formulario</h2>

  <TodoForm :configForm="configForm" :payloadForm="payloadForm" @register="" />

  <h2>Listado</h2>

  <!--  <div style="border: solid 1px; padding: 0.5rem; margin: 1rem 0 1rem 0">-->
  <!--    <pre>{{ todos }}</pre>-->
  <!--  </div>-->

  <div>
    <table>
      <thead>
        <tr>
          <td style="border: solid 1px">Descripcion</td>
          <td style="border: solid 1px">Fecha creado</td>
          <td style="border: solid 1px">Estado</td>
          <td style="border: solid 1px">Acciones</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos">
          <td>{{ todo.description }}</td>
          <td>{{ todo.created_at }}</td>
          <td>
            <span v-if="todo.status === 'todo'" style="color: yellow; background-color: black">Por hacer</span>
            <span v-if="todo.status === 'in_progress'" style="color: cyan; background-color: black">En progreso</span>
            <span v-if="todo.status === 'complete'" style="color: red; background-color: black">Completado</span>
          </td>
          <td>
            <template v-if="todo.status == 'complete'">
              <button disabled>editar</button>
              <button disabled>eliminar</button>
            </template>
            <template v-if="todo.status == 'in_progress'">
              <button @click="editForm(todo)">editar</button>
              <button disabled>eliminar</button>
            </template>
            <template v-if="todo.status == 'todo'">
              <button @click="editForm(todo)">editar</button>
              <button @click="removeForm(todo)">eliminar</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
