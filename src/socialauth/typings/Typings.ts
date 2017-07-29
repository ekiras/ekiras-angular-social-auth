import { Observable } from 'rxjs/Rx';
export interface BaseSocialService {
    login: (provider: string) => Observable<any>;
    logout: (provider: string) => Observable<any>;
    status: (provider: string) => Observable<any>;
};


export interface FacebookUserData {
    uid: string;
    email: string;
    gender: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    picture: {
        data: {
            isSilhouette: boolean;
            url: string;
        }
    };
    cover: {
        id: string;
        offsetX: number;
        offsetY: number;
        source: string;
    };

};
