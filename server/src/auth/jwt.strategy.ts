import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";



@Injectable()

export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header as a Bearer token
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'), // Use environment variable for JWT secret
        })
    }
        async validate(payload: any) {
            // This method is called by Passport to validate the JWT token
            return { userId: payload.sub, email: payload.email, role: payload.role}; // Return user information from the token payload
    }
}
