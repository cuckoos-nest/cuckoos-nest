import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BaseService } from './base.service';
import { LoginResult } from '../../enums/login-result.enum';

@Injectable()
export abstract class BaseLoginService extends BaseService {
    public abstract login(): Observable<LoginResult>;
}