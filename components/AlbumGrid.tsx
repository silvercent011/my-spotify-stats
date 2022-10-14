import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import AlbumGridStyles from "../styles/AlbumGrid.module.scss";

export const AlbumGrid = () => {
  const { data: session } = useSession();

  const [userTracks, setUserTracks] = useState<any>(null);
  useEffect(() => {
    if (session) {
      fetch(
        "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      )
        .then((value) => value.json())
        .then((val) => setUserTracks(val));
    }
  }, [session]);

  return (
    userTracks && (
      <div className={AlbumGridStyles.AlbumGrid}>
        {userTracks.items.map((album) => {
          return <img key={album.key} src={album.album.images[1].url} />;
        })}
      </div>
    )
  );
};
