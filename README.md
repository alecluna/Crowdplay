## How to spin up project?

First, clone the `Oauth-bridge-spotify-Repo` https://github.com/alecluna/Oauth-bridge-template-Spotify and clone this project as well.

Export your `.env` vars for `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` for the Oauth-bridge project (we dont need these vars on the client side).

Next add the dependencies using `npm install`, start the project using `npm start` :)
On the server side.

The server redirects to `http://localhost:3000` so we only need the express server to the initial api call for the `access_token`

## Note

The access_token typically expires in an hour so if you leave the express server running simply re-run it.
