import { BaseModel } from './base/base.model';

export class UploadModel extends BaseModel {
    description?: string;
    image: string;
    user: string;
    photo: string;
    likesCount: number;
    commentsCount: number;
    createdAt?: string;
}