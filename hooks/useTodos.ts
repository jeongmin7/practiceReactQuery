import { createTodo, deleteTodo, fetchTodos, updateTodo } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Todo 목록 가져오기
export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}

// Todo 추가하기
export const useCreateTodo =()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey :['todos']});
    },
})
}

// Todo 삭제하기
export const useDeleteTodo = () => {
const queryClient = useQueryClient();
return useMutation({
  mutationFn : deleteTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['todos']});
  },  
})
}


//Todo 수정하기
export const useUpdateTodo = () => {
const queryClient =useQueryClient();
return useMutation({
  mutationFn : updateTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['todos']});
  },
})}
