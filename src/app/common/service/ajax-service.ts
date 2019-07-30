import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { empty } from 'rxjs';
const host = "http://localhost:8080";
@Injectable()
export class AjaxService {

    public static JSON_HEADER = new Headers({
        "Content-Type": "application/json"
    });
    public static FORM_HEADER = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });
    public static CONTEXT_PATH = "/api";
    public static CONTEXT_PATH_LOGIN = "/login";
    public static CONTEXT_PATH_LOGOUT = "/logout";
    public static isDebug = true;

    constructor(
        private httpClient: HttpClient,
    ) { }

    doPost(url: string, body: any) {
        if (AjaxService.isDebug) {
            console.log("URL : ", host + AjaxService.CONTEXT_PATH + url);
            console.log("Params : ", body);
        }
        return this.httpClient.post(host + AjaxService.CONTEXT_PATH + url, body).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((err, caught) => {
                if (err.status == 401 && "security/user-profile" != url) {
                    window.location.reload();
                    if (AjaxService.isDebug) {
                        console.error("Redirect to LoginPage");
                    }
                } else {
                    // if ("security/user-profile" == url) {
                    //     this.router.navigate(["/login"]);
                    // }
                    if (err.status != 401) {
                        console.error("Message Error => ", err, caught);
                    }
                }
                return empty();
            })
        );
    }
    doGet(url: string) {
        if (AjaxService.isDebug) {
            console.log("URL : ", host + AjaxService.CONTEXT_PATH + url);
        }
        // return this.httpClient.get(host + AjaxService.CONTEXT_PATH + url).subscribe((data:any)=>{
        //     console.log('data', data);
        // },error=>{
        //     console.log('error', error);
        // })
        return this.httpClient.get(host + AjaxService.CONTEXT_PATH + url).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(this.doHandleError)
        );
    }

    doPut(url: string, body: any) {
        if (AjaxService.isDebug) {
            console.log("URL : ", host + AjaxService.CONTEXT_PATH + url);
            console.log("Params : ", body);
        }
        return this.httpClient.put(host + AjaxService.CONTEXT_PATH + url, body).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(this.doHandleError)
        );
    }

    doDelete(url: string) {
        if (AjaxService.isDebug) {
            console.log("URL : ", host + AjaxService.CONTEXT_PATH + url);
        }
        return this.httpClient.delete(host + AjaxService.CONTEXT_PATH + url).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(this.doHandleError)
        );
    }
    private doHandleError(err, caught) {
        console.log('err: ', err)
        if (err.status == 401) {
            // window.location.reload();
            if (AjaxService.isDebug) {
                console.error("Error 401 ", err);
            }
        } else if (err.status = 415) {
            if (AjaxService.isDebug) {
                console.error("Error 415 ", err);
            }
        } else if (err.status = 500) {
            if (AjaxService.isDebug) {
                console.error("Error 500 ", err);
            }
        } else {
            if (AjaxService.isDebug) {
                console.log('Error', AjaxService.isDebug)
                console.error("Message Error => ", caught);
            }
        }
        return empty();
    }
}