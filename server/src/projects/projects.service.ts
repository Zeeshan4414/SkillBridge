import { ForbiddenException, Injectable } from '@nestjs/common';
import { Project, ProjectDocument } from './Schema/projects.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationsService } from 'src/notifcations/notifications.service';

@Injectable()
export class ProjectsService {

constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private readonly notificationsService: NotificationsService
  )
    {}

async create(data:{title:string, description?:string, ownerId:string}) {
    const project= await this.projectModel.create(data); // Save the project to the database

    await this.notificationsService.create(
      `The Project "${project.title}" Crated Successfully!`,
      project.ownerId // Notify the owner of the project creation
    )
    return project; // Return the created project



}
async findAll(
    page: number,
    limit: number,
    search?: string,
    sortBy?: string,
    order?: string
){
    const skip = (page - 1) * limit;
  
    // 🔍 Build the filter
    const filter: any = {}
  
    // Add search on title (case-insensitive)
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
  
    // 🔄 Build sort object (e.g., { title: 1 })
    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    }
  
    // 🚀 Fetch paginated data and total count
    const [projects, total] = await Promise.all([
      this.projectModel.find(filter).sort(sortOptions).skip(skip).limit(limit).exec(),
      this.projectModel.countDocuments(filter).exec(),
    ]);
  
    return {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      projects,
    };

}
async findOne(id: string){
    return await this.projectModel.findById(id).exec(); // Find a project by ID

}
async findUsersProjects(
    userId: string,
    role: string,
    page: number,
    limit: number,
    search?: string,
    sortBy?: string,
    order?: string
  ) {
    const skip = (page - 1) * limit;
  
    // 🔍 Build the filter
    const filter: any = {}
  
    // Add search on title (case-insensitive)
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
  
    // 🔄 Build sort object (e.g., { title: 1 })
    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    }
  
    // 🚀 Fetch paginated data and total count
    const [projects, total] = await Promise.all([
      this.projectModel.find(filter).sort(sortOptions).skip(skip).limit(limit).exec(),
      this.projectModel.countDocuments(filter).exec(),
    ]);
  
    return {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      projects,
    };
  }
async update(id: string, userId: string, role: string, updateDate: any) {

    const project = await this.findOne(id); // Find the project by ID
    console.log('🔍 project.ownerId:', project?.ownerId);
    console.log('🔍 request.userId:', userId);
    console.log('🔍 user role:', role);
    if(project?.ownerId.toString() !== userId && role !== 'admin'){
        throw new ForbiddenException('You are not allowed to update this project'); // Check if the user is allowed to update the project
    }
    return this.projectModel.findByIdAndUpdate(id, updateDate, { new: true }).exec(); // Update the project and return the updated project

}
async delete(id: string, role:string, userId: string) {
    const project = await this.findOne(id); // Find the project by ID
    if(project?.ownerId !== userId && role !== 'admin'){
        throw new ForbiddenException('You are not allowed to delete this project'); // Check if the user is allowed to update the project
    }
    return this.projectModel.findByIdAndDelete(id) // Update the project and return the updated project
}
}
