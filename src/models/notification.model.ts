import { NotificationType } from "../enums/notification-type.enum";
import { BaseModel } from './base/base.model';

export class NotificationModel extends BaseModel {
    from: string;
    type: NotificationType;
    isRead: Boolean;
    link: string;
    linkKey: string;
    createdAt: Date;
}