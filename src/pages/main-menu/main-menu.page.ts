import { NotificationsPage } from './../notifications/notifications.page';
import { UserPage } from './../user/user.page';
import { SearchPage } from './../search/search.page';
import { CategoriesPage } from './../categories/categories.page';
import { WallPage } from './../wall/wall.page';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './../../services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'main-menu-page',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  private wallTab: Component;
  private searchTab: Component;
  private addTab: Component;
  private profileTab: Component;
  private notificationsTab: Component;
  private newNotifications: Observable<number>;

  constructor(private notificationService: NotificationService) {
    this.wallTab = WallPage;
    this.searchTab = SearchPage;
    this.addTab = CategoriesPage;
    this.profileTab = UserPage;
    this.notificationsTab = NotificationsPage;
  }

  ionViewDidLoad() {
    this.newNotifications = this.notificationService.countUnread();
  }

  private resetNotifications() {
    this.notificationService.markAllAsRead();
  }
}
