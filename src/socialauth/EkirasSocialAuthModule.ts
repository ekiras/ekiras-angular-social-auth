import { FacebookService } from './services/FacebookService';
import { SocialAuthService } from './services/SocialAuthService';
import { SocialAuthConfig } from './config/SocialAuthConfig';
import { ModuleWithProviders, NgModule } from '@angular/core';

declare let FB: any;

export function configureSocialAuthService(config: SocialAuthConfig, fbService: FacebookService) {
    const service = new SocialAuthService(fbService);
    return service;
}

export function configureFacebookService(config: SocialAuthConfig): object {
    if (config.facebook) {
        let d = document;
        let fbJs: any;
        let id = 'facebook-jssdk';
        let ref: any = d.getElementsByTagName('script')[0];

        fbJs = d.createElement('script');
        fbJs.id = id;
        fbJs.async = setProperty(config.facebook.async, true);
        fbJs.src = '//connect.facebook.net/en_US/sdk.js';

        fbJs.onload = function () {
            FB.init({
                appId: config.facebook.appId,
                cookie: setProperty(config.facebook.cookie, true),
                xfbml: setProperty(config.facebook.xfbml, true),
                version: setProperty(config.facebook.version, 'v2.8')
            });
        };

        ref.parentNode.insertBefore(fbJs, ref);
        const service = new FacebookService(config);
        return service;
    } else {
        return null;
    }
}

export function setProperty(prop, defaultValue) {
    if (prop) {
        return prop;
    } else {
        return defaultValue;
    }
}

export function configureGoogleService(config: SocialAuthConfig) {
    return null;
}



@NgModule({
    imports: [],
    exports: [],
    providers: [],
})
/**
 * Social Auth Module.
 *
 * You can import this module in your main module with the configuration to provide social login with different providers.
 *
 */
export class EkirasSocialAuthModule {

    /**
     * This method will configure the module to provide authentication from the provided social auth providers.
     * @param config
     */
    static forRoot(config: SocialAuthConfig): ModuleWithProviders {
        return {
            ngModule: EkirasSocialAuthModule,
            providers: [
                {
                    provide: 'SocialAuthConfig',
                    useValue: config
                },
                {
                    provide: FacebookService,
                    useFactory: configureFacebookService,
                    deps: ['SocialAuthConfig']
                },
                {
                    provide: SocialAuthService,
                    useFactory: configureSocialAuthService,
                    deps: ['SocialAuthConfig', FacebookService]

                }
            ]
        };
    }

    constructor(private socialAuthService: SocialAuthService) {
    }
}

