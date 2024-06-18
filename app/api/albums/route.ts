// import { getAccessToken } from '@/service/access-token';
import { getAccessToken } from '@/service/access-token';
import { NextRequest, NextResponse } from 'next/server';


async function fetchAllAlbums(access_token: string | null) {
    let albums: any[] = [];
    let nextUrl = 'https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02/albums?limit=20';

    const response = await fetch(nextUrl, {
        headers: {
            'Authorization': `Bearer ${access_token}` ,
        },
    });

    const data = await response.json();
    albums = albums.concat(data.items);
    nextUrl = data.next;

    return albums;
}


export async function GET(req: NextRequest, res: NextResponse) {
    const {access_token} = await getAccessToken();

    const albums = await fetchAllAlbums(access_token);

    return NextResponse.json({ items: albums });
}
