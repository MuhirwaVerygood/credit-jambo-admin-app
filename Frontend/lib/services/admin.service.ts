import { authorizedAPI } from '../api-client';

export interface AdminUser {
  id: string;
  email: string;
  fname: string;
  lname: string;
  phone: string;
  balance: number;
  role: string;
  createdAt: string;
}

export interface AdminDevice {
  id: string;
  userId: string;
  deviceId: string;
  status: string;
  requestedAt: string;
  verifiedAt: string | null;
  user?: {
    id: string;
    email: string;
    fname: string;
    lname: string;
  };
}

export interface AdminTransaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  balanceAfter: number;
  createdAt: string;
  user?: {
    id: string;
    email: string;
    fname: string;
    lname: string;
  };
}

export interface DashboardStats {
  totalUsers: number;
  totalTransactions: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingDevices: number;
  verifiedDevices: number;
  totalBalance: number;
}

export const adminService = {
  async getAllUsers(): Promise<AdminUser[]> {
    const response = await authorizedAPI.get('/admin/users');
    return response.data;
  },

  async getUserById(userId: string): Promise<AdminUser> {
    const response = await authorizedAPI.get(`/admin/users/${userId}`);
    return response.data;
  },

  async deleteUser(userId: string): Promise<{ message: string }> {
    const response = await authorizedAPI.delete(`/admin/users/${userId}`);
    return response.data;
  },

  async getAllDevices(): Promise<AdminDevice[]> {
    const response = await authorizedAPI.get('/admin/devices');
    return response.data;
  },

  async updateDeviceStatus(deviceId: string, status: string): Promise<{ message: string }> {
    const response = await authorizedAPI.put(`/admin/devices/${deviceId}/status`, { status });
    return response.data;
  },

  async getAllTransactions(): Promise<AdminTransaction[]> {
    const response = await authorizedAPI.get('/admin/transactions');
    return response.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await authorizedAPI.get('/admin/dashboard/stats');
    return response.data;
  },
};