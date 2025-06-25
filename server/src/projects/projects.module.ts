import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './Schema/projects.schema';
import { NotificationsModule } from 'src/notifcations/notifications.module';

@Module({
   imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Project.name,
        useFactory: () => ProjectSchema
      },
      
    ]),
    NotificationsModule
   ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
