import { CommentModel } from './../models/comment.model';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class CommentService {
    constructor(private af: AngularFire) {
    }

    public get(commentKey: string): Observable<CommentModel> {
        return this.af.database.object("/comments/" + commentKey);
    }

    public getAll(userUploadKey: string): Observable<CommentModel[]> {
        return this.af.database.list(`/upload-comments/${userUploadKey}/`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.get(key)))
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public remove(uploadKey: string, commentKey: string) {
         this.af.database.object(`/upload-comments/${uploadKey}/${commentKey}`).set(null);
    }

    public create(comment: CommentModel, userUploadKey: string): firebase.Promise<void> {
        let commentKey = this.af.database.list(`/comments`).push(comment).key;
        return this.af.database.object(`/upload-comments/${userUploadKey}/${commentKey}`).set(true);
    }

    public count(userUploadKey: string): Observable<number> {
        return this.af.database.object(`/uploads/${userUploadKey}/commentsCount`).map(x => x.$exists() ? x.$value : 0);
    }
}