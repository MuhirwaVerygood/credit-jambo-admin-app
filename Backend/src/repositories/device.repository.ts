import { PrismaClient, Device } from '@prisma/client';

export interface DeviceDTO {
  id: string;
  userId: string;
  deviceId: string;
  status: string;
  requestedAt: Date;
  verifiedAt: Date | null;
  user?: {
    id: string;
    email: string;
    fname: string;
    lname: string;
  };
}

export class DeviceRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Device[]> {
    return this.prisma.device.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fname: true,
            lname: true,
          },
        },
      },
      orderBy: {
        requestedAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Device | null> {
    return this.prisma.device.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fname: true,
            lname: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Device[]> {
    return this.prisma.device.findMany({
      where: { userId },
      orderBy: {
        requestedAt: 'desc',
      },
    });
  }

  async findByDeviceId(deviceId: string): Promise<Device | null> {
    return this.prisma.device.findFirst({
      where: { deviceId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fname: true,
            lname: true,
          },
        },
      },
    });
  }

  async create(data: { userId: string; deviceId: string; status?: string }): Promise<Device> {
    return this.prisma.device.create({
      data: {
        userId: data.userId,
        deviceId: data.deviceId,
        status: data.status || 'pending',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fname: true,
            lname: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Partial<Device>): Promise<Device> {
    return this.prisma.device.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fname: true,
            lname: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.device.delete({
      where: { id },
    });
  }

  async countByStatus(status: string): Promise<number> {
    return this.prisma.device.count({
      where: { status },
    });
  }

  toDTO(device: Device & { user?: { id: string; email: string; fname: string; lname: string } }): DeviceDTO {
    return {
      id: device.id,
      userId: device.userId,
      deviceId: device.deviceId,
      status: device.status,
      requestedAt: device.requestedAt,
      verifiedAt: device.verifiedAt,
      user: device.user ? {
        id: device.user.id,
        email: device.user.email,
        fname: device.user.fname,
        lname: device.user.lname,
      } : undefined,
    };
  }
}