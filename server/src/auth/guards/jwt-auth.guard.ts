import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()

export class JwtAuthGuard extends AuthGuard('jwt'){
    // This guard uses the JWT strategy for authentication
    // It will automatically validate the JWT token in the request
    // If the token is valid, it allows the request to proceed
    // If the token is invalid or missing, it will throw an UnauthorizedException
}