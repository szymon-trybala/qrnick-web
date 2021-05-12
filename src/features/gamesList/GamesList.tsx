import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GamesListEmptyFeedback from "../../common/feedbacks/GamesListEmptyFeedback";
import GamesListErrorFeedback from "../../common/feedbacks/GamesListErrorFeedback";
import MainLayout from "../../common/mainLayout/MainLayout";
import LoadingGamesSkeleton from "../../common/skeletons/LoadingGamesSkeleton";
import { gamesService } from "../../core/api/gamesService";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";

const GamesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const gamesState = useAppSelector((state) => state.gamesList);

  useEffect(() => {
    dispatch(gamesService.fetchGamesList());
  }, [dispatch]);

  return (
    <MainLayout>
      {gamesState.promise === "pending" && <LoadingGamesSkeleton />}
      {gamesState.promise === "error" && <GamesListErrorFeedback />}
      {gamesState.promise === "fulfilled" && gamesState.games.length === 0 && (
        <GamesListEmptyFeedback />
      )}
      {gamesState.promise === "fulfilled" && gamesState.games.length > 0 && (
        <Row gutter={[32, 32]}>
          {gamesState.games.map((g, i) => (
            <Col key={i} xs={24} xl={8}>
              <Link to={`game/${g.gameId}`}>
                <Card
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  bordered
                  hoverable
                >
                  <Card.Meta
                    title={`${g.name} ${g.version}`}
                    description={g.description}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </MainLayout>
  );
};

export default GamesList;
