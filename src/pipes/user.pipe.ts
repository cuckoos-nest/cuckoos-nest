import { UserModel } from './../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Pipe, PipeTransform } from "@angular/core";
import { UserService } from './../services/user.service';

@Pipe({
  name: 'user',
  pure: true
})
export class UserPipe implements PipeTransform {
    private cachedUid: string;
    private cachedUser: Observable<UserModel>;

    constructor(private userService: UserService) {
    }

    transform(value: string): Observable<UserModel> {
        if (value != this.cachedUid) {
            this.cachedUid = value;
            this.cachedUser = this.userService.get(value);
        }

        return this.cachedUser;
    }
}