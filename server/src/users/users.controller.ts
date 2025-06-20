import { Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/role.decorator";


@Controller('users')
// @UseGuards(RolesGuard) // Use the RolesGuard to protect this controller
export class UsersController {
  // This controller will handle user-related routes
  // You can define methods here to handle requests
  // For example, to get all users, create a user, etc.

  @UseGuards(JwtAuthGuard,RolesGuard) // Use the JWT authentication guard to protect this route
  @Get('/profile')
  @Roles('admin', 'user') // Use the Roles decorator to specify that only users with the 'admin' role can access this route
  
  getProfile(@Request() req){
    return req.user;   // Return the user information from the request
  }
@UseGuards(JwtAuthGuard, RolesGuard) // Use the JWT authentication guard to protect this route
  @Get('/admin')
@Roles('admin') // Use the Roles decorator to specify that only users with the 'admin' role can access this route
    getAdminProfile(@Request() req) {
        return {message: 'This is the admin profile', user: req.user}; // Return a message and user information for admin profile
    }




}