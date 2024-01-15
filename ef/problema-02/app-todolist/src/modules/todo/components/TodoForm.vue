<script setup lang="ts">
import { computed, ref } from "vue";
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
const payloadForm = ref<Todo | any>(props.payloadForm);
const actionForm = computed(() => props.configForm);

const descriptionRef = ref();
const statusRef = ref();
const uuidRef = ref();

const onSubmit = (payload: any) => {
  if (actionForm.value.action === "register") {
    onRegister(payload);
  } else if (actionForm.value.action === "edit") {
    onEdit(payload);
  } else if (actionForm.value.action === "remove") {
    onRemove(payload);
  } else {
    return;
  }
};
const onRegister = async (payload: any) => {
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
      <q-input :ref="uuidRef" outlined v-model="payloadForm._id" disable label="UUID" :rules="[(val) => !!val || 'Campo obligatorio']" />
    </template>
    <template v-else>
      <q-input :ref="descriptionRef" outlined v-model="payloadForm.description" label="Descripción" :rules="[(val) => !!val || 'Campo obligatorio']" />
      <q-select :ref="statusRef" outlined v-model="payloadForm.status" :options="statuses" map-options label="Estado" emit-value :rules="[(val) => !!val || 'Campo obligatorio']" />
    </template>

    <q-btn type="submit" color="primary" label="Guardar" v-if="actionForm.action === 'register'" />
    <q-btn type="submit" color="secondary" label="Actualizar" v-if="actionForm.action === 'edit'" />
    <q-btn type="submit" color="red" label="Eliminar" v-if="actionForm.action === 'remove'" />
    <q-btn type="reset" outline color="primary" label="Cancelar" />
  </q-form>
</template>

<style scoped></style>
