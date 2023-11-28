import styles from './TaskInput.module.scss'
interface TaskInputProps {
  addTodo: (name: string) => void
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  setTodoID: React.Dispatch<React.SetStateAction<string>>
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, name, setName, setTodoID } = props
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(name)
    setName('')
    setTodoID('')
  }
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='caption goes here' value={name} onChange={onChangeInput} />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}
