import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";


@Injectable()
export class AuthService {
  // This service will handle authentication-related business logic
  // You can define methods here to authenticate users, validate tokens, etc.
  // For example, to log in a user, register a user, etc.


constructor(
    private readonly usersService: UsersService, // Inject UsersService to access user-related methods
    private readonly jwtService: JwtService, // Inject JwtService for JWT token generation)
 ) { 
    // Constructor logic here
}

async register(name: string, email: string, password: string) {
    // Logic to register a user
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
    // You can use the UsersService to create a new user in the database

    return this.usersService.create({
        name,
        email,
        password: hashedPassword, // Store the hashed password
    })
}

async login(email: string, password: string){
    // Logic to log in a user
    const user= await this.usersService.findByEmail(email); // Find the user by email using UsersService
    if(!user){
        throw new UnauthorizedException("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        throw new UnauthorizedException("Invalid credentials");
    }
    // Generate a JWT token for the user
    const payload = { sub: user._id, email: user.email, role: user.role }; // Create a payload with user information
    return {
        accessToken: this.jwtService.sign(payload), // Sign the payload to create a JWT token
        user, // Return the user information
    };
}
}
