import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Goal } from 'src/goals/schema/goals.schema';
import { Project, ProjectDocument } from 'src/projects/Schema/projects.schema';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
    constructor(
        @InjectModel(Project.name)
        private projectModel: Model<ProjectDocument>,
        @InjectModel(Goal.name)
        private goalModel: Model<Goal>
    ){}

    @Get()
    async getDashboard(@Req() req){
        const userId= req.user.userId;
        const role = req.user.role;

        const projectQuery= role === 'admin' ? {} : { ownerId: userId };
        const goalQuery = role === 'admin' ? {} : { createdBy: userId };

        const totalProjects = await this.projectModel.countDocuments(projectQuery).exec();
        const totalGoals = await this.goalModel.countDocuments(goalQuery).exec();
        const completedGoals= await this.goalModel.countDocuments({...goalQuery, completed: true}).exec();
        const pendingGoals = totalGoals - completedGoals;

        return{
            totalProjects,
            totalGoals,
            completedGoals,
            pendingGoals
        };
    }
}
