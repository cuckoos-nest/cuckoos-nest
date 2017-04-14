import { CommentModel } from './../models/comment.model';
import { UploadModel } from './../models/upload.model';
import { Observer } from 'rxjs/Observer';
import { AuthService } from './auth.service';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { BaseService } from './base/base.service';
import { PhotoModel } from '../models/photo.model';

import Config from '../config.json';

@Injectable()
export class UploadService {

    constructor(private af: AngularFire, private authService: AuthService, @Inject(FirebaseApp) private firebaseApp: any) {
    }

    public get(key: string): Observable<UploadModel> {
        return this.af.database.object("/uploads/" + key);
    }

    public getAllByPhoto(photoKey: string): Observable<UploadModel[]> {
        return this.af.database.list(`/photos/${photoKey}/uploads/`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.get(key)))
            .map(userUploads => userUploads.reverse())
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public getAllByUser(uid: string): Observable<UploadModel[]> {
        return this.af.database.list(`/users/${uid}/uploads/`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.get(key)))
            .map(userUploads => userUploads.reverse())
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public getWall(): Observable<UploadModel[]> {
        return this.af.database.list(`/walls/${this.authService.currentUser.$key}`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.get(key)))
            .map(userUploads => userUploads.filter(x => x))
            .map(userUploads => userUploads.reverse())
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public create(upload: UploadModel): void {
        let ref = this.firebaseApp.storage().ref(`/images/uploads/${upload.user}/${upload.photo}/${new Date().toISOString()}`);
        ref
            .putString(upload.image, 'data_url')
            .then(() => {
                ref.getDownloadURL().then(url => {
                    upload.image = url;
                    this.af.database.list("/uploads").push(upload);
                });
            });
    }

    public remove(userUploadKey: string): void {
        this.af.database.object(`/uploads/${userUploadKey}`).set(null);
    }

    public hide(userUploadKey: string): void {
        this.af.database.object(`/walls/${this.authService.currentUser.$key}/${userUploadKey}`).set(null);
    }

    public search(searchQuery: string): Observable<UploadModel[]> {
        return this.af.database.list(`/upload-descriptions/${searchQuery.substring(0, 3)}`)
            .map(references => references.filter(ref => ref.$value.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1))
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.get(key)))
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }
}