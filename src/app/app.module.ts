import { UserPipe } from './../pipes/user.pipe';
import { OrderByPipe } from './../pipes/order-by.pipe';
import { UsersPage } from './../pages/users/users.page';
import { WallPage } from './../pages/wall/wall.page';
import { WallItemComponent } from './../components/wall-item/wall-item.component';
import { SearchPage } from './../pages/search/search.page';
import { CategoriesPage } from './../pages/categories/categories.page';
import { CategoryPage } from './../pages/category/category.page';
import { GalleryComponent } from './../components/gallery/gallery.component';
import { NotificationsPage } from './../pages/notifications/notifications.page';
import { UserPage } from './../pages/user/user.page';
import { WebcamPage } from './../pages/webcam/webcam.page';
import { EditUploadPage } from './../pages/edit-upload/edit-upload.page';
import { PhotoPage } from './../pages/photo/photo.page';
import { CommentsPage } from './../pages/comments/comments.page';
import { WallItemPage } from './../pages/wall-item/wall-item.page';
import { Facebook } from '@ionic-native/facebook';
import { Http } from '@angular/http';
import { CommentService } from './../services/comment.service';
import { UploadService } from './../services/upload.service';
import { LikeService } from './../services/like.service';
import { NotificationService } from './../services/notification.service';
import { AuthService } from './../services/auth.service';
import { PhotoService } from './../services/photo.service';
import { CategoryService } from './../services/category.service';
import { UserService } from './../services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireModule } from "angularfire2";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import { ImageViewerPage } from '../pages/image-viewer/image-viewer.page';
import { Camera } from '@ionic-native/camera';

export const firebaseConfig = {
  apiKey: 'AIzaSyBz1z_mA1sZsQNYTh8RK8p76aE_gU-xcGc',
  authDomain: 'cuckoos-nest-7a4cf.firebaseapp.com',
  databaseURL: 'https://cuckoos-nest-7a4cf.firebaseio.com',
  storageBucket: 'cuckoos-nest-7a4cf.appspot.com',
  messagingSenderId: '374424090153'
};

@NgModule({
  declarations: [
    MyApp,
    WallPage,
    WallItemComponent,
    SearchPage,
    CategoriesPage,
    CategoryPage,
    GalleryComponent,
    UserPage,
    NotificationsPage,
    ImageViewerPage,
    EditUploadPage,
    PhotoPage,
    WebcamPage,
    CommentsPage,
    UsersPage,
    WallItemPage,

    UserPipe,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WallPage,
    WallItemComponent,
    SearchPage,
    CategoriesPage,
    CategoryPage,
    GalleryComponent,
    UserPage,
    NotificationsPage,
    ImageViewerPage,
    EditUploadPage,
    PhotoPage,
    WebcamPage,
    CommentsPage,
    UsersPage,
    WallItemPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    PhotoService,
    CategoryService,
    AuthService,
    NotificationService,
    UploadService,
    LikeService,
    CommentService,
    Facebook,
    Camera
  ]
})
export class AppModule { }
