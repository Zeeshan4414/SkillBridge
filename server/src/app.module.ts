import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { NotificationsModule } from './notifcations/notifications.module';
import { GoalsModule } from './goals/goals.module';


@Module({
  imports: [
    // for load env in road before use it
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //DB Connection
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    ProjectsModule,
    NotificationsModule,
    GoalsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
