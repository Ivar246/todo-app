import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotification } from './interface';
import { NotificationStatus } from '@prisma/client';
import { stat } from 'fs';

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) {}

  async create(notificationDto: CreateNotification) {
    try {
      const notification = await this.prismaService.notification.create({
        data: {
          ...notificationDto,
        },
      });

      return notification;
    } catch (error) {
      throw error;
    }
  }

  async fetchUnReadNotification(email: string) {
    try {
      const notifications = await this.prismaService.notification.findMany({
        where: { user: { email: email }, status: NotificationStatus.UNREAD },
      });
      return notifications;
    } catch (error) {
      throw error;
    }
  }

  async updateNotificationStatus(
    notification_id: number,
    status: NotificationStatus,
  ) {
    try {
      const updatedNotification = await this.prismaService.notification.update({
        where: { id: notification_id },
        data: {
          status: status,
        },
      });
      return updatedNotification;
    } catch (error) {}
  }
}
