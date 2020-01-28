const axios = require('axios')
const {
    AuthenticationService,
    JWTStrategy,
} = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const {
    expressOauth,
    OAuthStrategy,
} = require('@feathersjs/authentication-oauth')

class GoogleStrategy extends OAuthStrategy {
    async getEntityData(profile) {
        // this will set 'googleId'
        const baseData = await super.getEntityData(profile)

        // this will grab the picture and email address of the Google profile
        return {
            ...baseData,
            name: profile.name,
            profilePicture: profile.picture,
            email: profile.email,
            emailVerified: profile.email_verified,
        }
    }
}

class FacebookStrategy extends OAuthStrategy {
    async getProfile(authResult) {
        // This is the oAuth access token that can be used
        // for Facebook API requests as the Bearer token
        const accessToken = authResult.access_token

        const { data } = await axios.get('https://graph.facebook.com/me', {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            params: {
                fields: 'id,name,email,picture',
            },
        })
        return data
    }

    async getEntityData(profile) {
        // `profile` is the data returned by getProfile
        const baseData = await super.getEntityData(profile)

        return {
            ...baseData,
            email: profile.email,
            name: profile.name,
            profilePicture: profile.picture.data.url,
            facebookId: profile.id,
            emailVerified: true,
        }
    }
}

module.exports = app => {
    const authentication = new AuthenticationService(app)

    authentication.register('jwt', new JWTStrategy())
    authentication.register('local', new LocalStrategy())
    authentication.register('google', new GoogleStrategy())
    authentication.register('facebook', new FacebookStrategy())

    app.use('/authentication', authentication)
    app.configure(expressOauth())
}
