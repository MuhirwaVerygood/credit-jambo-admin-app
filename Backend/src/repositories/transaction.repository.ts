import { PrismaClient } from '@prisma/client';
import { Transaction, CreateTransactionData, TransactionDTO } from '../types/transaction.model';

export class TransactionRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateTransactionData): Promise<Transaction> {
    return this.prisma.transaction.create({
      data,
    });
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
  }

  toDTO(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      type: transaction.type === 'withdraw' ? 'withdrawal' : transaction.type as 'deposit' | 'withdrawal',
      amount: transaction.amount,
      balanceAfter: transaction.balanceAfter,
      timestamp: transaction.timestamp,
      createdAt: transaction.timestamp.toISOString(),
      description: `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} of $${transaction.amount}`,
      status: 'completed' as const,
    };
  }

  async findAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      orderBy: { timestamp: 'desc' },
      include: { user: true },
    });
  }

  async count(): Promise<number> {
    return this.prisma.transaction.count();
  }

  async countByType(type: string): Promise<number> {
    return this.prisma.transaction.count({
      where: { type },
    });
  }
}

