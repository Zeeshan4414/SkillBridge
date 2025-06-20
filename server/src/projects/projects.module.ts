import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './Schema/projects.schema';

@Module({
   imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Project.name,
        useFactory: () => ProjectSchema
      }
    ])
   ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
