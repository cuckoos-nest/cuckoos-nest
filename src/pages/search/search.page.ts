import { PhotoPage } from './../photo/photo.page';
import { UserPage } from './../user/user.page';
import { ImageViewerPage } from './../image-viewer/image-viewer.page';
import { UploadService } from './../../services/upload.service';
import { UserService } from './../../services/user.service';
import { CategoryService } from './../../services/category.service';
import { PhotoService } from './../../services/photo.service';
import { CategoryModel } from './../../models/category.model';
import { Observable } from 'rxjs/Observable';
import { PhotoModel } from './../../models/photo.model';
import { UserModel } from './../../models/user.model';
import { UploadModel } from './../../models/upload.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Subscription } from "rxjs/Subscription";

@IonicPage({
  name: 'search-page'
})
@Component({
  selector: 'search-page',
  templateUrl: 'search.html',
})
export class SearchPage {
  private searchType: string;
  private isLoaded: Boolean = true;
  private filteredUserUploads: Array<UploadModel>;
  private filteredMembers: Array<UserModel>;
  private filteredPhotos: Array<PhotoModel>
  private _searchQuery: string = '';
  private currentSubscription: Subscription;
  private categories: Observable<CategoryModel[]>;
  private selectedCategory: CategoryModel;
  private recentMemberSearches: Observable<UserModel[]>;

  set searchQuery(value: string) {
    this._searchQuery = value;
    this.performSearch(value);
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  constructor(private nav: NavController, private categoryService: CategoryService,
              private modalCtrl: ModalController, private userUploadsService: UploadService,
              private photoService: PhotoService, private userService: UserService) {
    this.categories = this.categoryService.getAll();
    this.recentMemberSearches = this.userService.getRecentSearches();
  }

  ionViewDidLoad(): void {
    this.searchType = 'photos';
    this.onSegmentChange();
  }

  private performSearch(query: string) {
    switch (this.searchType) {
      case 'uploads':
        if (query.length < 3) {
          this.unsubscribe();
          this.filteredUserUploads = null;
          return;
        }

        this.isLoaded = false;
        this.currentSubscription = this.userUploadsService.search(query)
          .subscribe(userUploads => {
            this.filteredUserUploads = userUploads;
            this.isLoaded = true;
          });
        break;

      case 'members':
        if (query.length == 0) {
          this.unsubscribe();
          this.filteredMembers = null;
          return;
        }

        this.isLoaded = false;
        this.currentSubscription = this.userService.search(query)
          .subscribe(users => {
            this.filteredMembers = users;
            this.isLoaded = true;
          });
        break;

      case 'photos':
        this.isLoaded = false;
        this.currentSubscription = this.photoService.search(query, this.selectedCategory ? this.selectedCategory.$key : null)
          .subscribe(photos => {
            this.filteredPhotos = photos;
            this.isLoaded = true;
          });
        break;
    }
  }

  private onSegmentChange() {
    this.searchQuery = '';
    this.performSearch(this.searchQuery);
  }

  private unsubscribe() {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
      this.currentSubscription = null;
    }
  }

  private goToUser(user: UserModel) {
    this.userService.addRecentSearch(user.$key);
    this.nav.push(UserPage, {
      user: user
    });
  }

  private goToPhoto(photo: PhotoModel) {
    this.nav.push(PhotoPage, {
      photo: photo
    });
  }

  private goToUpload(upload: UploadModel) {
    let fullScreenImageModal = this.modalCtrl.create(ImageViewerPage, {
      upload: upload
    });
    fullScreenImageModal.present();
  }

  private getPhotoTitle(photo: PhotoModel) {
    return photo.title;
  }

  private getPhotoImage(photo: PhotoModel) {
    return photo.image;
  }

  private selectCategory(category: CategoryModel) {
    if (this.selectedCategory && this.selectedCategory.$key == category.$key) {
      this.selectedCategory = null;
    }
    else {
      this.selectedCategory = category;
    }

    this.performSearch(this.searchQuery);
  }

}
