import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schma/users.schma";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
  // This service will handle user-related business logic
  // You can define methods here to interact with the database or perform operations
  // For example, to create a user, find users, etc.
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>) // Inject the User model for database operations
   {
  }
  async create(userData: Partial<User>){
    const newUser = new this.userModel(userData); // Create a new user instance
    return newUser.save(); // Save the user to the database
    
  }
  async findByEmail(email: string){
    return this.userModel.findOne({ email }).exec(); // Find a user by email

}
async findById(id: string) {
    return this.userModel.findById(id).exec(); // Find a user by ID
  }
}