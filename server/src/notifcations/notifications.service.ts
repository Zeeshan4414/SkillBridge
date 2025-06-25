import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './Schema/notifications.schema';
import { Model } from 'mongoose';
@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification.name)
        private readonly notificationModel: Model<NotificationDocument> 
    ){}

    async create(message: string, recipient: string){
        return await this.notificationModel.create({message, recipient});
    }

    async findForUser(userId: string) {
        return this.notificationModel.find({recipient: userId}).sort({createdAt: -1}).exec();
    }

    async markasRead(notificationId: string) {
        return this.notificationModel.findByIdAndUpdate(notificationId, {read: true}, {new: true})
    }
}
