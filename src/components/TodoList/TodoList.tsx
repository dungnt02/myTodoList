import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import TaskInput from '../TaskInput/TaskInput'
import TaskList from '../TaskList/TaskList'
import styles from './todoList.module.scss'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todoID, setTodoID] = useState<string>('')
  const [name, setName] = useState<string>('')
  const doneTodos = todos.filter((todo) => todo.done)
  const notdoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => {
      if (todoID.length === 0) {
        return [...prev, todo]
      } else {
        return prev.map((todo) => {
          if (todo.id === todoID) {
            return { ...todo, name }
          }
          return todo
        })
      }
    })
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    const newTodosObj = [...todosObj, todo]
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
  }
  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }
  const handleEdit = (name: string) => {
    setName(name)
  }
  const handleDelete = (id: string) => {
    setTodos((prev) => {
      return prev.filter((todo) => {
        return todo.id !== id
      })
    })
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} name={name} setName={setName} setTodoID={setTodoID} />
        <TaskList
          todos={notdoneTodos}
          doneTaskList={false}
          handleDoneTodo={handleDoneTodo}
          handleEdit={handleEdit}
          setTodoID={setTodoID}
          handleDelete={handleDelete}
        />
        <TaskList
          todos={doneTodos}
          doneTaskList
          handleDoneTodo={handleDoneTodo}
          handleEdit={handleEdit}
          setTodoID={setTodoID}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  )
}
