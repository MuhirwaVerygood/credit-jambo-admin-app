import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminService, DashboardStats, AdminUser, AdminDevice, AdminTransaction } from '../services/admin.service';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      console.log('useDashboardStats - Fetching dashboard stats');
      const result = await adminService.getDashboardStats();
      console.log('useDashboardStats - Fetched stats:', result);
      return result;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async (): Promise<AdminUser[]> => {
      console.log('useAllUsers - Fetching all users');
      const result = await adminService.getAllUsers();
      console.log('useAllUsers - Fetched users:', result);
      return result;
    },
  });
};

export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: ['admin-user', userId],
    queryFn: async (): Promise<AdminUser> => {
      console.log('useUserById - Fetching user by ID:', userId);
      const result = await adminService.getUserById(userId);
      console.log('useUserById - Fetched user:', result);
      return result;
    },
    enabled: !!userId,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => adminService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useAllDevices = () => {
  return useQuery({
    queryKey: ['admin-devices'],
    queryFn: async (): Promise<AdminDevice[]> => {
      console.log('useAllDevices - Fetching all devices');
      const result = await adminService.getAllDevices();
      console.log('useAllDevices - Fetched devices:', result);
      return result;
    },
  });
};

export const useUpdateDeviceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deviceId, status }: { deviceId: string; status: string }) =>
      adminService.updateDeviceStatus(deviceId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-devices'] });
    },
  });
};

export const useAllTransactions = () => {
  return useQuery({
    queryKey: ['admin-transactions'],
    queryFn: async (): Promise<AdminTransaction[]> => {
      console.log('useAllTransactions - Fetching all transactions');
      const result = await adminService.getAllTransactions();
      console.log('useAllTransactions - Fetched transactions:', result);
      return result;
    },
  });
};