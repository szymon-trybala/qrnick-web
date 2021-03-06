import { Card, Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../common/mainLayout/MainLayout";
import { RootState } from "../../core/store/rootReducer";

const GamesList: React.FC = () => {
  const games = useSelector((state: RootState) => state.gamesList);

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
