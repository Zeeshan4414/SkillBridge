import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';


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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
