import { UserRepository } from '../repositories/user.repository';
import { hashPassword, comparePassword, createToken, validateEmail, validatePassword, JWTPayload } from '../utils/auth.utils';
import { CreateUserData, UserDTO } from '../types/user.model';

export class AuthService {
  constructor(
    private userRepository: UserRepository
  ) {}

  async register(data: CreateUserData): Promise<{ userId: string; deviceStatus: string }> {
    if (!validateEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = hashPassword(data.password);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
      role: data.role || 'user',
    });

    return {
      userId: user.id,
      deviceStatus: 'verified',
    };
  }

  async login(email: string, password: string): Promise<{ user: UserDTO; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!comparePassword(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = await createToken({
      userId: user.id,
      email: user.email,
      deviceId: '',
      role: user.role,
    });

    const userDTO = await this.userRepository.toDTO(user);

    return { user: userDTO, token };
  }

  async logout(): Promise<void> {
    // In a stateless JWT system, logout is handled client-side by removing the token
    // If we need server-side logout, we could implement a token blacklist
    return Promise.resolve();
  }
}