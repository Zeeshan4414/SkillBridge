import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Goal, GoalSchema } from "./schema/goals.schema";
import { GoalsService } from "./goals.service";
import { GoalsController } from "./goals.controller";
import { OpenaiModule } from "src/openai/openai.module";
import { ProjectsModule } from "src/projects/projects.module";
import { ProjectSchema } from "src/projects/Schema/projects.schema";


@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
            name: Goal.name,
            useFactory: () => GoalSchema
        },
        {
            name: 'Project',
            useFactory: () => ProjectSchema// Assuming you have a method to get the Project schema
        }
    ]),
        
        OpenaiModule,
        
    ],
    
    providers: [GoalsService],
    controllers: [GoalsController],
    exports: [GoalsService] // Export if i want to use this module in other modules
})
export class GoalsModule {}