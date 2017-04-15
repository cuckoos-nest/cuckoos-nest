import { AngularFireModule } from 'angularfire2';
import { UserService } from './user.service';
import { UploadService } from './upload.service';
import { LikeService } from './like.service';
import { CommentService } from './comment.service';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CategoryService } from './category.service';
import { NotificationService } from './notification.service';
import { PhotoService } from './photo.service';
import { TranslateService } from 'ng2-translate';

export const firebaseConfig = {
  apiKey: 'AIzaSyBz1z_mA1sZsQNYTh8RK8p76aE_gU-xcGc',
  authDomain: 'cuckoos-nest-7a4cf.firebaseapp.com',
  databaseURL: 'https://cuckoos-nest-7a4cf.firebaseio.com',
  storageBucket: 'cuckoos-nest-7a4cf.appspot.com',
  messagingSenderId: '374424090153'
};

@NgModule({
    declarations: [
    ],
    imports: [
        AngularFireModule.initializeApp(firebaseConfig),
    ],
    providers: [
        AuthService,
        CategoryService,
        CommentService,
        LikeService,
        NotificationService,
        PhotoService,
        UploadService,
        UserService,
    ],
    exports: [
    ]
})
export class ServicesModule { }
