import { Button, Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import MainLayout from "../../common/mainLayout/MainLayout";
import Unity, { UnityContext } from "react-unity-webgl";
import { useParams } from "react-router";
import GameLoadingErrorFeedback from "../../common/feedbacks/GameLoadingErrorFeedback";
import { isMobileSafari, isMobile } from "react-device-detect";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  unityContextDefaultStyles,
  unityContextFullScreenStyles,
} from "./gameViewConsts";
import packageJson from "../../../package.json";

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
  const handle = useFullScreenHandle();
  const unityContext = new UnityContext({
    loaderUrl: `${packageJson.proxy}game/UnityLoaderFile?gameId=${gameId}`,
    dataUrl: `${packageJson.proxy}game/UnityDataFile?gameId=${gameId}`,
    frameworkUrl: `${packageJson.proxy}game/UnityFrameworkFile?gameId=${gameId}`,
    codeUrl: `${packageJson.proxy}game/UnityWasmFile?gameId=${gameId}`,
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
    if (isMobile) {
      handle.enter();
    }
  });

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
            {isMobileSafari ? (
              <Unity
                unityContext={unityContext}
                style={
                  handle.active
                    ? unityContextFullScreenStyles
                    : unityContextDefaultStyles
                }
              />
            ) : (
              <FullScreen handle={handle}>
                <Unity
                  unityContext={unityContext}
                  style={
                    handle.active
                      ? unityContextFullScreenStyles
                      : unityContextDefaultStyles
                  }
                />
              </FullScreen>
            )}
          </Row>
        </Col>
        {!isMobileSafari && (
          <Col span={24}>
            <Button onClick={handle.enter} type="primary" block>
              Pełny ekran
            </Button>
          </Col>
        )}
      </Row>
    </MainLayout>
  );
};

export default GameView;
