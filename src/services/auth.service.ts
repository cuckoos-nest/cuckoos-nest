import { UserModel } from './../models/user.model';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { LoginResult } from '../enums/login-result.enum';

import { UserService } from './user.service';

import Config from '../config.json';
import { BaseService } from './base/base.service';

@Injectable()
export class AuthService {
    private _authState: FirebaseAuthState;

    public get authState(): FirebaseAuthState {
        return this._authState;
    }

    private _currentUser: UserModel;
    public get currentUser(): UserModel {
        return this._currentUser;
    }

    constructor(private auth$: AngularFireAuth, private af: AngularFire, 
                private platform: Platform, private fb: Facebook) {
    }

    public get authenticated(): boolean {
        return this._authState !== null;
    }

    public signInWithFacebook(): Observable<FirebaseAuthState> {
        return new Observable<FirebaseAuthState>((observer: Observer<FirebaseAuthState>) => {
            if (this.platform.is('cordova')) {
                this.fb.login(['email', 'public_profile']).then(res => {
                    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                    firebase.auth().signInWithCredential(facebookCredential);
                });
            } 
            else {
                this.auth$.login({
                    provider: AuthProviders.Facebook,
                    method: AuthMethods.Popup
                }).catch(x => {
                    console.log("error", x);
                    debugger;
                });
            }

            this.auth$.subscribe((state: FirebaseAuthState) => {
                this._authState = state;
                if (state) {
                    this.af.database.object("/users/" + state.uid).subscribe(user => {
                        this._currentUser = user;
                        observer.next(state);
                    });
                }
            });
        });
    }

    public signOut(): void {
        this.auth$.logout();
    }
}