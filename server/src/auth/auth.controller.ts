import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async googleAuth(@Res({ passthrough: true }) res: Response) {
    return this.authService.authorize(res);
  }
}
