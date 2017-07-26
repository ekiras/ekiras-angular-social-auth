/**
 * This interface SocialAuthConfig will be accepted by the {EkirasSocialAuthModule} to configure the social providers.
 */
export interface SocialAuthConfig {
    /**
     * Facebook configuration details
     */
    facebook?: FacebookAuthConfig;
    /**
     * Linkedin configuration details
     */
    linkedin?: LinkedinAuthConfig;
    /**
     * Google configuration details
     */
    google?: GoogleAuthConfig;
    /**
     * Instagram configuration details
     */
    instagram?: InstagramAuthConfig;
};

/**
 * Configuration for Facebook
 */
export interface FacebookAuthConfig {
    /**
     * Facebook app id
     * This field is mandatory and should be provided.
     */
    appId: string;
    /**
     * Set the options required for facebook authentication
     */
    options?: {
        /**
         * Provide the comma separated scopes or pemissions for which the data will be fetched
         * See the following url https://developers.facebook.com/docs/facebook-login/permissions for full set of permissions.
         *
         * Defaulr value is public_profile
         */
        scope?: string,
        /**
         * When true, the granted scopes will be returned in a comma-separated list in the grantedScopes field of the authResponse.
         * Default value is false
         */
        returnScopes?: boolean
    };
    /**
     * Facebook app version. Use graph api version 2.8
     * default value is v2.8
     */
    version?: string;
    /**
     * If the facebook sdk should be loaded asynchronously
     * Default value is true
     */
    async?: boolean;
    /**
     * enable cookies to allow the server to access the session
     */
    cookie?: boolean;
    /**
     * parse social plugins on this page
     */
    xfbml?: boolean;
};

export interface LinkedinAuthConfig {

};

export interface GoogleAuthConfig {

};

export interface InstagramAuthConfig {

};
