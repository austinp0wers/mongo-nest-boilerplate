/* eslint-disable @typescript-eslint/no-empty-function */
import { AuthService } from './auth.service';
import {
  Controller,
  UseGuards,
  Get,
  Req,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@sentry/node';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async localLogin(@Req() req, @Res() res, @Body() loginDto: any) {
    // validate to see if user exist
    const isUserValid: User | null = await this.authService.isValidUser(
      loginDto,
    );

    if (!isUserValid) {
      return res.status(404).json({ message: 'not found' });
    }

    const tokens = this.authService.generateJwtToken(
      isUserValid.email,
      isUserValid._id,
    );

    return res.status(200).json({ message: 'success', tokens });
  }

  @Post('sign-up')
  public async registerUser(@Req() req, @Res() res, @Body() signUpDto) {
    const user = await this.authService.isValidUser(signUpDto.email);

    if (user) {
      return res.status(409).json({ message: 'user conflict' });
    }
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: any, @Res() res: any): Promise<void> {
    // Handles the Google OAuth2 callback
    const { user } = req;
    const userDetails = await this.authService.handleOAuthLogin(user);
    return res.send(
      `<script>
        window.opener.postMessage(${JSON.stringify({
          access_token: userDetails.accessToken,
          email: userDetails.user.email,
          expires_in: 1500,
          token_type: 'Bearer',
        })}, "${process.env.CLIENT_URI}");
        window.close();
      </script>
    `,
    );
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {}

  // Do the same for Naver and KakaoTalk.
}
