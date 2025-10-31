import { UserRepository } from '../repositories/user.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { DeviceRepository } from '../repositories/device.repository';
import { UserDTO, UpdateUserData } from '../types/user.model';
import { TransactionDTO } from '../types/transaction.model';
import { DeviceDTO } from '../types/device.model';

export class AdminService {
  constructor(
    private userRepository: UserRepository,
    private transactionRepository: TransactionRepository,
    private deviceRepository: DeviceRepository
  ) {}

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => this.userRepository.toDTO(user));
  }

  async getUserById(userId: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return null;
    }
    return this.userRepository.toDTO(user);
  }

  async updateUser(userId: string, data: UpdateUserData): Promise<UserDTO> {
    const updatedUser = await this.userRepository.update(userId, data);
    return this.userRepository.toDTO(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async getAllTransactions(): Promise<TransactionDTO[]> {
    const transactions = await this.transactionRepository.findAll();
    return transactions.map(transaction => this.transactionRepository.toDTO(transaction));
  }


  async getDashboardStats(): Promise<{
    totalUsers: number;
    totalTransactions: number;
    totalDeposits: number;
    totalWithdrawals: number;
    pendingDevices: number;
    verifiedDevices: number;
    totalBalance: number;
  }> {
    const [
      totalUsers,
      totalTransactions,
      totalDeposits,
      totalWithdrawals,
      pendingDevices,
      verifiedDevices,
      totalBalance
    ] = await Promise.all([
      this.userRepository.count(),
      this.transactionRepository.count(),
      this.transactionRepository.countByType('deposit'),
      this.transactionRepository.countByType('withdraw'),
      this.deviceRepository.countByStatus('pending'),
      this.deviceRepository.countByStatus('verified'),
      this.userRepository.getTotalBalance()
    ]);

    return {
      totalUsers,
      totalTransactions,
      totalDeposits,
      totalWithdrawals,
      pendingDevices,
      verifiedDevices,
      totalBalance
    };
  }
}