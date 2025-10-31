import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';
import { UserRepository } from '../repositories/user.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { DeviceRepository } from '../repositories/device.repository';
import { PrismaClient } from '@prisma/client';

const router: Router = Router();
const prisma = new PrismaClient();

const userRepository = new UserRepository(prisma);
const transactionRepository = new TransactionRepository(prisma);
const deviceRepository = new DeviceRepository(prisma);
const adminService = new AdminService(userRepository, transactionRepository, deviceRepository);
const adminController = new AdminController(adminService);

// User management routes
router.get('/users', (req, res) => adminController.getAllUsers(req, res));
router.get('/users/:userId', (req, res) => adminController.getUserById(req, res));
router.put('/users/:userId', (req, res) => adminController.updateUser(req, res));
router.delete('/users/:userId', (req, res) => adminController.deleteUser(req, res));

// Transaction management routes
router.get('/transactions', (req, res) => adminController.getAllTransactions(req, res));

// Device management routes removed

// Dashboard stats
router.get('/dashboard/stats', (req, res) => adminController.getDashboardStats(req, res));

export default router;