webpackJsonp([0],{

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_menu_page__ = __webpack_require__(417);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainMenuPageModule", function() { return MainMenuPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MainMenuPageModule = (function () {
    function MainMenuPageModule() {
    }
    return MainMenuPageModule;
}());
MainMenuPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__main_menu_page__["a" /* MainMenuPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__main_menu_page__["a" /* MainMenuPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__main_menu_page__["a" /* MainMenuPage */]
        ]
    })
], MainMenuPageModule);

//# sourceMappingURL=main-menu.page.module.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notifications_notifications_page__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_user_page__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search_page__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__categories_categories_page__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wall_wall_page__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_notification_service__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(11);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainMenuPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MainMenuPage = (function () {
    function MainMenuPage(notificationService) {
        this.notificationService = notificationService;
        this.wallTab = __WEBPACK_IMPORTED_MODULE_4__wall_wall_page__["a" /* WallPage */];
        this.searchTab = __WEBPACK_IMPORTED_MODULE_2__search_search_page__["a" /* SearchPage */];
        this.addTab = __WEBPACK_IMPORTED_MODULE_3__categories_categories_page__["a" /* CategoriesPage */];
        this.profileTab = __WEBPACK_IMPORTED_MODULE_1__user_user_page__["a" /* UserPage */];
        this.notificationsTab = __WEBPACK_IMPORTED_MODULE_0__notifications_notifications_page__["a" /* NotificationsPage */];
        this.newNotifications = this.notificationService.countUnread();
    }
    MainMenuPage.prototype.resetNotifications = function () {
        this.notificationService.markAllAsRead();
    };
    return MainMenuPage;
}());
MainMenuPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__angular_core__["K" /* Component */])({
        selector: 'main-menu-page',template:/*ion-inline-start:"C:\projets\cuckoosnest3\src\pages\main-menu\main-menu.html"*/'<ion-content>\n  <ion-tabs>\n    <ion-tab tabIcon="home" [root]="wallTab"></ion-tab>\n    <ion-tab tabIcon="search" [root]="searchTab"></ion-tab>\n    <ion-tab tabIcon="add" [root]="addTab"></ion-tab>\n    <ion-tab tabIcon="heart" [root]="notificationsTab" (ionSelect)="resetNotifications()" [tabBadge]="newNotifications | async"\n      tabBadgeStyle="danger"></ion-tab>\n    <ion-tab tabIcon="person" [root]="profileTab"></ion-tab>\n  </ion-tabs>\n</ion-content>'/*ion-inline-end:"C:\projets\cuckoosnest3\src\pages\main-menu\main-menu.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_notification_service__["a" /* NotificationService */]])
], MainMenuPage);

//# sourceMappingURL=main-menu.page.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map