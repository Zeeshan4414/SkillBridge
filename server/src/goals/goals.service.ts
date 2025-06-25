import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Goal, GoalDocument } from "./schema/goals.schema";
import { Model } from "mongoose";

@Injectable()
export class GoalsService{
    constructor(
        @InjectModel(Goal.name)
        private readonly goalModel: Model<GoalDocument>
    ){}

    async create(data: {title: string, description?:string, projectId: string, createdBy: string}){
        return await this.goalModel.create(data)
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