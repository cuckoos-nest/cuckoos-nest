import { NotificationModel } from './../../models/notification.model';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { NotificationService } from './../../services/notification.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { UploadService } from "../../services/upload.service";
import { NotificationType } from '../../enums/notification-type.enum';

@IonicPage()
@Component({
  selector: 'notifications-page',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  private notifications: Observable<NotificationModel[]>;
  private users: UserModel[] = [];
  private isLoaded: Boolean;
  private isEmpty: Boolean;

  @ViewChild('content') private content: Content;

  constructor(private navCtrl: NavController, private userUploadsService: UploadService,
              private notificationService: NotificationService, private userService: UserService) {
  }

  ionViewDidLoad(): void {
    this.notifications = this.notificationService.getAll();
    this.notifications.subscribe(notifications => {
      this.isLoaded = true;
      this.isEmpty = notifications.length == 0;
    });
  }

  ionViewDidEnter() {
    this.scrollTop(500);
  }

  private isSystemMessage(notification: NotificationModel  ) {
    return notification.isSystem;
  }

  private scrollTop(speed = 0, delay = 0) {
    setTimeout(() => {
      if (this.content._scroll) {
        this.content.scrollToTop(speed);
      }
    }, delay);
  }

  private notificationTypeToResource(type: NotificationType) {
    return "NOTIFICATION_" + NotificationType[type].toUpperCase();
  }

  private clearNotifications() {
    this.notificationService.clearAll();
  }

  private onNotificationClicked(notification: NotificationModel) {

    if(notification.isSystem)
      return;
    switch (notification.link) {
      case 'upload':
        this.userUploadsService.get(notification.linkKey).subscribe(upload => {
          this.navCtrl.push('WallItemPage', {
            upload
          });
        });
        break;
    }
  }

}
