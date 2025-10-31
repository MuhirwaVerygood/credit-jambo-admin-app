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

export interface CreateDeviceData {
  userId: string;
  deviceId: string;
  status?: string;
}

export interface UpdateDeviceData {
  status?: string;
  verifiedAt?: Date | null;
}