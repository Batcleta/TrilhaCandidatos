// // import { useState, useEffect } from "react";

// // function useUserMedia(requestedMedia) {
// //   const [mediaStream, setMediaStream] = useState(null);

// //   useEffect(() => {
// //     async function enableStream() {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia(
// //           requestedMedia
// //         );
// //         setMediaStream(stream);
// //       } catch (err) {
// //         // Removed for brevity
// //       }
// //     }

// //     if (!mediaStream) {
// //       enableStream();
// //     }
// //     // else {
// //     //   return function cleanup() {
// //     //     mediaStream.getTracks().forEach((track) => {
// //     //       track.stop();
// //     //     });
// //     //   };
// //     // }
// //   }, [mediaStream, requestedMedia]);

// //   return mediaStream;
// // }

// // export function useMediaRecorder() {
// //   const mediaStream = useUserMedia({
// //     audio: false,
// //     video: { facingMode: "environment" },
// //   });

// //   // const [chunks, setChunks] = useState([]);
// //   // const [recorder, setRecorder] = useState();

// //   // useEffect(() => {
// //   //   const recorder = new MediaRecorder(mediaStream, {
// //   //     mimeType: "video/webm",
// //   //   });

// //   //   recorder.ondataavailable = (e) => {
// //   //     if (e.data.size > 0) {
// //   //       setChunks(e.data);
// //   //     } else {
// //   //       // ...
// //   //     }

// //   //     setRecorder(recorder);
// //   //   };
// //   // }, [mediaStream]);

// //   // // export - status do player
// //   // const status = recorder?.state || "";

// // // export - função que inicia a gravação
// // const handlePlay = () => {
// //   recorder.play();
// //   console.log(`Iniciando a gravação: ${status}`);
// // };

// // // export - função que para a gravação
// // const handleStop = () => {
// //   recorder.stop();
// //   console.log(`Parando a gravação: ${status}`);
// // };

// // // export - função chamada quando a gravação é pausada
// // const onStop = (cpf, url) => {
// //   const bigVideoBlob = new Blob(chunks, {
// //     type: "video/webm",
// //   });

// //   let formData = new FormData();
// //   const fname = `candidato${Date.now()}${cpf}.webm`;
// //   formData.append("fname", fname);
// //   formData.append("data", bigVideoBlob);

// //   fetch(url, {
// //     method: "POST",
// //     body: formData,
// //   }).then(() => localStorage.setItem("videoUrl", `public/uploads/${fname}`));
// // };

// //   return { mediaStream };
// // }

// import { useState, useEffect } from "react";

// export function useUserMedia(requestedMedia) {
//   const [mediaStream, setMediaStream] = useState(undefined);
//   const [record, setRecorder] = useState();

//   useEffect(() => {
//     const stream = navigator.mediaDevices
//       .getUserMedia(requestedMedia)
//       .then((stream) => {
//         setMediaStream(stream);
//         const recorder = new MediaRecorder(stream);

//         setRecorder(recorder);
//       });

//     if (record) {
//       record.onstop = async (e) => {
//         const bigVideoBlob = new Blob(chunks, {
//           type: "video/webm",
//         });

//         const blobUrl = window.URL.createObjectURL(bigVideoBlob);
//         console.log(blobUrl);
//         console.log(`onstop : ${record.state}`);

//         let formData = new FormData();
//         const fname = `candidato${Date.now()}${"cpf"}.webm`;
//         formData.append("fname", fname);
//         formData.append("data", bigVideoBlob);

//         fetch("local", {
//           method: "POST",
//           body: formData,
//         }).then(() =>
//           localStorage.setItem("videoUrl", `public/uploads/${fname}`)
//         );
//       };
//     }
//   }, [mediaStream, requestedMedia, record]);

//   const chunks = [];
//   // record.ondataavailable = (e) => {
//   //   if (e.data.size > 0) {
//   //     chunks.push(e.data);
//   //   } else {
//   //     // ...
//   //   }
//   // };

//   // export - função que inicia a gravação
//   const handlePlay = () => {
//     record.start();
//     console.log(`Iniciando a gravação: ${record.state}`);
//   };

//   // export - função que para a gravação
//   const handleStop = () => {
//     record.stop();
//     console.log(`Parando a gravação: ${record.state}`);
//   };

//   // export - função chamada quando a gravação é pausada

//   return { mediaStream, handlePlay, handleStop };
// }
