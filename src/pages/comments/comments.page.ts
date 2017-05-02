import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { UploadService } from './../../services/upload.service';
import { CommentService } from './../../services/comment.service';
import { CommentModel } from './../../models/comment.model';
import { UploadModel } from './../../models/upload.model';
import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
import {Injectable, Pipe} from 'angular2/core';
import { IonicPage, NavController, NavParams, Content, AlertController, ViewController } from 'ionic-angular';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'comments-page',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  private comments: Observable<CommentModel[]>;
  private userUpload: UploadModel;
  private commentText: string;
  private isLoaded: Boolean;
  private isMostLikedOrdered: Boolean;
  private filterBy: string;
  private commentsCount: number;

  @ViewChild('content') private content: Content;

  constructor(private alertCtrl: AlertController, private viewCtrl: ViewController,
              private commentService: CommentService, private uploadService: UploadService,
              private userService: UserService, private authService: AuthService,
              private navParams: NavParams) {

    this.filterBy = "!createdAt";
    if (this.navParams.get('upload')) {
      this.userUpload = this.navParams.get('upload');
    }

    this.isMostLikedOrdered = false;
  }

  ionViewDidLoad(): void {
    this.comments = this.commentService.getAll(this.userUpload.$key);
    this.isLoaded = !this.userUpload.commentsCount;
    this.comments.subscribe(  t => {
      this.isLoaded = true;
      this.commentsCount = t.length;
 //     this.scrollToBottom(500);

    });

    
  }

  ionViewDidEnter() {
   // this.scrollToBottom(500);
  }

  private send() {
    let comment: CommentModel = {
      user: this.authService.currentUser.$key,
      text: this.commentText,
      createdAt: new Date().toLocaleString(),
      likesCount: 0
    };

    this.commentService.create(comment, this.userUpload.$key);
    //.then(() => this.scrollToBottom(500));

    this.commentText = "";
  }

  private scrollToBottom(speed = 0, delay = 0) {
    setTimeout(() => {
      if (this.content._scroll) {
        this.content.scrollToBottom(speed);
      }
    }, delay);
  }

  private timeSince(dateTime: string) {
    return moment().from(dateTime, true) + " ago";
  }

  private isLiked(comment: CommentModel){
      let result ;
      this.commentService.isLiked(comment.$key).subscribe( x=> result = x);
      return result;
  }

  private likeComment(comment: CommentModel){
      this.commentService.likeComment(comment.$key);
  }

  private unlikeComment(comment: CommentModel){
      this.commentService.unlikeComment(comment.$key);
  }

  private dismiss() {
    this.viewCtrl.dismiss();
  }
 
  private orderByLiked(){
    this.filterBy = "!likesCount";
    this.isMostLikedOrdered = true;
  }
   
  private orderByDate(){
    this.filterBy = "!createdAt";
    this.isMostLikedOrdered = false;
  }

  public onHold(comment: CommentModel) {
    if (this.authService.currentUser.$key == this.userUpload.user ||
      comment.user == this.authService.currentUser.$key) {
      this.removeComment(comment);
    }
  }

  private removeComment(comment: CommentModel) {
    let confirm = this.alertCtrl.create({
      title: 'Delete comment?',
      message: 'Are you sure that you want to remove this comment?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'OK',
          handler: () => {
            this.commentService.remove(this.userUpload.$key, comment.$key);
          }
        }]
    });

    confirm.present();
  }

}
