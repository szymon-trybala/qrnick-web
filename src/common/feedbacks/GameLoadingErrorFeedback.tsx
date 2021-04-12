import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../core/router/routes";

interface GameLoadingErrorFeedbackProps {
  message: string | undefined;
}

const GameLoadingErrorFeedback: React.FC<GameLoadingErrorFeedbackProps> = ({
  message,
}) => {
  return (
    <Result
      status="500"
      title="Nie udało się załadować gry"
      subTitle={message || "Nieokreślony błąd"}
      extra={
        <Link to={routes.home}>
          <Button type="primary">Wróć na stronę główną</Button>
        </Link>
      }
    />
  );
};

export default GameLoadingErrorFeedback;
