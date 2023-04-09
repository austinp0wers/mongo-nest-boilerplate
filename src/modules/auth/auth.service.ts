import { CryptoService } from './../../shared/utils/crypto/crypto.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/service/user.service.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async handleOAuthLogin(user: any) {
    // Check if the user already exists in your database based on their email address.
    let existingUser = await this.userService.findUserBy('email', user.email);

    if (!existingUser) {
      // If the user doesn't exist, create a new user in your database.
      existingUser = await this.userService.createUser({
        email: user.email,
        name: `${user.lastName} ${user.firstName}`,
        provider: user.provider,
      });
    }
    const { accessToken } = this.generateJwtToken(user.email, existingUser._id);
    return { user: existingUser, accessToken };
  }

  generateJwtToken(email: string, clientId: string) {
    const payload = { email, clientId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken, expiresIn: process.env.JWT_EXPIRES_IN };
  }

  async isValidUser(loginDto): Promise<User | null> {
    const userDetail = await this.userService.findUserBy(
      'email',
      loginDto.email,
    );

    if (!userDetail) return null;

    const isCorrectPassword = this.cryptoService.compareHash(
      userDetail.password,
      loginDto.password,
    );

    if (!isCorrectPassword) return null;
    return userDetail;
  }
}
