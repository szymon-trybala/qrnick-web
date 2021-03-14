import { Card, Col, Row } from "antd";
import React from "react";
import MainLayout from "../../common/mainLayout/MainLayout";
import { useAppSelector } from "../../core/store/hooks";

const GamesList: React.FC = () => {
  const games = useAppSelector((state) => state.gamesList);

  return (
    <MainLayout>
      <Row gutter={16}>
        {games &&
          games.map((g) => (
            <Col span={8}>
              <Card title={g.name} bordered hoverable>
                TODO: Miniaturka + przycisk uruchomienia
              </Card>
            </Col>
          ))}
      </Row>
    </MainLayout>
  );
};

export default GamesList;
