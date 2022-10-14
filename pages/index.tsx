import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AlbumGrid } from "../components/AlbumGrid";
import { Button } from "../components/Button";
import { HomePage } from "../components/HomePage";

import style from "../styles/Page.module.scss";
import { SideBar } from "../components/SideBar";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const [userArtists, setUserArtists] = useState<any>(null);
  useEffect(() => {
    if (session) {
      fetch("https://api.spotify.com/v1/me/top/artists", {
        // @ts-ignore
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      })
        .then((value) => value.json())
        .then((val) => setUserArtists(val));
    }
  }, [session]);

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

  return session ? (
    <div className={style.page}>
      {/* <div>
        <img src={session.user?.image ?? ""} alt="user image" />
        <h2>{session.user?.name}</h2>
      </div> */}
      <div className={style.section}>
        <AlbumGrid />
        <SideBar />
        {userTopTracks && (
          <div>
            <h1>Top Músicas</h1>
            {userTopTracks.items.map((track: any) => {
              return (
                <div key={track.id}>
                  <img src={track.album.images[2].url} alt="" />
                  <h3>{track.name}</h3>
                  <p>{track.artists.map((artist: any) => artist.name).join(",")}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  ) : (
    <HomePage />
  );
};

export default Home;
