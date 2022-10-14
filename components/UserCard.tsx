import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import UserCardStyle from "../styles/UserCard.module.scss";
import { Button } from "./Button";
export const UserCard = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (session) {
      fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
        .then((value) => value.json())
        .then((val) => setUserData(val));
    }
  }, [session]);
  return (
    session && (
      <div className={UserCardStyle.Card}>
        <div>
          <img
            className={UserCardStyle.Avatar}
            src={session.user?.image as string}
            alt=""
          />
        </div>
        <p>logado como:</p>
        <h1>{session.user?.name}</h1>
        <Button onClickFunc={() => signOut()}>Sair</Button>
      </div>
    )
  );
};
