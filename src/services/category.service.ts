import { Observer } from 'rxjs/Observer';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { PhotoModel } from '../models/photo.model';
import { CategoryModel } from '../models/category.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { BaseService } from './base/base.service';

import Config from '../config.json';

@Injectable()
export class CategoryService {

    constructor(private af: AngularFire, private authService: AuthService) {
    }

    public getAll(): FirebaseListObservable<CategoryModel[]> {
        var options = {
            query: {
                orderByChild: 'name'
            }
        };

        return this.af.database.list("/categories", options);
    }

    public get(key: string): FirebaseObjectObservable<CategoryModel> {
        return this.af.database.object("/categories/" + key);
    }

    public getAllByFollower(uid: string): Observable<CategoryModel> {
        return new Observable<CategoryModel>((observer: Observer<CategoryModel>) => {
            this.af.database.list(`/category-followers/user-to-categories/${uid}`).subscribe(categoryKeys => {
                for(let categoryKey of Object.keys(categoryKeys)) {
                    this.get(categoryKey).subscribe(category => observer.next(category));
                }
            });
        });
    }

    public follow(categoryKey: string): void {
        this.af.database.object(`/category-followers/category-to-users/${categoryKey}/${this.authService.currentUser.$key}`).set(true);
        this.af.database.object(`/category-followers/user-to-categories/${this.authService.currentUser.$key}/${categoryKey}`).set(true);
    }

    public unfollow(categoryKey: string): void {
        this.af.database.object(`/category-followers/category-to-users/${categoryKey}/${this.authService.currentUser.$key}`).set(null);
        this.af.database.object(`/category-followers/user-to-categories/${this.authService.currentUser.$key}/${categoryKey}`).set(null);
    }
}