import { useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useEffect, useState } from "react/cjs/react.development";
import styled, { css } from "styled-components";

const RecordView = () => {
  const [onRecording, setOnRecording] = useState(false);
  const [timer, setTimer] = useState();
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({ video: true });

  const streamRef = useRef();
  const videoRef = useRef();

  if (streamRef.current && previewStream) {
    streamRef.current.srcObject = previewStream;
  }

  useEffect(() => {
    if (mediaBlobUrl) {
      const currentTime = videoRef.current.currentTime;
      let minutes = Math.floor(currentTime / 60);
      let seconds = Math.floor(currentTime - minutes * 60);

      setTimer(seconds);
    }
  }, [timer]);

  const handleRecord = () => {
    startRecording();
    setOnRecording(true);
  };

  const handleStopRecord = () => {
    stopRecording();
    setOnRecording(false);
  };

  const handlePlay = () => {
    videoRef.current.play();
    setTime();
  };
  const handlePause = () => {
    videoRef.current.pause();
  };

  const setTime = () => {
    let minutes = Math.floor(videoRef.current.currentTime / 60);
    let seconds = Math.floor(videoRef.current.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
      minuteValue = "0" + minutes;
    } else {
      minuteValue = minutes;
    }

    if (seconds < 10) {
      secondValue = "0" + seconds;
    } else {
      secondValue = seconds;
    }

    let mediaTime = minuteValue + ":" + secondValue;
    setTimer(mediaTime);

    // let barLength =
    //   timerWrapper.clientWidth * (media.currentTime / media.duration);
    // timerBar.style.width = barLength + "px";
  };

  return (
    <div>
      <p>{status}</p>
      <p>{timer}</p>

      <VideoWrapper>
        <VideoContainer>
          {status !== "stopped" ? (
            <VideoOnStream
              status={status}
              ref={streamRef}
              autoPlay
              height={540}
            />
          ) : (
            <VideoOnPlay
              status={status}
              src={mediaBlobUrl}
              ref={videoRef}
              height={540}
            ></VideoOnPlay>
          )}
          <VideoControls status={status}>
            <button onClick={() => handlePlay()}>play</button>
            <button onClick={() => handlePause()}>pause</button>
            <button onClick={() => setTime()}>time</button>
          </VideoControls>
          <div>{timer}</div>
        </VideoContainer>

        <Controls status={status} onRecording={onRecording}>
          <button
            className="recording"
            onClick={() =>
              status !== "recording" ? handleRecord() : handleStopRecord()
            }
          >
            <span></span>
          </button>
        </Controls>
      </VideoWrapper>
    </div>
  );
};

export default RecordView;

const VideoWrapper = styled.div`
  height: 750px;
  width: 375px;
  background: white;

  display: grid;
  justify-content: center;
  align-items: start;
  overflow: hidden;
  position: relative;
  border-radius: 0.5rem;
`;

const VideoContainer = styled.div``;

const VideoOnStream = styled.video`
  transition: 0.3s;
`;

const VideoOnPlay = styled.video`
  transition: 0.3s;
  z-index: 1;
`;

const Controls = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
  display: relative;

  .recording {
    visibility: ${({ status }) =>
      status === "stopped" ? "hidden" : "visible"};
    opacity: ${({ status }) => (status === "stopped" ? "0" : "1")};
    transition: 0.3s;
    width: 5rem;
    height: 5rem;
    background: red;
    border: 0;
    border-radius: 50%;
    cursor: pointer;

    transform: ${({ onRecording }) =>
      !onRecording
        ? "translateY(0) scale(0.85)"
        : "translateY(1rem) scale(0.85)"};

    span {
      transition: 0.3s;
      margin: 0 auto;
      display: block;
      background: white;
      width: ${({ status }) => (status === "recording" ? "1.5rem" : "2rem")};
      height: ${({ status }) => (status === "recording" ? "1.5rem" : "2rem")};
      border-radius: ${({ status }) => (status === "recording" ? "0" : "50%")};
      transform: scale(1);
    }
  }

  .recording:hover {
    transform: ${({ onRecording }) =>
      !onRecording
        ? "translateY(0) scale(0.80)"
        : "translateY(1rem) scale(0.80)"};

    span {
      transform: scale(1.3);
    }
  }

  .stopping {
  }
`;

const VideoControls = styled.div`
  position: absolute;
  left: 0;
  transition: 0.3s;
  transform: ${({ status }) =>
    status === "stopped" ? "translateY(0rem)" : "translateY(-3rem)"};
  opacity: ${({ status }) => (status === "stopped" ? "1" : "0")};
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-evenly;
  gap: 1rem;
  margin-top: -0.3rem;
  background: rgba(0, 0, 0, 0.8);
  height: 4rem;
  width: 100%;

  button {
    width: 5rem;
  }
`;
