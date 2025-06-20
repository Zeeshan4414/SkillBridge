import { ForbiddenException, Injectable } from '@nestjs/common';
import { Project, ProjectDocument } from './Schema/projects.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {

constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>)
    {}

async create(data:{title:string, description?:string, ownerId:string}) {
    return await this.projectModel.create(data); // Save the project to the database

}
async findAll(){
    return await this.projectModel.find().exec(); // Find all projects
}
async findOne(id: string){
    return await this.projectModel.findById(id).exec(); // Find a project by ID

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
