import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Goal, GoalSchema } from "./schema/goals.schema";
import { GoalsService } from "./goals.service";


@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
            name: Goal.name,
            useFactory: () => GoalSchema
        }])
    ],
    providers: [GoalsService],
    controllers: [],
    exports: [] // Export if i want to use this module in other modules
})
export class GoalsModule {}