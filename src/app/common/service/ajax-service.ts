import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { empty } from 'rxjs';
import { Store } from '@ngrx/store';


@Injectable()
export class AjaxService {

    public static JSON_HEADER = new Headers({
        "Content-Type": "application/json"
    });
    public static FORM_HEADER = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });
    public static HOST = "http://localhost:8080";
    public static PATH = "/api";
    public static CONTEXT_PATH = AjaxService.HOST + AjaxService.PATH;
    public static CONTEXT_PATH_LOGOUT = AjaxService.HOST + "/logout";
    public static isDebug = true;

    private httpOptions: any;
    constructor(
        private httpClient: HttpClient,
        private store: Store<any>
    ) {
    }

    private getToken() {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        };
    }

    doPost(url: string, body: any) {

        this.getToken();

        if (AjaxService.isDebug) {
            console.log("URL : ", AjaxService.CONTEXT_PATH + url);
            console.log("Params : ", body);
        }
        return this.httpClient.post(AjaxService.CONTEXT_PATH + url, body, this.httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(this.doHandleError)
        );
    }
    doGet(url: string) {

        this.getToken();

        if (AjaxService.isDebug) {
            console.log("URL : ", AjaxService.CONTEXT_PATH + url);
        }
        return this.httpClient.get(AjaxService.CONTEXT_PATH + url, this.httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(this.doHandleError)
        );

    }

    doPut(url: string, body: any) {

        this.getToken();

        if (AjaxService.isDebug) {
            console.log("URL : ", AjaxService.CONTEXT_PATH + url);
            console.log("Params : ", body);
        }
        return this.httpClient.put(AjaxService.CONTEXT_PATH + url, body).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(this.doHandleError)
        );
    }

    doDelete(url: string) {

        this.getToken();

        if (AjaxService.isDebug) {
            console.log("URL : ", AjaxService.CONTEXT_PATH + url);
        }
        return this.httpClient.delete(AjaxService.CONTEXT_PATH + url).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(this.doHandleError)
        );
    }

    private doHandleError(err) {
        console.log('err: ', err)
        if (err.status == 401) {
            if (AjaxService.isDebug) {
                console.error("Error 401 ", err);
                // window.location.reload();
                window.location.href="/#/login"
                
            }
        } else if (err.status == 415) {
            if (AjaxService.isDebug) {
                console.error("Error 415 Method not allow (GET, POST, PUT, DELETE)", err);
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