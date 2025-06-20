import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProjectsService} from './projects.service';
import { Roles } from 'src/auth/role.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard) // Use the JWT authentication guard and RolesGuard to protect this controller
export class ProjectsController {
constructor(
    private readonly projectsService: ProjectsService, // Inject the ProjectsService to handle project-related operations)
){}
@Post('/create')
async create(@Body() body:any, @Req() req){
    return await this.projectsService.create({
        ...body,
        ownerId: req.user.userId, // Assuming req.user contains the authenticated user's information
    })
}

@Get('/all')
@Roles('admin')
async findAll(){
    return await this.projectsService.findAll(); // Retrieve all projects
}

@Get('/:id')
async findOne(@Param('id') id:string){
    return await this.projectsService.findOne(id); // Retrieve a project by ID
}

@Patch('/:id')
async update(@Param('id') id: string, @Body() body: any, @Req() req) {
    return await this.projectsService.update(id, req.user.userId, req.user.role, body); 
}

@Delete('/:id')
async delete(@Param('id') id: string, @Req() req) {
    return await this.projectsService.delete(id, req.user.role, req.user.userId); // Delete a project by ID
}
}
