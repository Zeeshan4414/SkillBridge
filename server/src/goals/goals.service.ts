import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Goal, GoalDocument } from "./schema/goals.schema";
import { Model } from "mongoose";

import { Project, ProjectDocument } from "src/projects/Schema/projects.schema";
import { GroqService } from "src/openai/openai.service";
// import { OpenaiService } from "src/openai/openai.service";



@Injectable()
export class GoalsService{
    constructor(
        @InjectModel(Goal.name)
        private readonly goalModel: Model<GoalDocument>,
        @InjectModel(Project.name)
        private readonly projectModel: Model<ProjectDocument>,
        private readonly groqService: GroqService

    ){}

    async create(data: {title: string, description?:string, projectId: string, createdBy: string}){
        return await this.goalModel.create(data)
    }

    async generateGoalFromAi(projectId: string, userId: string){
        const project= await this.projectModel.findById(projectId).exec();
        if(!project) throw new ForbiddenException("Project not found");

        const res = await this.groqService.generateGoals(project.title, project.description);
        console.log("AI response from GroqService:", res);

        const goals= res.map(goal => ({
            title: goal.title,
            description: goal.description,
            projectId,
            createdBy: userId,
        }))
        


        return this.goalModel.insertMany(goals);
    }

    async findAllForProject(projectId: string){
        return this.goalModel.find({projectId}).exec();
    }

    async update(goalId: string, userId:string, role: string, data:any){
        const goal= await this.goalModel.findById(goalId).exec();
        if(!goal)
        throw new ForbiddenException("Goal not found");
        

        if(goal.createdBy.toString() !== userId && role !== 'admin' ){
            throw new ForbiddenException("You are not authorized to update this goal");
        }

        return this.goalModel.findByIdAndUpdate(goalId, data, {new: true}).exec();
    }

    async delete(goalId: string, userId:string, role: string){
        const goal= await this.goalModel.findById(goalId).exec();
        if(!goal)
        throw new ForbiddenException("Goal not found");
        

        if(goal.createdBy.toString() !== userId && role !== 'admin' ){
            throw new ForbiddenException("You are not authorized to udelete this goal");
        }

        return this.goalModel.findByIdAndDelete(goalId);
    }
}