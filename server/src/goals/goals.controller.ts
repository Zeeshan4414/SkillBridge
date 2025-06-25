import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { GoalsService } from "./goals.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('goals')
export class GoalsController {
    constructor(
        private readonly goalsService: GoalsService
    ){}


    @Post()
    async create(@Body() body:any, @Req() req){
        return this.goalsService.create({
            ...body,
            createdBy: req.user.userId
    })
    }

    @Get('/:projectId')
    async getGoals(@Param('projectId') projectId: string){
        return await this.goalsService.findAllForProject(projectId);
    }

    @Patch('/:goalId')
    async update(@Param('goalId') goaldId: string, @Body() body:any , @Req() req){
        return await this.goalsService.update(goaldId, req.user.userId, req.user.role, body);
    }

    @Delete('/:goalId')
    async delete(@Param('goalId') goalId: string, @Req() req){
        return await this.goalsService.delete(goalId, req.user.userId, req.user.role);
    }
}