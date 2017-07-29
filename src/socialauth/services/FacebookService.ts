import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { FacebookUserData } from '../typings/Typings';
import { SocialAuthConfig } from '../config/SocialAuthConfig';

declare let FB: any;

@Injectable()
export class FacebookService {

    private connectedStatus = 'connected';
    private meApi = '/me?fields=gender,first_name,last_name,email, picture,cover,id';

    constructor(private config: SocialAuthConfig) {

    }

    public login(): Observable<FacebookUserData> {
        return Observable.create((observer: Observer<FacebookUserData>) => {
            FB.getLoginStatus((authRes) => {
                if (authRes.status === this.connectedStatus) {
                    FB.api(this.meApi, (userRes: any) => {
                        if (!userRes || userRes.error) {
                            observer.error(userRes.error);
                        } else {
                            observer.next(this.parseUserResponse(userRes, authRes.authResponse.accessToken));
                            observer.complete();
                        }
                    });
                } else {
                    FB.login((res: any) => {
                        if (res.status === this.connectedStatus) {
                            FB.api(this.meApi, (userRes: any) => {
                                if (!userRes || userRes.error) {
                                    observer.error(userRes.error);
                                } else {
                                    observer.next(this.parseUserResponse(userRes, res.authResponse.accessToken));
                                    observer.complete();
                                }
                            });
                        }
                    }, {
                            scope: (this.config.facebook.options && this.config.facebook.options.scope)
                                ? this.config.facebook.options.scope
                                : 'public_profile',
                            return_scopes: (this.config.facebook.options && this.config.facebook.options.returnScopes)
                                ? this.config.facebook.options.returnScopes
                                : false
                        });
                }
            });
        });
    }

    public logout(): Observable<any> {
        return Observable.create((observer: Observer<Object>) => {
            FB.logout(function (res: any) {
                observer.next(true);
                observer.complete();
            });
        });
    }

    public status(): Observable<boolean> {
        return Observable.create((observer: Observer<Object>) => {
            FB.getLoginStatus((res) => {
                if (res.status === this.connectedStatus) {
                    observer.next(true);
                } else {
                    observer.next(false);
                }
                observer.complete();
            });
        });
    }

    private parseUserResponse(userRes, accessToken): FacebookUserData {
        return {
            email: userRes.email,
            firstName: userRes.first_name,
            lastName: userRes.last_name,
            gender: userRes.gender,
            picture: {
                data: {
                    isSilhouette: userRes.picture.data.is_silhouette,
                    url: userRes.picture.data.url
                }
            },
            cover: {
                id: userRes.cover.id,
                offsetX: userRes.cover.offset_x,
                offsetY: userRes.cover.offset_y,
                source: userRes.cover.source
            },
            accessToken: accessToken
        };
    }
}
