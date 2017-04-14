import { BaseModel } from './base/base.model';

export class CategoryModel extends BaseModel {
     name : string;
     image: string;
     uploadsCount: number;
     followersCount: number;
}