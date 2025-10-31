import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { verifyToken } from '../utils/auth.utils';

export class AdminController {
  constructor(private adminService: AdminService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      // Check for token in Authorization header first, then fallback to cookies
      let token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        token = req.cookies['auth-token'];
      }

      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const payload = await verifyToken(token);

      // Check if user is admin
      if (payload.role !== 'admin') {
        res.status(403).json({ error: 'Access denied. Admin role required.' });
        return;
      }

      const users = await this.adminService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('[AdminController] Get all users error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      // Check for token in Authorization header first, then fallback to cookies
      let token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        token = req.cookies['auth-token'];
      }

      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const payload = await verifyToken(token);

      // Check if user is admin
      if (payload.role !== 'admin') {
        res.status(403).json({ error: 'Access denied. Admin role required.' });
        return;
      }

      const { userId } = req.params;
      const user = await this.adminService.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('[AdminController] Get user by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      // Check for token in Authorization header first, then fallback to cookies
      let token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        token = req.cookies['auth-token'];
      }

      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const payload = await verifyToken(token);

      // Check if user is admin
      if (payload.role !== 'admin') {
        res.status(403).json({ error: 'Access denied. Admin role required.' });
        return;
      }

      const { userId } = req.params;
      const updateData = req.body;

      const updatedUser = await this.adminService.updateUser(userId, updateData);
      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('[AdminController] Update user error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      // Check for token in Authorization header first, then fallback to cookies
      let token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        token = req.cookies['auth-token'];
      }

      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const payload = await verifyToken(token);

      // Check if user is admin
      if (payload.role !== 'admin') {
        res.status(403).json({ error: 'Access denied. Admin role required.' });
        return;
      }

      const { userId } = req.params;
      await this.adminService.deleteUser(userId);

      res.status(200).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('[AdminController] Delete user error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAllTransactions(req: Request, res: Response): Promise<void> {
    try {
      // Check for token in Authorization header first, then fallback to cookies
      let token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        token = req.cookies['auth-token'];
      }

      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const payload = await verifyToken(token);

      // Check if user is admin
      if (payload.role !== 'admin') {
        res.status(403).json({ error: 'Access denied. Admin role required.' });
        return;
      }

      const transactions = await this.adminService.getAllTransactions();
      res.status(200).json(transactions);
    } catch (error) {
      console.error('[AdminController] Get all transactions error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  async getDashboardStats(req: Request, res: Response): Promise<void> {
    try {
      // Check for token in Authorization header first, then fallback to cookies
      let token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        token = req.cookies['auth-token'];
      }

      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const payload = await verifyToken(token);

      // Check if user is admin
      if (payload.role !== 'admin') {
        res.status(403).json({ error: 'Access denied. Admin role required.' });
        return;
      }

      const stats = await this.adminService.getDashboardStats();
      res.status(200).json(stats);
    } catch (error) {
      console.error('[AdminController] Get dashboard stats error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}