# ekiras-angular-social-auth

This Plugin will work with Angular version ^4.0.0. It provides three basic functionalities 
  1. Login
  2. Status
  3. Logout

## Installation

To install this library, run:

```bash
$ npm install ekiras-angular-social-auth --save
```

## Setup 

You need to include the **EkirasSocialAuthModule** in the main module of your project.

### Including Module in the main module of the Angular Project.

If you want to include the **EkirasSocialAuthModule** in the main module of the project, then you can do so as follows.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EkirasSocialAuthModule } from 'ekiras-angular-social-auth';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // inlcude EkirasSocialAuthModule in the main module
    EkirasSocialAuthModule.forRoot({
      facebook: {
        appId: '<app-id>',
        options: {
          scope: '<permissions>'
        }
      }
    })
  ]
})
export class AppModule {

}

```

### Including the Module in Shared Module of the Angular Project.

If you want to include the **EkirasSocialAuthModule** in a shared moduled, then you can include the module as follows

```typescript

import { NgModule } from '@angular/core';
import { EkirasSocialAuthModule } from 'ekiras-angular-social-auth';

@NgModule({
  declarations: [
  ],
  imports: [

    // inlcude EkirasSocialAuthModule in the main module
    EkirasSocialAuthModule.forRoot({
      facebook: {
        appId: '<app-id>',
        options: {
          scope: '<permissions>'
        }
      }
    })
  ],
  exports: [
    EkirasSocialAuthModule
  ]
})
export class SharedModule {

}
```

## Configuring the Module

You can configure the module with the following social provider's configurations.

### Facebook Configurations.

| Option | Description  | Default Value |
|--------| --------|---------------|
|appId | facebook app id| Mandatory (no default value)|
|version| facebook sdk version| 'v2.8' |
|async| If the facebook sdk should be loaded asynchronously| true|
|cookie|  Enable cookies to allow the server to access the session| true|
|xfbml| parse social plugins on this page | true|
|options 
   1. scope
   2. returnScopes | Provide the comma separated scopes or pemissions for which the data will be fetched | public_profile |
|options.returnScopes|the granted scopes will be returned in a comma-separated list in the grantedScopes| false|


## Including SocialAuthService.

**SocialAuthService** 

```typescript
import { Component } from '@angular/core';
import { SocialAuthService, FacebookUserData } from 'ekiras-angular-social-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: FacebookUserData;

  constructor(private socialAuthService: SocialAuthService) {

  }

  public login(provider: string) {
    this.socialAuthService.login(provider).subscribe((data: FacebookUserData) => {
       // {FacebookUserData} user data
    });
  }

  public status(provider: string) {
    this.socialAuthService.status(provider).subscribe((status: boolean) => {
      //  boolean status
    });
  }

  public logout(provider: string) {
    this.socialAuthService.logout(provider).subscribe((status: boolean) => {
      // boolean status
    });
  }

}

```

**app.component.html**

```html

<button (click)="login('facebook');">Fb Login</button>
<button (click)="status('facebook');">Fb Status</button>
<button (click)="logout('facebook');">Fb Logout</button>

```

## License

MIT © [Ekansh Rastogi](mailto:ekirastogi@gmail.com)
