'use client'
import { useCreateTodo, useDeleteTodo, useTodos, useUpdateTodo } from '@/hooks/useTodos'
import { Todo } from '@/types/todo'
import { useState } from 'react'

export default function TodoApp() {
 const [newTodoTitle, setNewTodoTitle] = useState('')
 
 // TODO: React Query 훅들로 서버 데이터와 상호작용
 const {data: todos, isLoading, error} = useTodos()
 const createTodoMutation = useCreateTodo()
 const updateTodoMutation = useUpdateTodo()
 const deleteTodoMutation = useDeleteTodo()

 // TODO: Todo 추가 함수
 const handleAddTodo = async (e: React.FormEvent) => {
   e.preventDefault()
   if (!newTodoTitle.trim()) return
   
   try {
     await createTodoMutation.mutateAsync({
       title: newTodoTitle,
       completed: false
     })
     setNewTodoTitle('')
   } catch (error) {
     console.error('Todo 추가 실패:', error)
   }
 }

 // TODO: Todo 완료상태 토글 함수
 const handleToggleTodo = async (todo: Todo) => {
   try {
     await updateTodoMutation.mutateAsync({
       ...todo,
       completed: !todo.completed
     })
   } catch (error) {
     console.error('Todo 수정 실패:', error)
   }
 }

 // TODO: Todo 삭제 함수
 const handleDeleteTodo = async (id: number) => {
   try {
     await deleteTodoMutation.mutateAsync(id)
   } catch (error) {
     console.error('Todo 삭제 실패:', error)
   }
 }

 // TODO: 로딩 상태 처리
 if (isLoading) {
   return (
     <div className="flex justify-center items-center min-h-screen">
       <div className="text-xl">로딩중...</div>
     </div>
   )
 }

 // TODO: 에러 상태 처리
 if (error) {
   return (
     <div className="flex justify-center items-center min-h-screen">
       <div className="text-xl text-red-500">에러가 발생했습니다!</div>
     </div>
   )
 }

 return (
   <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
     <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
       Todo List
     </h1>
     
     {/* TODO: Todo 추가 폼 */}
     <form onSubmit={handleAddTodo} className="mb-6">
       <div className="flex gap-2">
         <input
           type="text"
           value={newTodoTitle}
           onChange={(e) => setNewTodoTitle(e.target.value)}
           placeholder="새 할 일을 입력하세요"
           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           disabled={createTodoMutation.isPending}
         />
         <button
           type="submit"
           disabled={createTodoMutation.isPending || !newTodoTitle.trim()}
           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           {createTodoMutation.isPending ? '추가중...' : '추가'}
         </button>
       </div>
     </form>

     {/* TODO: Todo 목록 */}
     <div className="space-y-2">
       {todos?.map((todo: Todo) => (
         <div
           key={todo.id}
           className="flex items-center gap-3 p-3 border border-gray-200 rounded-md"
         >
           <input
             type="checkbox"
             checked={todo.completed}
             onChange={() => handleToggleTodo(todo)}
             disabled={updateTodoMutation.isPending}
             className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
           />
           <span
             className={`flex-1 ${
               todo.completed
                 ? 'text-gray-500 line-through'
                 : 'text-gray-800'
             }`}
           >
             {todo.title}
           </span>
           <button
             onClick={() => handleDeleteTodo(todo.id)}
             disabled={deleteTodoMutation.isPending}
             className="px-2 py-1 text-red-500 hover:bg-red-50 rounded disabled:opacity-50"
           >
             삭제
           </button>
         </div>
       ))}
     </div>

     {/* TODO: 빈 상태 처리 */}
     {todos?.length === 0 && (
       <div className="text-center text-gray-500 mt-6">
         할 일이 없습니다. 새로운 할 일을 추가해보세요!
       </div>
     )}
   </div>
 )
}