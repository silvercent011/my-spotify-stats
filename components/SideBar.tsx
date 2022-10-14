import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import UserCardStyle from "../styles/UserCard.module.scss";
import { Button } from "./Button";
export const SideBar = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (session) {
      fetch("https://api.spotify.com/v1/me", {
        // @ts-ignore
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
        .then((value) => value.json())
        .then((val) => setUserData(val));
    }
  }, [session]);
  return (
    session && (
      <div className={UserCardStyle.SideContainer}>
        <div className={UserCardStyle.Side}>
          <div className={UserCardStyle.UserInfo}>
            <div>
              <img
                className={UserCardStyle.Avatar}
                src={session.user?.image as string}
                alt=""
              />
            </div>
            <div>
              <p>logado como:</p>
              <h1>{session.user?.name}</h1>
            </div>
          </div>
          <Button onClickFunc={() => signOut()}>Sair</Button>
        </div>
      </div>
    )
  );
};
