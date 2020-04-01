// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '19c7jtbtq0'
export const apiEndpoint = `https://${apiId}.execute-api.eu-central-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-1xygq6tz.eu.auth0.com',            // Auth0 domain
  clientId: 'yR9J4aPxHlcCgqxTRRy3oWrgKAlq8PaU',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
