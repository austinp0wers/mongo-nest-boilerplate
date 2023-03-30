import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/service/user.service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

    const accessToken = this.generateJwtToken(
      user.email,
      existingUser._id,
      'member',
    );
    return { user: existingUser, accessToken };
  }

  generateJwtToken(email: string, clientId: string, role: string): string {
    const payload = { email, clientId, role };
    return this.jwtService.sign(payload);
  }

  // ... other authentication and authorization related methods
}
