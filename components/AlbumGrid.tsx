/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Track } from "../interfaces/Track";
import AlbumGridStyles from "../styles/AlbumGrid.module.scss";

export const AlbumGrid = () => {
  const { data: session } = useSession();

  const [userTracks, setUserTracks] = useState<any>(null);
  useEffect(() => {
    if (session) {
      fetch(
        "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
        {
          // @ts-ignore
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      )
        .then((value) => value.json())
        .then((val) => setUserTracks(val));
    }
  }, [session]);

  return (
    userTracks &&
    session && (
      <div className={AlbumGridStyles.AlbumGrid}>
        {userTracks.items.map((track: Track) => {
          return <img key={track.id} src={track.album.images[1].url} alt="" />;
        })}
      </div>
    )
  );
};
