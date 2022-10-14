import { signIn } from "next-auth/react";
import pageStyle from "../styles/Page.module.scss";
import headingStyle from '../styles/Heading.module.scss';
import { Button } from "./Button";

export const HomePage = () => {
  return (
    <div className={pageStyle.page}>
      <h1 className={headingStyle.heading}>Mixtape</h1>
      <h2>Entre com sua conta do Spotify para continuar</h2>
      <Button onClickFunc={() => signIn("spotify")}>Entrar</Button>
    </div>
  );
};
