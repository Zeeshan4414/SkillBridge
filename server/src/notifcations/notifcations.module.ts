import { Module } from '@nestjs/common';
import { NotifcationsService } from './notifcations.service';
import { NotifcationsController } from './notifcations.controller';

@Module({
  providers: [NotifcationsService],
  controllers: [NotifcationsController]
})
export class NotifcationsModule {}
