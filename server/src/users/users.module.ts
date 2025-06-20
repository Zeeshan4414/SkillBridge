import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schma/users.schma";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";


@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: User.name,
      useFactory: () => UserSchema
    }]), // Register the User schema
  ], 
  controllers: [UsersController], // Register the UsersController
  providers: [UsersService], // Register the UsersService
  exports: [UsersService], // Export the UsersService for use in other modules

})
export class UsersModule {}