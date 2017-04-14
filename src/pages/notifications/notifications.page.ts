import { WallItemPage } from './../wall-item/wall-item.page';
import { NotificationModel } from './../../models/notification.model';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { NotificationService } from './../../services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UploadService } from "../../services/upload.service";
import { NotificationType } from '../../enums/notification-type.enum';

@IonicPage({
  name: 'notifications-page'
})
@Component({
  selector: 'notifications-page',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  private notifications: Observable<NotificationModel[]>;
  private users: UserModel[] = [];
  private isLoaded: Boolean;
  private isEmpty: Boolean;

  constructor(private navCtrl: NavController, private userUploadsService: UploadService,
              private notificationService: NotificationService, private userService: UserService) {
    this.notifications = this.notificationService.getAll();
  }

  ionViewDidLoad(): void {
    this.notifications.subscribe(notifications => {
      this.isLoaded = true;
      this.isEmpty = notifications.length == 0;
    });
  }

  private notificationTypeToResource(type: NotificationType) {
    return "NOTIFICATION_" + NotificationType[type].toUpperCase();
  }

  private clearNotifications() {
    this.notificationService.clearAll();
  }

  private onNotificationClicked(notification: NotificationModel) {
    switch (notification.link) {
      case 'upload':
        this.userUploadsService.get(notification.linkKey).subscribe(upload => {
          this.navCtrl.push(WallItemPage, {
            upload
          });
        });
        break;
    }
  }

}
