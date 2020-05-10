import React from "react";

import { DotBackground } from "../../../components/DotBackground";
import { Page } from "../../../components/Common/Page";
import { Row } from "../../../components/Common/Row";
import { Title } from "../../../components/Common/Title";

import { useGameContext } from "../../../context/game";

import styles from "./Lobby.module.scss";
import { Button } from "../../../components/Common/Button";
import { AvatarButton } from "../../../components/Common/AvatarButton";
import { getInitials } from "../../../core/utils";

const Lobby: React.FC = () => {
  const { title, code, players } = useGameContext();
  return (
    <>
      <DotBackground amount={100} />
      <Page>
        <Row className={styles.columns}>
          <div className={styles.left}>
            <Title className={styles.subtitle} type="inline" text="Title" />
            <Title className={styles.title} type="main" text={title} />

            <Title className={styles.subtitle} type="inline" text="Room Code" />
            <Title className={styles.title} type="main" text={code} />

            <Title className={styles.subtitle} type="inline" text="Players" />

            <ul className={styles.playerList}>
              {players.map((player) => {
                return (
                  <li className={styles.player} key={player.id}>
                    <AvatarButton
                      image={player.image}
                      text={getInitials(player.name)}
                      buttonType="negative"
                    />
                    <span>{player.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.right}>
            <Title type="sub" text="Next Steps" />

            <p>
              Anyone playing should enter the room code, into the home page of
              this site. If you want to play as well, remember to join on your
              phone, or another browser window.
            </p>
            <p>
              So that everyone can see the questions, you should also share this
              browser window on whatever video call software you have, or let
              the others look at this screen if you&apos;re so analog-ly
              inclined.
            </p>
            <p>Then, when you’re ready, hit the green button</p>

            <Button buttonType="positive" icon="check">
              Everyone is in, let&apos;s play
            </Button>
          </div>
        </Row>
      </Page>
    </>
  );
};

export { Lobby };
