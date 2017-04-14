import { BaseModel } from './base/base.model';

export class UserModel extends BaseModel {
     displayName: string;
     followingPhotoCount: number;
     followingUsersCount: number;
     followersCount: number;
     uploadsCount: number;
     image: string;
}