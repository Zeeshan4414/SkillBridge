import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service' // Import the NotificationsService to handle notification-related operations
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notifcations')
export class NotifcationsController {
    constructor(
        private readonly notificationsService: NotificationsService, // Inject the NotificationService to handle notification-related operations
    ){}

    @Get()
    async getNotifications(@Req() req){
        return this.notificationsService.findForUser(req.user.userId); // Retrieve notifications for the authenticated user
    }

    @Patch(':id/mark-read')
    async markAsRead(@Param('id') id:string){
        return this.notificationsService.markasRead(id); // Mark a notification as read by its ID
    }
}
