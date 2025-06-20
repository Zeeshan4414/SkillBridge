import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '3600s' },
    }),
    }), // Register JWT module with secret and expiration time
    UsersModule, // Import UsersModule to access user-related methods
  ],  
    controllers: [AuthController], // Register the AuthController to handle authentication routes
    providers: [AuthService, JWTStrategy], // Register the AuthService to handle authentication logic
    exports: [AuthService],
})  
export class AuthModule {
  // This module will handle authentication-related functionality
  // You can define providers, controllers, and imports here as needed
  // For example, you might import a UsersModule or JwtModule for JWT authentication
}