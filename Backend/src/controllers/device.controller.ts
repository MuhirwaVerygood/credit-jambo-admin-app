import { Request, Response } from 'express';
import { DeviceService } from '../services/device.service';
import { verifyToken } from '../utils/auth.utils';

export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  async getAllDevices(req: Request, res: Response): Promise<void> {
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

      const devices = await this.deviceService.getAllDevices();
      res.status(200).json(devices);
    } catch (error) {
      console.error('[DeviceController] Get all devices error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getDeviceById(req: Request, res: Response): Promise<void> {
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

      const { deviceId } = req.params;
      const device = await this.deviceService.getDeviceById(deviceId);

      if (!device) {
        res.status(404).json({ error: 'Device not found' });
        return;
      }

      res.status(200).json(device);
    } catch (error) {
      console.error('[DeviceController] Get device by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateDeviceStatus(req: Request, res: Response): Promise<void> {
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

      const { deviceId } = req.params;
      const { status } = req.body;

      if (!status || !['pending', 'verified', 'rejected'].includes(status)) {
        res.status(400).json({ error: 'Invalid status. Must be pending, verified, or rejected.' });
        return;
      }

      const updatedDevice = await this.deviceService.updateDeviceStatus(deviceId, status);
      res.status(200).json({
        message: 'Device status updated successfully',
        device: updatedDevice,
      });
    } catch (error) {
      console.error('[DeviceController] Update device status error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteDevice(req: Request, res: Response): Promise<void> {
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

      const { deviceId } = req.params;
      await this.deviceService.deleteDevice(deviceId);

      res.status(200).json({
        message: 'Device deleted successfully',
      });
    } catch (error) {
      console.error('[DeviceController] Delete device error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getDeviceStats(req: Request, res: Response): Promise<void> {
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

      const stats = await this.deviceService.getDeviceStats();
      res.status(200).json(stats);
    } catch (error) {
      console.error('[DeviceController] Get device stats error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}