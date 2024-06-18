'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Card, CardFooter, CardBody } from '@nextui-org/react';
import Image from 'next/image';

interface Track {
    id: string;
    name: string;
    duration_ms: number;
}

interface AlbumDetails {
    id: string;
    name: string;
    images: { url: string }[];
    release_date: string;
    genres: string[];
    total_duration_ms: number;
    tracks: { items: Track[] };
}

function formatDuration(duration_ms: number): string {
    const totalSeconds = Math.floor(duration_ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function calculateAlbumDuration(album: AlbumDetails): string {
    const totalDurationMs = album.tracks.items.reduce((acc, track) => acc + track.duration_ms, 0);
    return formatDuration(totalDurationMs);
}

const AlbumDetailsPage = () => {
    const pathname = usePathname();
    const albumId = pathname.split('/').pop();
    const [album, setAlbum] = useState<AlbumDetails | null>(null);

    useEffect(() => {
        if (albumId) {
            const fetchAlbumDetails = async () => {
                const response = await fetch(`/api/${albumId}`);
                const data = await response.json();
                setAlbum(data);
            };

            fetchAlbumDetails();

        }
    }, [albumId]);

    return (

        <>
            {album ? (
                <div className="container font-inter mx-auto px-4 flex flex-col mt-24">
                    <div className='flex w-full gap-20'>
                        <Card className='bg-black/60 p-8 h-fit' radius='lg'>
                            <CardBody>
                                <Image src={album.images[0].url} alt={album.name} className="rounded-none" width={360} height={360} />

                            </CardBody>
                        </Card>

                        <div className='flex flex-col w-full'>
                            <div className='flex justify-between w-full'>
                                <div className='flex flex-col font-dancing gap-4'>
                                    <h2 className='text-6xl'>Taylor Swift</h2>
                                    <p className='text-2xl'>{album.name}</p>
                                </div>

                                <div className='flex gap-4'>
                                    <div className="custom-shape font-extrabold text-[10px] flex justify-center items-center text-center">{album.release_date}</div>
                                    <div className="custom-shape font-extrabold text-[10px] flex justify-center items-center text-center">{calculateAlbumDuration(album)}</div>
                                    <div className="custom-shape"></div>
                                </div>
                            </div>

                            <div>
                                <h2 className='text-2xl font-semibold mt-6'>Tracklist</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 space-x-5 ">
                                    <ul>
                                        {album.tracks.items.slice(0, Math.ceil(album.tracks.items.length / 2)).map((track, index) => (
                                            <li key={track.id} className="break-words rounded-full bg-[#A5C9A5] px-4 py-2 my-2">{index + 1}. {track.name}</li>
                                        ))}
                                    </ul>
                                    <ul>
                                        {album.tracks.items.slice(Math.ceil(album.tracks.items.length / 2)).map((track, index) => (
                                            <li key={track.id} className="break-words rounded-full bg-[#A5C9A5] px-4 py-2 my-2">{Math.ceil(album.tracks.items.length / 2) + index + 1}. {track.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-center text-5xl min-h-screen'>Loading...</div>
            )}
        </>

    );
};

export default AlbumDetailsPage;
