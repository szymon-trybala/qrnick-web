import { Button, Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import MainLayout from "../../common/mainLayout/MainLayout";
import Unity, { UnityContext } from "react-unity-webgl";
import { useParams } from "react-router";
import GameLoadingErrorFeedback from "../../common/feedbacks/GameLoadingErrorFeedback";

interface GameViewUrlProps {
  gameId: string;
}

interface GameLoadingStatus {
  loaded: boolean;
  progress: number;
  error: boolean;
  errorMessage: string | undefined;
}

const GameView: React.FC = () => {
  const [loadingState, setLoadingState] = useState<GameLoadingStatus>({
    loaded: false,
    error: false,
    progress: 0,
    errorMessage: undefined,
  });
  const { gameId } = useParams<GameViewUrlProps>();

  let unityContext = new UnityContext({
    loaderUrl: `UnityLoaderFile?gameId=${gameId}`,
    dataUrl: `UnityDataFile?gameId=${gameId}`,
    frameworkUrl: `UnityFrameworkFile?gameId=${gameId}`,
    codeUrl: `UnityWasmFile?gameId=${gameId}`,
  });

  useEffect(() => {
    return () => {
      unityContext.quitUnityInstance();
    };
  }, []);

  unityContext.on("progress", (progression: number) => {
    setLoadingState({ ...loadingState, progress: progression * 100 });
  });
  unityContext.on("error", (msg) => {
    setLoadingState({
      loaded: false,
      progress: 0,
      errorMessage:
        "Wystąpił błąd podczas próby uruchomienia gry. Spróbuj ponownie.",
      error: true,
    });
  });

  unityContext.on("loaded", () => {
    setLoadingState({ ...loadingState, loaded: true });
  });

  const handleFullscreenButtonClick = () => {
    unityContext.setFullscreen(true);
  };

  return (
    <MainLayout>
      {!loadingState.loaded && !loadingState.error && (
        <Spin size="large" tip={`Ładowanie... ${loadingState.progress}%`} />
      )}
      {loadingState.error && (
        <GameLoadingErrorFeedback message={loadingState.errorMessage} />
      )}
      <Row
        gutter={[8, 8]}
        style={{ visibility: loadingState.loaded ? "visible" : "hidden" }}
      >
        <Col span={24}>
          <Row>
            <Unity
              unityContext={unityContext}
              style={{ width: "100%", height: "65vh" }}
            />
          </Row>
        </Col>
        <Col span={24}>
          <Button
            onClick={() => handleFullscreenButtonClick()}
            type="primary"
            block
          >
            Pełny ekran
          </Button>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default GameView;
