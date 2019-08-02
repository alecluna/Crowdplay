## How to spin up project?

First, clone the `Oauth-bridge-spotify-Repo` https://github.com/alecluna/Oauth-bridge-template-Spotify 

Export `.env` vars for `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` for the Oauth-bridge project

Export `.env` vars on the client `REACT_APP_API_KEY`, `REACT_APP_MESSAGE_ID`, and `REACT_APP_STORAGE_BUCKET`

Next add the dependencies using `npm install`, start the project using `npm start` or `yarn start`
On both the server and client.

The server redirects to `http://localhost:3000` so we only need the express server to make the initial api call for the `access_token`

## Note
The access_token typically expires in an hour so if you leave the express server running simply re-run it.
