<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodoStore } from "../store";
import { onMounted } from "vue";
import TodoForm from "./TodoForm.vue";

const { todos } = storeToRefs(useTodoStore());
const { getTodos } = useTodoStore();

onMounted(() => {
  getTodos();
});
</script>

<template>
  <TodoForm :configForm="{ action: 'register' }" />

  <hr style="margin: 1rem 0 1rem 0" />
  <div style="border: solid 1px; padding: 0.5rem; margin: 1rem 0 1rem 0">
    <pre>{{ todos }}</pre>
  </div>

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
              <button>editar</button>
              <button>eliminar</button>
            </template>
            <template v-if="todo.status == 'in_progress'">
              <button>editar</button>
              <button>eliminar</button>
            </template>
            <template v-if="todo.status == 'todo'">
              <button>editar</button>
              <button>eliminar</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
