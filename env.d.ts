declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_SECRET_USER_AUTH: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      BITRIX_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
