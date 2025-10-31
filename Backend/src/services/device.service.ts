import { DeviceRepository, DeviceDTO } from '../repositories/device.repository';
import { DeviceDTO as DeviceTypeDTO, UpdateDeviceData } from '../types/device.model';

export class DeviceService {
  constructor(private deviceRepository: DeviceRepository) {}

  async getAllDevices(): Promise<DeviceDTO[]> {
    const devices = await this.deviceRepository.findAll();
    return devices.map(device => this.deviceRepository.toDTO(device));
  }

  async getDeviceById(id: string): Promise<DeviceDTO | null> {
    const device = await this.deviceRepository.findById(id);
    if (!device) {
      return null;
    }
    return this.deviceRepository.toDTO(device);
  }

  async getDevicesByUserId(userId: string): Promise<DeviceDTO[]> {
    const devices = await this.deviceRepository.findByUserId(userId);
    return devices.map(device => this.deviceRepository.toDTO(device));
  }

  async updateDeviceStatus(id: string, status: string): Promise<DeviceDTO> {
    const updateData: UpdateDeviceData = {
      status,
      verifiedAt: status === 'verified' ? new Date() : null,
    };

    const updatedDevice = await this.deviceRepository.update(id, updateData);
    return this.deviceRepository.toDTO(updatedDevice);
  }

  async deleteDevice(id: string): Promise<void> {
    await this.deviceRepository.delete(id);
  }

  async getDeviceStats(): Promise<{
    totalDevices: number;
    pendingDevices: number;
    verifiedDevices: number;
    rejectedDevices: number;
  }> {
    const [totalDevices, pendingDevices, verifiedDevices, rejectedDevices] = await Promise.all([
      this.deviceRepository.countByStatus('all'), // We'll need to modify this
      this.deviceRepository.countByStatus('pending'),
      this.deviceRepository.countByStatus('verified'),
      this.deviceRepository.countByStatus('rejected'),
    ]);

    return {
      totalDevices: pendingDevices + verifiedDevices + rejectedDevices,
      pendingDevices,
      verifiedDevices,
      rejectedDevices,
    };
  }
}