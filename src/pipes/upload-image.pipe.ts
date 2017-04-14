import { Observable } from 'rxjs/Observable';
import { UserService } from './../services/user.service';
import { UserModel } from './../models/user.model';
import { Pipe, PipeTransform } from "@angular/core";
import { UploadService } from '../services/upload.service';

@Pipe({
  name: 'uploadImage',
  pure: true
})
export class UploadImagePipe implements PipeTransform {
    private cachedKey: string;
    private cachedImage: Promise<string>;

    constructor(private uploadService: UploadService) {
    }

    transform(value: string, size: string): Promise<string> {
        if (value != this.cachedKey) { 
            this.cachedKey = value;
            //this.cachedImage = this.uploadService.getImage(value, size);
        }

        return this.cachedImage;
    }
}