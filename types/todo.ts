export interface Todo {
    id: number
    title: string
    completed: boolean
  }
  
  export interface CreateTodo {
    title: string
    completed?: boolean
  }