// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    interface Request {
      gOAuth2Client?: import('googleapis').Auth.OAuth2Client;
      gDriveClient?: import('googleapis').drive_v3.Drive;
    }
  }
}
