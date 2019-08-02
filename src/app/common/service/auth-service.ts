import { Injectable } from '@angular/core';
import { AjaxService } from './ajax-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StringUtils } from '../utils/string-utils';
import { UserProflie } from '../model/user-profile.model';
import { Store } from '@ngrx/store';
import * as USERACTION from '../../store/action/user.action'
import { ResponseData } from '../model/response-data.model';

const LOGIN_URL = "/authenticate";

@Injectable()
export class AuthService {

    userProfile: UserProflie;
    token: string;
    constructor(
        private httpClient: HttpClient,
        private ajax: AjaxService,
        private router: Router,
        private store: Store<any>
    ) { }

    login(userModel: UserLoginModel) {
        this.authenticate(userModel).subscribe(token => {
            this.router.navigate(['/dashboard'])
        })
    }

    authenticate(userModel: UserLoginModel) {
        return this.httpClient.post(AjaxService.HOST + LOGIN_URL, userModel).pipe(
            map((response: JwtReponseModel) => {
                localStorage.setItem('token', response.token);
                return response.token
            }),
            catchError(this.doHandleError)
        );
    }

    getUserProfile() {
        let token = localStorage.getItem('token');
        console.log('token', token)
        return this.ajax.doGet('/user/profile').subscribe((res:ResponseData<UserProflie>) => {
            console.log('getUserProfile : ', res)
           
            this.userProfile = {
                role: res.data.role,
                token: token,
                username: res.data.username,
            }
            this.store.dispatch(new USERACTION.AddUser(this.userProfile));
        })
    }


    logout(){
        console.log('logout...')
        localStorage.removeItem('token');
        this.getUserProfile();
    }

    private doHandleError(err) {
        console.log('err: ', err)
        if (err.status == 401) {
            if (AjaxService.isDebug) {
                console.error("Error 401 ", err);
            }
        } else if (err.status == 415) {
            if (AjaxService.isDebug) {
                console.error("Error 415 ", err);
            }
        } else if (err.status == 500) {
            if (AjaxService.isDebug) {
                console.error("Error 500 ", err);
            }
        } else {
            if (AjaxService.isDebug) {
                console.error("Message Error => ", err);
            }
        }
        return empty();
    }
}