export interface BaseSocialService {
    login: (provider: string) => any;
    logout: (provider: string) => boolean;
    status: (provider: string) => any;
};


export interface FacebookUserData {
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
