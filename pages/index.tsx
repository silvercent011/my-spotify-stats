import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AlbumGrid } from "../components/AlbumGrid";
import { Button } from "../components/Button";
import { HomePage } from "../components/HomePage";


import style from "../styles/Page.module.scss";
import { UserCard } from "../components/UserCard";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const [userArtists, setUserArtists] = useState<any>(null);
  useEffect(() => {
    if (session) {
      fetch("https://api.spotify.com/v1/me/top/artists", {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      })
        .then((value) => value.json())
        .then((val) => setUserArtists(val));
    }
  }, [session]);

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

  const [userSavedTracks, setUserSavedTracks] = useState<any>(null);
  useEffect(() => {
    if (session) {
      fetch(
        "https://api.spotify.com/v1/me/tracks",
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }
      )
        .then((value) => value.json())
        .then((val) => setUserSavedTracks(val));
    }
  }, [session]);

  return session ? (
    <div className={style.page}>
      {/* <div>
        <img src={session.user?.image ?? ""} alt="user image" />
        <h2>{session.user?.name}</h2>
      </div> */}
      {userTracks && <AlbumGrid albums={userTracks.items} />}
      <UserCard />
    </div>
  ) : (
    <HomePage />
  );
};

export default Home;
