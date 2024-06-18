import { getAccessToken } from '@/service/access-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const access_token = await getAccessToken();
    let nextUrl = 'https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02/albums?limit=50';

    const response = await fetch(nextUrl, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
    });

    const data = await response.json();

    return NextResponse.json(data);
}
