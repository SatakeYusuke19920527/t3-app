import useStore from '../store'
import db from '../utils/db'
import { api } from '../utils/api'

export const useMutateTask = () => {
  const utils = api.useContext()
  api.todo.createTask.useMutation()
  const reset = useStore((state) => state.resetEditedTask)

  const createTaskMutation = api.todo.createTask.useMutation({
    onSuccess: (res) => {
      const previousTodos = db.todo.getTasks.getData()
      if (previousTodos) {
        utils.todo.getTasks.setData([res, ...previousTodos])
      }
      reset()
    },
  })
  const updateTaskMutation = api.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const previousTodos = utils.todo.getTasks.getData()
      if (previousTodos) {
        utils.todo.getTasks.setData(
          previousTodos.map((task) => (task.id === res.id ? res : task))
        )
      }
      reset()
    },
  })
  const deleteTaskMutation = api.todo.deleteTask.useMutation({
    onSuccess: (_, variables) => {
      const previousTodos = utils.todo.getTasks.getData()
      if (previousTodos) {
        api.todo.getTasks.setData(
          previousTodos.filter((task) => task.id !== variables.taskId)
        )
      }
      reset()
    },
  })
  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}