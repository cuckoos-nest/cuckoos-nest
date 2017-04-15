import { AuthService } from './../../services/auth.service';
import { UploadService } from './../../services/upload.service';
import { UserService } from './../../services/user.service';
import { UploadModel } from './../../models/upload.model';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './../../models/user.model';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ToastController, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'user-page',
    templateUrl: 'user.html',
})
export class UserPage {
    private user: UserModel;
    private isMyProfile: Boolean;
    private uploads: Observable<UploadModel[]>;
    private isFollowedByMe: Boolean;
    private isLoaded: Boolean;
    private followers: Observable<UserModel[]>;
    private following: Observable<UserModel[]>;

    @ViewChild('content') content: Content;
    @ViewChild('uploadsRef') uploadsRef: ElementRef;

    constructor(private navController: NavController, private modalCtrl: ModalController,
                private navParams: NavParams, private authService: AuthService,
                private userService: UserService, private userUploadsService: UploadService,
                private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
        if (this.navParams.get('user')) {
            this.user = this.navParams.get('user');
        }
        else {
            this.user = this.authService.currentUser;
        }
    }

    ionViewDidLoad(): void {
        this.uploads = this.userUploadsService.getAllByUser(this.user.$key);
        this.uploads.subscribe(() => this.isLoaded = true);

        this.isMyProfile = (this.user.$key == this.authService.currentUser.$key);

        this.followers = this.userService.getFollowers(this.user.$key);
        this.following = this.userService.getFollowing(this.user.$key);
        
        if (!this.isMyProfile) {
            this.userService.isFollowingUser(this.user.$key).subscribe(isFollowing => this.isFollowedByMe = isFollowing);
        }
    }

    private getUploadImage(upload: UploadModel): string {
        return upload.image;
    }

    private uploadClicked(upload: UploadModel) {
        let fullScreenImageModal = this.modalCtrl.create('ImageViewerPage', {
            upload: upload
        });
        fullScreenImageModal.present();
    }

    private follow() {
        if (!this.isFollowedByMe) {
            this.userService.follow(this.user.$key)
                .then(() => {
                    let toast = this.toastCtrl.create({
                        message: `You're now following ${this.user.displayName}!`,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                });
        }
        else {
            this.userService.unfollow(this.user.$key);
        }
    }

    private showFollowing() {
        let usersModal = this.modalCtrl.create('UsersPage', {
            title: 'Following',
            users: this.following
        });

        usersModal.present();
    }

    private showFollowers() {
        let usersModal = this.modalCtrl.create('UsersPage', {
            title: 'Followers',
            users: this.followers,
        });

        usersModal.present();
    }

    private showUploads() {
        let yOffset = this.uploadsRef.nativeElement.offsetTop;
        this.content.scrollTo(0, yOffset, 1000)
    }

}
