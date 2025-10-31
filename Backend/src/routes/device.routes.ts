import { Router } from 'express';
import { DeviceController } from '../controllers/device.controller';
import { DeviceService } from '../services/device.service';
import { DeviceRepository } from '../repositories/device.repository';
import { PrismaClient } from '@prisma/client';

const router: Router = Router();
const prisma = new PrismaClient();

const deviceRepository = new DeviceRepository(prisma);
const deviceService = new DeviceService(deviceRepository);
const deviceController = new DeviceController(deviceService);

// Device management routes
router.get('/devices', (req, res) => deviceController.getAllDevices(req, res));
router.get('/devices/:deviceId', (req, res) => deviceController.getDeviceById(req, res));
router.put('/devices/:deviceId/status', (req, res) => deviceController.updateDeviceStatus(req, res));
router.delete('/devices/:deviceId', (req, res) => deviceController.deleteDevice(req, res));

// Device stats
router.get('/devices/stats', (req, res) => deviceController.getDeviceStats(req, res));

export default router;