import { CanActivate, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    canActivate(context: any): boolean {
        const reqRoles = this.reflector.getAllAndOverride<string[]>('Roles_Key', [
            context.getHandler(),
            context.getClass(),
        ]); // Retrieve the roles metadata from the route handler or class
        if (!reqRoles) {
            return true; // If no roles are defined, allow access
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Get the user from the request
        // if (!user || !reqRoles.includes(user.role)) {
        //     return false; // If user is not defined or does not have the required role, deny access
           
        // }
        console.log('User Role:', user?.role);
console.log('Required Roles:', reqRoles);
return user && reqRoles.includes(user.role); // ✅ Proper role check; // If user has the required role, allow access
    }


}