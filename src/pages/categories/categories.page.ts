import { CategoryService } from './../../services/category.service';
import { CategoryModel } from './../../models/category.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'categories-page',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  private filteredCategories: CategoryModel[];
  private categories: CategoryModel[];
  private _searchQuery: string = '';

  set searchQuery(value: string) {
    this._searchQuery = value;
    this.performSearch(value);
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  constructor(private nav: NavController, private categoryService: CategoryService,
              private loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "Loading categories..."
    });
    loader.present();

    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
      this.performSearch(this._searchQuery);
        loader.dismiss();
      });
  }

  private performSearch(query: string) {
    if (query && query.trim() != '') {
      this.filteredCategories =
        this.categories.filter(item => (item.name.toLowerCase().indexOf(query.toLowerCase()) > -1));
    }
    else {
      this.filteredCategories = this.categories;
    }
  }

  private goToCategory(selectedCategory: CategoryModel): void {
    this.nav.push('CategoryPage', {
      category: selectedCategory
    });
  }

}
