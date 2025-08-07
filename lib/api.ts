import { Todo, CreateTodo } from '@/types/todo'

const API_URL = 'http://localhost:3001'

// 모든 Todo 가져오기
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`)
  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }
  return response.json()
}

// Todo 추가하기
export const createTodo = async (todo: CreateTodo): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error('Failed to create todo')
  }
  return response.json()
}

// Todo 수정하기
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error('Failed to update todo')
  }
  return response.json()
}

// Todo 삭제하기
export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }
}