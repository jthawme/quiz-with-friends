import React from "react";
import { RouteComponentProps, Link } from "@reach/router";

import { DotBackground } from "../../components/DotBackground";
import { Page } from "../../components/Common/Page";
import { Row } from "../../components/Common/Row";
import styles from "./About.module.scss";
import { Title } from "../../components/Common/Title";

const About: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <DotBackground amount={25} />
      <Page>
        <Row id="about" className={styles.section}>
          <Title className={styles.title}>About</Title>
          <p>
            Quiz with friends was born out of a time of remote fun. Its a quiz
            that encourages you to be engaged in a video call at the same time,
            so that its active socialising. Its good to see your friends and
            family and its good to do something together
          </p>
        </Row>
        <Row id="how-to-play" className={styles.section}>
          <Title className={styles.title}>How To Play</Title>
          <p>
            Quiz with friends is a multiple choice style quiz, one person{" "}
            <Link to="/create">creates a quiz</Link> or{" "}
            <Link to="/#starters">starts a pre-made one</Link> and that creates
            a room. Then using the room code that is displayed, others will
            visit this site and enter the room code in. Now you’re all playing
            together!
          </p>
          <p>
            The only thing that is necessary is that the main player remains in
            the quiz at all times. They then share their screen with the rest of
            the players, so that they can watch to see the questions come up.
          </p>
        </Row>
        <Row id="contact" className={styles.section}>
          <Title className={styles.title}>Contact</Title>
          <p>
            If you want to get in touch for any reason, or if you find a
            problem, please email me at{" "}
            <a href="mailto:hi@jthaw.me?subject=Quiz With Friends">
              hi@jthaw.me
            </a>{" "}
            or find me on twitter{" "}
            <a
              href="https://twitter.com/jthawme"
              target="_blank"
              rel="noopener noreferrer"
            >
              @jthawme
            </a>
          </p>
        </Row>
      </Page>
    </>
  );
};

export { About };
