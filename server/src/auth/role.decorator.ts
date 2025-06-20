import { SetMetadata } from "@nestjs/common";

 
 export const Roles_Key= 'Roles_Key'; // Define a constant for the metadata key
 export const Roles= (...roles: string[]) => SetMetadata(Roles_Key, roles);
// This decorator can be used to set roles for a route or controller