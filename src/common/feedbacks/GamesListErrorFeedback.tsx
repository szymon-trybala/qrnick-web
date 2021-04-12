import { Result } from "antd";
import React from "react";
import { useAppSelector } from "../../core/store/hooks";

const GamesListErrorFeedback: React.FC = () => {
  const messagesState = useAppSelector((s) => s.gamesList);

  return (
    <Result
      status="500"
      title="Nie udało się pobrać listy gier"
      subTitle={messagesState.error}
    />
  );
};

export default GamesListErrorFeedback;
