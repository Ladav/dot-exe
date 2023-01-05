import { Injectable } from '@nestjs/common';
import { authenticate } from '@google-cloud/local-auth';
import * as path from 'path';
import { Response } from 'express';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

@Injectable()
export class AuthService {
  async authorize(res: Response): Promise<any> {
    const client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });

    const { access_token, refresh_token } = client.credentials;
    // Set the access_token and refresh_token as a cookie on the response
    res.cookie('Authentication', access_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
    res.cookie('RefreshToken', refresh_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
  }
}
