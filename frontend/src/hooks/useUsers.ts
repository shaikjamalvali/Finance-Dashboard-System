import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersService } from '../services/users'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.listUsers(),
  })
}

export const useUser = (id: string | undefined) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => (id ? usersService.getUser(id) : null),
    enabled: !!id,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersService.createUser,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      usersService.updateUser(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['users'] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersService.deleteUser,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['users'] })
    },
  })
}
