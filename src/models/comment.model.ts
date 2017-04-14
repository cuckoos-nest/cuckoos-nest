import { BaseModel } from './base/base.model';
export class CommentModel extends BaseModel {
    user: string;
    text: string;
    createdAt: Date;
}