// src/types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string; // Assuming userId is a string
  }
}

declare module 'express' {
  interface Request {
    session?: Session & Partial<SessionData>; // Adding session to the Request interface
  }
}
