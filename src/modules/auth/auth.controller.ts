import { AuthService } from './auth.service';
import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: any, @Res() res: any): Promise<void> {
    // Handles the Google OAuth2 callback
    const { user } = req;
    const userDetails = await this.authService.handleOAuthLogin(user);
    return res.send(
      `
      <script>
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

  // Do the same for Naver and KakaoTalk.
}
