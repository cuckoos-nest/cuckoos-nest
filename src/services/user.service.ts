import { AngularFire } from 'angularfire2';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class UserService {
    constructor(private af: AngularFire, private authService: AuthService) {
    }

    public get(uid: string): Observable<UserModel> {
        return this.af.database.object(`/users/${uid}`);
    }

    public getAll(): Observable<UserModel[]> {
        return this.af.database.list("/users");
    }

    public search(searchQuery: string): Observable<UserModel[]> {
        return this.af.database.list("/users")
            .map(users => users.filter(user => user.displayName.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1));
    }

    public follow(uid: string): firebase.Promise<any> {
        return this.af.database.object(`/user-followers/users-follow-me/${uid}/${this.authService.currentUser.$key}`).set(true)
            .then(() => this.af.database.object(`/user-followers/users-im-following/${this.authService.currentUser.$key}/${uid}`).set(true));
    }

    public unfollow(uid: string): void {
        this.af.database.object(`/user-followers/users-follow-me/${uid}/${this.authService.currentUser.$key}`).set(null);
        this.af.database.object(`/user-followers/users-im-following/${this.authService.currentUser.$key}/${uid}`).set(null);
    }

    public isFollowingCategory(categoryKey: string): Observable<Boolean> {
        return this.af.database.object(`/category-followers/user-to-categories/${this.authService.currentUser.$key}/${categoryKey}`).map(x => x.$exists());
    }

    public isFollowingUser(uid: string): Observable<Boolean> {
        return this.af.database.object(`/user-followers/users-im-following/${this.authService.currentUser.$key}/${uid}`).map(x => x.$exists());
    }

    public isFollowingPhoto(photoKey: string): Observable<Boolean> {
        return this.af.database.object(`/photo-followers/${photoKey}/${this.authService.currentUser.$key}`).map(x => x.$exists());
    }

    public getRecentSearches() {
        return this.af.database.list(`/recent-searches/${this.authService.currentUser.$key}/members/`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.get(key)))
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public addRecentSearch(uid: string): firebase.Promise<void> {
        return this.af.database.object(`/recent-searches/${this.authService.currentUser.$key}/members/${uid}`).set(true);
    }

    public getFollowers(uid: string) {
        return this.af.database.list(`/user-followers/users-follow-me/${uid}`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.get(key)))
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public getFollowing(uid: string) {
        return this.af.database.list(`/user-followers/users-im-following/${uid}`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.get(key)))
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }
}