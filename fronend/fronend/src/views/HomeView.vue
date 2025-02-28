<template>
  <div class="q-pa-md">
    <!-- ส่วนหัวของตาราง -->
    <q-btn @click="createTask" label="Create Task" color="red" class="q-mb-md"/>

    <!-- ตารางแสดงรายการงาน -->
    <q-table
      title="Task Management"
      :rows="tasks"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-btn @click="deleteTask(props.row.id)" color="negative" icon="delete" flat/>
        <q-btn @click="updateTask(props.row)" color="warning" icon="edit" flat/>
      </template>
    </q-table>

    <!-- แสดงรายละเอียดงาน -->
    <q-dialog v-model="showTaskDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Task Details</div>
          <div><strong>Title: </strong>{{ selectedTask.title }}</div>
          <div><strong>Status: </strong>{{ selectedTask.status }}</div>
          <div><strong>Description: </strong>{{ selectedTask.description }}</div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Close" @click="showTaskDialog = false" color="secondary" flat/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const columns = [
      { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
      { name: 'title', align: 'center', label: 'Task Title', field: 'title', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
    ]

    const tasks = ref([
      { id: 1, title: 'Task 1', status: 'Pending', description: 'Description for task 1' },
      { id: 2, title: 'Task 2', status: 'In Progress', description: 'Description for task 2' }
    ])

    const showTaskDialog = ref(false)
    const selectedTask = ref({})

    const createTask = () => {
      const newTask = {
        id: tasks.value.length + 1,
        title: `Task ${tasks.value.length + 1}`,
        status: 'Pending',
        description: 'New task description'
      }
      tasks.value.push(newTask)
    }

    const updateTask = (task) => {
      selectedTask.value = task
      showTaskDialog.value = true
    }

    const deleteTask = (taskId) => {
      tasks.value = tasks.value.filter(task => task.id !== taskId)
    }

    return {
      columns,
      tasks,
      createTask,
      updateTask,
      deleteTask,
      showTaskDialog,
      selectedTask
    }
  }
}
</script>

<style scoped>
</style>
