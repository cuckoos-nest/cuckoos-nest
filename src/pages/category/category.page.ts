import { PhotoModel } from './../../models/photo.model';
import { CategoryService } from './../../services/category.service';
import { PhotoService } from './../../services/photo.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { CategoryModel } from './../../models/category.model';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'category-page',
  templateUrl: 'category.html',
})
export class CategoryPage {
  private photos: Observable<PhotoModel[]>
  private category: CategoryModel;
  private isLoaded: Boolean;

  constructor(private authService: AuthService, private userService: UserService,
              private navController: NavController, private navParams: NavParams,
              private photoService: PhotoService, private categoryService: CategoryService,
              private loadingCtrl: LoadingController) {
    this.category = this.navParams.get('category');
  }

  ionViewDidLoad(): void {
    this.photos = this.photoService.getAllByCategory(this.category.$key);
    this.photos.subscribe(() => this.isLoaded = true);
  }

  private photoClicked(photo: PhotoModel) {
    this.navController.push('PhotoPage', {
      photo: photo
    });
  }

  private getPhotoTitle(photo: PhotoModel) {
    return photo.title;
  }

  private getPhotoImage(photo: PhotoModel) {
    return photo.image;
  }

}
