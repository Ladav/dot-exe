import { ConfigService } from '@nestjs/config';
import { Inject, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { google } from 'googleapis';
import { EnvironmentVars } from '../configs/config-module.options';

export class GoogleAuthClientMiddleware implements NestMiddleware {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService<EnvironmentVars>) {}

  use(req: Request, res: Response, next: NextFunction) {
    // extract cookies
    const accessToken: string = req.cookies.Authentication;
    const refreshToken: string = req.cookies.RefreshToken;

    const clientId = this.configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
    const redirectURI = this.configService.get('GOOGLE_REDIRECT_URI');

    // instantiate a new oauth2 client
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI);
    oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

    const driveClient = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });

    // add driveClient and oauth2Client on request
    req.gOAuth2Client = oauth2Client;
    req.gDriveClient = driveClient;

    next();
  }
}
