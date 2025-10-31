import { PrismaClient } from '@prisma/client';
import { User, CreateUserData, UserDTO } from '../types/user.model';

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateUserData): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        fname: data.fname,
        lname: data.lname,
        phone: data.phone,
        balance: 0,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateBalance(id: string, balance: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { balance },
    });
  }

  async update(id: string, data: Partial<CreateUserData & { role?: string; password?: string }>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...(data.fname && { fname: data.fname }),
        ...(data.lname && { lname: data.lname }),
        ...(data.phone && { phone: data.phone }),
        ...(data.email && { email: data.email }),
        ...(data.role && { role: data.role }),
        ...(data.password && { password: data.password }),
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return this.prisma.user.count();
  }

  async getTotalBalance(): Promise<number> {
    const result = await this.prisma.user.aggregate({
      _sum: {
        balance: true,
      },
    });
    return result._sum.balance || 0;
  }

  toDTO(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      balance: user.balance,
      createdAt: user.createdAt,
    };
  }
}