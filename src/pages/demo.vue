<template>
  <div class="q-pa-md">
    <q-option-group :options="options" type="checkbox" v-model="group" />
  </div>
  <div class="row q-pa-sm-bg-primary">
    <q-input
      v-model="text"
      bg-color="white"
      label="Add Task"
      class="col"
      :dense="true"
    >
      <template v-slot:append>
        <q-btn round dense flat icon="add" @click="addTask" />
      </template>
    </q-input>
  </div>
  <q-list bordered separator>
    <q-item
      v-for="(todo, i) in todoList"
      clickable
      v-ripple
      :key="todo.title"
      @click="todo.done = !todo.done"
      :class="{ 'done bg-green-1': todo.done }"
    >
      <q-item-section avatar>
        <q-checkbox v-model="todo.done" class="no-pointer-events" />
      </q-item-section>
      <q-item-section>{{ todo.title }}</q-item-section>
      <q-item-section side v-if="todo.done">
        <q-btn
          icon="delete"
          color="primary"
          dense
          flat
          round
          @click.stop="deleteFn(i)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
defineOptions({
  name: 'DemoPage',
});

const $q = useQuasar();
const group = ref([]);
const options = [
  { label: 'Battery too low', value: 'bat' },
  { label: 'Friend request', value: 'friend', color: 'green' },
  { label: 'Picture uploaded', value: 'upload', color: 'red' },
];
const todoList = ref([
  { title: 'get bannans', done: true },
  { title: 'eat bannans', done: false },
  { title: 'poo bannans', done: false },
]);
const text = ref('');

const addTask = () => {
  todoList.value.push({
    title: text.value,
    done: false,
  });
  text.value = '';
};
const deleteFn = (i: number) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Really delete?',
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      todoList.value.splice(i, 1);
      $q.notify('Task deleted');
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
    });
};
</script>
<style lang="scss">
.colorful {
  color: aquamarine;
}
.done {
  .q-item__section--main {
    text-decoration: line-through;
    color: #ddd;
  }
}
</style>
