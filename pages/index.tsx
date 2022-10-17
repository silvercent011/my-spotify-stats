import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AlbumGrid } from "../components/AlbumGrid";
import { Button } from "../components/Button";
import { HomePage } from "../components/HomePage";

import style from "../styles/Page.module.scss";
import { SideBar } from "../components/SideBar";
import { TopTracks } from "../components/TopTracks";

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

  return session ? (
    <div className={style.page}>
      {/* <div>
        <img src={session.user?.image ?? ""} alt="user image" />y
        <h2>{session.user?.name}</h2>
      </div> */}
      <div className={style.section}>
        <AlbumGrid />
        <SideBar />
        <TopTracks />
      </div>
    </div>
  ) : (
    <HomePage />
  );
};

export default Home;
