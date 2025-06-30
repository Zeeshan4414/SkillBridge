import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/projects/Schema/projects.schema';
import { Goal, GoalSchema } from 'src/goals/schema/goals.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
      name: Project.name
      , 
      useFactory: () => ProjectSchema // Assuming you have a method to get the Project schema
      },
      {
        name: Goal.name,
        useFactory: () => GoalSchema
      }
    ])
  ],
  controllers: [DashboardController]
})
export class DashboardModule {}
