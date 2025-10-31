import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, fname, lname, phone, role } = req.body;

      if (!email || !password || !fname || !lname || !phone) {
        res.status(400).json({ error: 'Email, password, first name, last name, and phone are required' });
        return;
      }

      const result = await this.authService.register({
        email,
        password,
        fname,
        lname,
        phone,
        role,
      });

      res.status(201).json({
        message: 'Registration successful.',
        ...result,
      });
    } catch (error) {
      console.error('[AuthController] Registration error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const result = await this.authService.login(email, password);


      res.status(200).json({
        message: 'Login successful',
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      console.error('[AuthController] Login error:', error);
      res.status(401).json({ error: (error as Error).message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      await this.authService.logout();

      res.clearCookie('auth-token');
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('[AuthController] Logout error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}