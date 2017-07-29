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

    /**
     * This method will return the user profile data if user is logged in or else will propmt user for login.
     * @param provider
     */
    public login(provider: string): Observable<FacebookUserData | any> {
        switch (provider) {
            case 'facebook':
                return this.facebookService.login();
        }
    }

    /**
     * This method will signout the user from the provided social provider
     * @param provider
     */
    public logout(provider: string): Observable<any> {
        switch (provider) {
            case 'facebook':
                return this.facebookService.logout();
        }
        return null;
    }

    /**
     * This method will return if the user is logged in by the given provider.
     * @param provider
     */
    public status(provider: string): Observable<boolean> {
        switch (provider) {
            case 'facebook':
                return this.facebookService.status();
        }
    }
}
