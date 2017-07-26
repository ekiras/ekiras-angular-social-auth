import { Observable } from 'rxjs/Rx';
import { FacebookService } from './FacebookService';
import { Injectable, Optional } from '@angular/core';
import { BaseSocialService, FacebookUserData } from '../typings/Typings';

@Injectable()
export class SocialAuthService implements BaseSocialService {

    constructor(
        @Optional() private facebookService?: FacebookService
    ) {

    }


    public login(provider: string): Observable<FacebookUserData | any> {
        switch (provider) {
            case 'facebook':
                return this.facebookService.login();
        }
    }

    public logout(provider: string): boolean {
        switch (provider) {

        }
        return null;
    }

    public status(provider: string): Observable<any> {
        switch (provider) {
            case 'facebook':
                return this.facebookService.status();
        }
    }
}
