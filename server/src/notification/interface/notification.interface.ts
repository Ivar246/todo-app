import { NotificationStatus, NotificationType } from '@prisma/client';

export interface CreateNotification {
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  user_id: number;
}
