import React, { useCallback } from "react";
import { Title } from "../../components/Common/Title";
import { Page } from "../../components/Common/Page";
import { Button } from "../../components/Common/Button";
import { Input } from "../../components/Common/Input";

const validateRoom = (value?: string): boolean => {
  return !!(value && value.length === 5);
};

const Home: React.FC = () => {
  const onRoomSubmit = useCallback((value?: string) => {
    console.log("room code", value);
  }, []);

  return (
    <Page>
      <Title text="Join Game" helpText="Enter the code to a room to join it" />
      <Input
        inputSize="large"
        placeholder="5 Digit Room Code..."
        maxLength={5}
        validateFunc={validateRoom}
        onTextSubmit={onRoomSubmit}
      />

      <Title
        text="Quick Create"
        helpText="Populate a quiz quickly to starting playing"
        rightSlot={<Button to="/create">Create your own</Button>}
      />
    </Page>
  );
};

export { Home };
