
import React, { useEffect, useState, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

// assets
import Microphone from '../../assets/img/microphone.png'
import PlayButton from '../../assets/img/play-button.png'
import PauseButton from '../../assets/img/pause.png'

const RecordView = props => {
    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ audio: true });

    const [blob, setBlob] = useState()
    const [attStatus, SetAttStatus] = useState()
    const [onPlay, SetOnPlay] = useState(false)

    useEffect(() => {
        SetAttStatus(status)
    }, [status])

    useEffect(() => {

        fetch(mediaBlobUrl)
            .then(r => r.blob())
            .then(file => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {

                    const teste = 'nome_do_melianwte'
                    const formData = {}
                    formData.fname = `${teste}.ogg`
                    formData.date = new Date()
                    formData.data = reader.result

                    setBlob(JSON.stringify(formData))
                }
            })

    }, [mediaBlobUrl])



    // Gravando
    const onRecording = e => {
        e.preventDefault()
        startRecording()
    }

    const stopRecord = e => {
        e.preventDefault()
        stopRecording()
    }

    // Playand
    const audioPlay = useRef(null);

    const onPlayButton = e => {
        e.preventDefault()
        audioPlay.current?.play();
        SetOnPlay(true)
    };

    const onPauseButton = e => {
        e.preventDefault()
        audioPlay.current?.pause();
        audioPlay.current?.load();
        SetOnPlay(false)
    };


    const onRegravar = e => {
        e.preventDefault()
        SetAttStatus('idle')
        SetOnPlay(false)
    }

    const onEnviar = e => {
        e.preventDefault()
        props.enviando(blob)
        // localStorage.setItem('gravacao', blob)
        SetAttStatus('enviado')
        SetOnPlay(false)
    }

    return (
        <div className="gravador">
            <h3>Grave um breve audio respondendo a pergunta:</h3>
            <p>Por que teve o interesse em participar
desse processo seletivo?</p>

            {
                attStatus === 'idle' ?
                    <div className="gravando">
                        <div className="consollers">

                            < a href="/" onClick={e => onRecording(e)}><img src={Microphone} alt="" /></a>
                        </div>

                    </div>

                    : attStatus === 'recording' ?

                        <div className="gravando">
                            <div className="consollers">
                                < a href="/" onClick={e => stopRecord(e)}>Parar</a>
                            </div>
                        </div>

                        : attStatus === 'stopped' && blob ?
                            <>
                                <audio ref={audioPlay} src={JSON.parse(blob).data} />
                                <div className="gravando">
                                    <div className="consollers">
                                        {
                                            !onPlay ?
                                                <a href="/" className="play-button" onClick={e => onPlayButton(e)}><img src={PlayButton} alt="" /></a>

                                                : <a href="/" onClick={e => onPauseButton(e)}><img src={PauseButton} alt="" /></a>
                                        }
                                    </div>
                                </div>
                                <div className="control">
                                    <a href="/" onClick={e => onRegravar(e)} className="audio-resp btn btn-prev">Regravar</a>
                                    <a href="/" onClick={e => onEnviar(e)} className="audio-resp btn btn-next">Enviar</a>
                                </div>
                            </>
                            : attStatus === 'enviado' ?
                                <>
                                    <div className="gravando">
                                        <div className="consollers">
                                            <p className="enviado">Enviado</p>
                                        </div>
                                    </div>

                                </> : ''
            }

        </div >
    );
};

export default RecordView;