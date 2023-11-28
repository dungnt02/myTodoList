import { Todo } from '../../@types/todo.type'
import styles from './TaskList.module.scss'

interface TaskListProps {
  doneTaskList: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  handleEdit: (name: string) => void
  setTodoID: React.Dispatch<React.SetStateAction<string>>
  handleDelete: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, handleEdit, setTodoID, handleDelete } = props
  const handleEditTodo = (name: string, id: string) => {
    handleEdit(name)
    setTodoID(id)
  }
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={(event) => handleDoneTodo(todo.id, event.target.checked)}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => handleEditTodo(todo.name, todo.id)}>
                🖊
              </button>
              <button className={styles.taskBtn} onClick={() => handleDelete(todo.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
