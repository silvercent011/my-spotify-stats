import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Track } from "../interfaces/Track";

import buttonStyle from "../styles/Button.module.scss";

import topTrackStyles from "../styles/TopTracks.module.scss";

const Track = ({ track }: { track: Track }) => {
  return (
    <div className={topTrackStyles.cardBody}>
      <div className={topTrackStyles.Image}>
        <Image
          className={topTrackStyles.Image}
          width={150}
          height={150}
          src={track.album.images[1].url}
          alt=""
        />
      </div>
      <div>
        <h3>{track.name}</h3>
        <p>{track.artists.map((artist: any) => artist.name).join(",")}</p>
        <Link href={track.external_urls.spotify}>
          <button className={buttonStyle.green_btn_small}>Ouvir no Spotify</button>
        </Link>
      </div>
    </div>
  );
};

export const TopTracks = () => {
  const { data: session } = useSession();

  const [userTopTracks, setUserTopTracks] = useState<any>(null);
  useEffect(() => {
    if (session) {
      fetch("https://api.spotify.com/v1/me/top/tracks", {
        // @ts-ignore
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      })
        .then((value) => value.json())
        .then((val) => setUserTopTracks(val));
    }
  }, [session]);

  return (
    userTopTracks &&
    session && (
      <div className={topTrackStyles.Container}>
        <h1 className={topTrackStyles.Heading}>Top Músicas</h1>
        <div className={topTrackStyles.Content}>
          {userTopTracks.items.map((track: Track) => {
            return <Track key={track.id} track={track} />;
          })}
        </div>
      </div>
    )
  );
};
