import React, { useCallback, useState } from "react";

import { useMediaQuery } from "react-responsive";
import { RouteComponentProps, navigate } from "@reach/router";

import { Title } from "../../components/Common/Title";
import { Page } from "../../components/Common/Page";
import { Button } from "../../components/Common/Button";
import { Input } from "../../components/Common/Input";
import { Row } from "../../components/Common/Row";
import { DotBackground } from "../../components/DotBackground";
import { TileGroup } from "../../components/Common/Tile/TileGroup";
import { Tile } from "../../components/Common/Tile";
import { Alert } from "../../components/Common/Alert";

import { wait } from "../../core/utils";

const validateRoom = (value?: string): boolean => {
  return !!(value && value.length === 5);
};

const Home: React.FC<RouteComponentProps> = () => {
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);

  const isTablet = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const onRoomSubmit = useCallback((value?: string) => {
    setIsJoiningRoom(true);
    wait(1500).then(() => {
      navigate(`/play/${value}`);
    });
  }, []);

  return (
    <>
      <DotBackground amount={25} />
      <Page>
        <Alert
          type="negative"
          closeButtonProps={{ buttonType: "normal", children: "See ya" }}
        >
          <h3>Hey There!</h3>
          <p>
            I don’t think we’ve met. Well, just to tell you if you want to play
            or make any games, you might want to change your name and your photo
            in the top right hand corner.
          </p>

          <p>
            Other than that, please have fun! If you want to know more, look for
            the ? icons. Oh and I won’t greet you like this everytime, don’t
            worry.
          </p>
        </Alert>

        <Row>
          <Title
            text="Join Game"
            helpText="Enter the code to a room to join it"
          />
          <Input
            inputSize={isTablet ? "large" : "normal"}
            placeholder="5 Digit Room Code..."
            maxLength={5}
            validateFunc={validateRoom}
            onTextSubmit={onRoomSubmit}
            disabled={isJoiningRoom}
            loading={isJoiningRoom}
          />
        </Row>

        <Row>
          <Title
            text="Quick Create"
            helpText="Populate a quiz quickly to starting playing"
            rightSlot={
              <Button to="/create" icon="plus-circle">
                Create your own
              </Button>
            }
          />

          <TileGroup>
            <Tile
              to="/create?initial=pop-culture"
              text="Pop Culture"
              icon="plus-circle"
            />
            <Tile
              to="/create?initial=history"
              text="History"
              icon="plus-circle"
              type="two"
            />
            <Tile
              to="/create?initial=music"
              text="Music"
              icon="plus-circle"
              type="three"
            />
            <Tile
              to="/create?initial=general-knowledge"
              text="General Knowledge"
              icon="plus-circle"
            />
          </TileGroup>
        </Row>
      </Page>
    </>
  );
};

export { Home };
