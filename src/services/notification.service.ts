import { NotificationModel } from './../models/notification.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import Config from '../config.json';

import { WebSocketService, WebSocketResponse, WebSocketResponseType } from '../services/websocket.service';
import { AuthService } from './auth.service';

@Injectable()
export class NotificationService {
    constructor(private af: AngularFire, private authService: AuthService) {
    }

    public getAll(): Observable<NotificationModel[]> {
        return this.af.database.list(`/notifications/${this.authService.currentUser.$key}`, {
            query: {
                orderByChild: 'createdAt',
            },
        })
        .map(notifications => notifications.reverse());
    }

    public getAllOnce(): Observable<any> {
        return this.af.database.list(`/notifications/${this.authService.currentUser.$key}`, {
            query: {
                orderByChild: 'createdAt',
            },
            preserveSnapshot: true 
        });
    }

    public markAllAsRead(): void {
        let sub = this.getAll().subscribe(notifications => {
            for (let notification of notifications) {
                if (!notification.isRead) {
                    this.markAsRead(notification.$key);
                }
            }

            sub.unsubscribe();
        });
    }

    private markAsRead(key: string): firebase.Promise<void> {
        return this.af.database.object(`/notifications/${this.authService.currentUser.$key}/${key}/isRead`).set(true);
    }

    public clearAll() : void{
        this.af.database.object(`/notifications/${this.authService.currentUser.$key}`).set(null)
    }

    public countUnread() {
        return this.getAll()
                .map(x => x.filter(x => !x.isRead))
                .map(x => x.length);
    }
}