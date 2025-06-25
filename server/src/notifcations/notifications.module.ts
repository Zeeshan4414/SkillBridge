import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotifcationsController } from './notifications.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './Schema/notifications.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Notification.name,
        useFactory: () => NotificationSchema
      }
    ])
  ],
  providers: [NotificationsService],
  controllers: [NotifcationsController],
  exports: [NotificationsService], // Export the NotifcationsService for use in other modules
})
export class NotifcationsModule {}
