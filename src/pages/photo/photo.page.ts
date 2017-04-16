import { PhotoService } from './../../services/photo.service';
import { UserService } from './../../services/user.service';
import { UploadService } from './../../services/upload.service';
import { AuthService } from './../../services/auth.service';
import { UploadModel } from './../../models/upload.model';
import { Observable } from 'rxjs/Observable';
import { PhotoModel } from './../../models/photo.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'photo-page',
  templateUrl: 'photo.html',
})
export class PhotoPage {
  private photo: PhotoModel;
  private userUploads: Observable<UploadModel[]>;
  private isLoaded: Boolean;
  private followPhoto: Boolean;
  private followersPhotoCount: number;

  constructor(private platform: Platform, private modalCtrl: ModalController,
              private authService: AuthService, private navController: NavController,
              private navParams: NavParams, private loader: LoadingController,
              private uploadService: UploadService, private photoService: PhotoService,
              private userService: UserService, private toastCtrl: ToastController,
              private camera: Camera) {
    this.photo = this.navParams.get('photo');
  }

  ionViewDidLoad(): void {
    this.userUploads = this.uploadService.getAllByPhoto(this.photo.$key);
    this.photoService.getFollowersCount(this.photo.$key).subscribe(count => this.followersPhotoCount = count);
    this.userUploads.subscribe(() => this.isLoaded = true);
    this.userService.isFollowingPhoto(this.photo.$key).subscribe(isFollow => this.followPhoto = isFollow);
  }

  private getPhotoImage(upload: UploadModel) {
    return upload.image;
  }

  private follow() {
    if (this.followPhoto) {
      this.photoService.unfollow(this.photo.$key).then(() => this.followPhoto = false);
    }
    else {
      this.photoService.follow(this.photo.$key).then(() => {
        this.followPhoto = true;
        let toast = this.toastCtrl.create({
          message: `You're now following ${this.photo.title}!`,
          position: 'top',
          duration: 3000
        });
        toast.present();
      });
    }
  }

  private takePhoto(item: string): void {
    if (this.platform.is("cordova")) {
      this.takePhotoFromNative();
    }
    else {
      this.takePhotoFromBroswer();
    }
  }

  private takePhotoFromBroswer() {
    this.navController.push('WebcamPage', {
      photo: this.photo
    });
  }

  private takePhotoFromNative() {
    this.camera.getPicture({
      destinationType: 0
    }).then((imageData) => {
      let base64Image = imageData;

      let upload: UploadModel = {
        photo: this.photo.$key,
        user: this.authService.currentUser.$key,
        image: 'data:image/jpeg;base64,' + base64Image,
        likesCount: 0,
        commentsCount: 0,
      };

      this.navController.push('EditUploadPage', {
        upload: upload
      });
    });
  }

  private uploadClicked(upload: UploadModel) {
    let fullScreenImageModal = this.modalCtrl.create('ImageViewerPage', {
      upload: upload
    });
    fullScreenImageModal.present();
  }

  private viewFollowers() {
    if (this.followersPhotoCount == 0) {
      return;
    }

    let usersModal = this.modalCtrl.create('UsersPage', {
      title: 'Likes',
      users: this.photoService.getFollowers(this.photo.$key)
    });

    usersModal.present();
  }

}
