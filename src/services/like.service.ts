import { CommentModel } from './../models/comment.model';
import { UploadLikeModel } from './../models/upload-likes.model';
import { Observer } from 'rxjs/Observer';
import { AuthService } from './auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { BaseService } from './base/base.service';
import { PhotoModel } from '../models/photo.model';
import { UserModel } from '../models/user.model';
import Config from '../config.json';
import { UserService } from './user.service';

@Injectable()
export class LikeService {
    constructor(private af: AngularFire, private authService: AuthService, private userService: UserService) {
    }

    public getAllByUpload(userUploadKey: string): Observable<UserModel[]> {
        return this.af.database.list(`/upload-likes/${userUploadKey}`)
                    .map(references => references.map(ref => ref.$key))
                    .map(keys => keys.map(key => this.userService.get(key)))
                    .map(users => users.reverse())
                    .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));

    }

    public getUids(userUploadKey: string): Observable<string[]> {
        return this.af.database.list(`/upload-likes/${userUploadKey}`)
            .map(references => references.map(ref => ref.$key));
    }

    public count(userUploadKey: string): Observable<string> {
        return this.af.database.object(`/uploads/${userUploadKey}/likesCount`);
    }

    public like(userUploadKey: string): void {
        this.af.database.object(`/upload-likes/${userUploadKey}/${this.authService.currentUser.$key}`).set(true);
    }

    public unlike(userUploadKey: string): void {
        this.af.database.object(`/upload-likes/${userUploadKey}/${this.authService.currentUser.$key}`).set(null);
    }
}