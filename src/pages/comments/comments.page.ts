import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { UploadService } from './../../services/upload.service';
import { CommentService } from './../../services/comment.service';
import { CommentModel } from './../../models/comment.model';
import { UploadModel } from './../../models/upload.model';
import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
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

  @ViewChild('content') content: Content;

  constructor(private alertCtrl: AlertController, private viewCtrl: ViewController,
              private commentService: CommentService, private uploadService: UploadService,
              private userService: UserService, private authService: AuthService,
              private navParams: NavParams) {
    if (this.navParams.get('upload')) {
      this.userUpload = this.navParams.get('upload');
    }
  }

  ionViewDidLoad(): void {
    this.comments = this.commentService.getAll(this.userUpload.$key);
    this.isLoaded = !this.userUpload.commentsCount;
    this.comments.subscribe(() => {
      this.isLoaded = true;
      this.scrollToBottom(500);
    });
  }

  private send() {
    let comment: CommentModel = {
      user: this.authService.currentUser.$key,
      text: this.commentText,
      createdAt: new Date().toLocaleString(),
    };

    this.commentService.create(comment, this.userUpload.$key);
    this.scrollToBottom(500);

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

  private dismiss() {
    this.viewCtrl.dismiss();
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
