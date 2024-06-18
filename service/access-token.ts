import querystring from 'querystring';

if (!process.env.SPOTIFY_CLIENT_ID) {
  throw new Error("Missing NEXT_SPOTIFY_CLIENT_ID");
}

if (!process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error("Missing SPOTIFY_CLIENT_SECRET");
}
const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;

export const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
  };
