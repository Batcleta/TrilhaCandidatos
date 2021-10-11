import React, { useEffect, useState, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const ConteMais = (props) => {
  const [vagaName, setVagaName] = useState({});
  // controle do botão de recording
  const [onRecording, setOnRecording] = useState(false);
  // Controle do timer
  const [timer, setTimer] = useState();
  // controle do botão de play / pause
  const [playing, setPlaying] = useState();
  // Contrle do processo completoda gravação
  const [processo, setProcesso] = useState("inicio");
  // blob
  const [blob, setBlob] = useState(undefined);

  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({
      video: true,
      onStop: (blobUrl, blob) => {
        setBlob(blob);
      },
    });

  const streamRef = useRef();
  const videoRef = useRef();

  if (streamRef.current && previewStream) {
    streamRef.current.srcObject = previewStream;
  }

  useEffect(() => {
    const vaga = JSON.parse(sessionStorage.getItem("vagaEscolhida"));
    setVagaName(vaga);
  }, []);

  const handleRecord = () => {
    startRecording();
    setOnRecording(true);
    setProcesso("gravando");
  };

  const handleStopRecord = () => {
    stopRecording();
    setOnRecording(false);
  };

  const handlePlay = () => {
    videoRef.current.play();
    setPlaying(true);

    const dur = videoRef.current.duration
      ? Math.ceil(videoRef.current.duration)
      : "";

    console.log(dur);

    setTimeout(() => {
      setPlaying(false);
    }, `${dur}000`);
  };

  const handlePause = () => {
    videoRef.current.pause();
    setPlaying(false);
  };

  const onFinish = () => {
    setProcesso("finalizado");
  };

  const { register, handleSubmit, errors, setValue, watch, control } =
    useForm();

  const onSubmit = async (data) => {
    const fname = `candidato${Date.now()}-${data.cpfCandidato}.webm`;

    let formData = new FormData();
    formData.append("fname", fname);
    formData.append("data", blob);

    const apiUrl = "https://api.trilhatecnologia.com";
    const sData = { ...data, videoUrl: `${apiUrl}/public/uploads/${fname}` };

    fetch(`${apiUrl}/video`, {
      method: "POST",
      body: formData,
    })
      .then(() => sessionStorage.setItem("conteMais", JSON.stringify(sData)))
      .then(() => {
        props.history.push("/cadastro/passo02");
      });
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h2 className="main-title">Conte mais sobre você</h2>
        <h3 className="sub-title">
          Em um vídeo curto, conte um pouco sobre você, sobre seus interesses na
          área escolhida <strong>{vagaName.nomeVaga} </strong>e o que te
          inspira.
        </h3>
      </div>

      <VideoWrapper>
        {processo === "inicio" ? (
          <div className="splash__image">Clique para gravar</div>
        ) : processo !== "finalizado" ? (
          <VideoContainer>
            {status !== "stopped" ? (
              <VideoOnStream status={status} ref={streamRef} autoPlay />
            ) : (
              <VideoOnPlay
                status={status}
                src={mediaBlobUrl}
                ref={videoRef}
              ></VideoOnPlay>
            )}

            <VideoControls
              status={status}
              playing={playing}
              onClick={!playing ? handlePlay : handlePause}
            >
              <div class="border"></div>
              <div class="play"></div>
            </VideoControls>
          </VideoContainer>
        ) : (
          <SvgWrapper>
            {" "}
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </SvgWrapper>
        )}

        <Controls processo={processo} status={status} onRecording={onRecording}>
          <button
            className="recording"
            onClick={() =>
              status !== "recording" ? handleRecord() : handleStopRecord()
            }
          >
            <span></span>
          </button>

          <ButtonGroup status={status}>
            <button onClick={handleRecord}> Regravar</button>
            <button onClick={onFinish}>Ok</button>
          </ButtonGroup>
        </Controls>
      </VideoWrapper>

      <FormWrapper onSubmit={handleSubmit(onSubmit)} id="conteMais">
        {/* nome - nomeCandidato */}
        <div className="form-group">
          <label htmlFor="">Nome Completo</label>
          <input
            type="text"
            placeholder="Informe seu nome"
            name="nomeCandidato"
            ref={register({
              required: true,
            })}
          />
          <small>{errors.nomeCandidato && "Informe um nome válido "}</small>
        </div>

        {/* cpf - cpfCandidato */}
        <div className="form-group">
          <label htmlFor="">CPF</label>
          <input
            type="text"
            placeholder="Informe seu CPF"
            name="cpfCandidato"
            ref={register({
              required: true,
              validate: {
                cpfCheck: (strCPF) => {
                  var Soma;
                  var Resto;
                  Soma = 0;
                  if (strCPF == "00000000000") return false;

                  for (let i = 1; i <= 9; i++)
                    Soma =
                      Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
                  Resto = (Soma * 10) % 11;

                  if (Resto == 10 || Resto == 11) Resto = 0;
                  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

                  Soma = 0;
                  for (let i = 1; i <= 10; i++)
                    Soma =
                      Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
                  Resto = (Soma * 10) % 11;

                  if (Resto == 10 || Resto == 11) Resto = 0;
                  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
                  return true;
                },
                // hasCpf: async cpf => {

                //     const resp = await axios.get(`http://localhost:8081/candidato/${cpf}`)

                //     if (resp.data.length !== 0) {
                //         return false
                //     }

                // }
              },
            })}
          />
          <small>
            {errors.cpfCandidato?.type === "cpfCheck" &&
              "Informe um cpf válido "}
          </small>
          {/* <small>{errors.cpfCandidato?.type === "hasCpf" && "Este Cpf ja foi cadastrado"}</small> */}
        </div>
      </FormWrapper>

      <p>revise seus dados antes de continuar</p>
      <div className="button-group">
        <button form="conteMais" type="submit" className="btn btn-next">
          Proximo
        </button>
      </div>
    </div>
  );
};

export default ConteMais;

const VideoWrapper = styled.div`
  /* height: 45rem; */
  padding: 2rem;
  margin: 0 auto;

  display: grid;
  justify-content: center;
  align-items: start;
  overflow: hidden;
  position: relative;
  border-radius: 0.5rem;

  .splash__image {
    /* background-color: white; */
    /* height: 30rem; */
    width: 35rem;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const VideoContainer = styled.div`
  height: 30rem;
`;

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
  transition: 0.3s;

  opacity: ${({ processo }) => (processo === "finalizado" ? "0" : "1")};
  height: ${({ processo }) => (processo === "finalizado" ? "1px" : "auto")};

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
  left: calc(50% - 3rem);
  transition: 0.3s;
  transform: ${({ status }) =>
    status === "stopped" ? "translateY(-2.5rem)" : "translateY(-3.5rem)"};
  opacity: ${({ status }) => (status === "stopped" ? "1" : "0")};

  height: 5.5rem;
  width: 5.5rem;
  cursor: pointer;
  background: white;
  margin: 0 auto;
  border-radius: 50%;
  padding: 0.5rem;

  .border {
    width: 100%;
    height: 100%;
    border: 1px solid #2b438b;
    border-radius: 50%;

    /* playing */
    border-top: ${({ playing }) => (playing ? "none" : "")};
    border-bottom: ${({ playing }) => (playing ? "none" : "")};
    animation: ${({ playing }) =>
      playing ? "spin 1.5s ease-in-out infinite" : ""};
  }

  .play {
    z-index: 5;
    position: absolute;
    top: calc(50% - 1.25rem);
    left: calc(50% - 0.8rem);
    box-sizing: border-box;
    height: 2.5rem;
    width: 2.5rem;

    border-color: transparent transparent transparent #2b438b;
    transition: 100ms all ease;
    will-change: border-width;
    cursor: pointer;

    // play state

    border-style: ${({ playing }) => (playing ? "double" : "solid")};
    border-width: ${({ playing }) =>
      playing ? "0px 0 0px 28px" : "20px 0 20px 35px"};

    transform: ${({ playing }) =>
      playing ? "translate(-1px, 1px)" : "translate(0, 0)"};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #7ac142;
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 10% auto;
    box-shadow: inset 0px 0px 0px #7ac142;
    animation: fill 0.4s ease-in-out 0.4s forwards,
      scale 0.3s ease-in-out 0.9s both;
  }

  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes scale {
    0%,
    100% {
      transform: none;
    }

    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }

  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 50px #7ac142;
    }
  }
`;

const ButtonGroup = styled.div`
  margin-top: 2rem;
  transition: 0.3s;
  visibility: ${({ status }) => (status === "stopped" ? "visible" : "hidden")};
  transform: ${({ status }) =>
    status === "stopped" ? "translateY(-2rem)" : "translateY(10rem)"};
  display: flex;
  gap: 1rem;

  button {
    border: none;
    padding: 1rem;
    width: 9rem;
    cursor: pointer;
  }
`;

const FormWrapper = styled.form``;
