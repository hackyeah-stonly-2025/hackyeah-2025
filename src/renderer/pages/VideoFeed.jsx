// import styled from 'styled-components';

import { useEffect, useRef } from 'react';

const MAX_FRAME_RATE = 10; // frames per second
const FRAME_DIFF = 1000 / MAX_FRAME_RATE;

export default function VideoFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let lastDraw = 0;

    const onFrame = async () => {
      if (videoRef.current.paused) {
        requestAnimationFrame(onFrame);
        return;
      }
      const now = Date.now();
      if (now - lastDraw < FRAME_DIFF) {
        requestAnimationFrame(onFrame);
        return;
      }
      lastDraw = now;

      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      const ctx = canvasRef.current.getContext('2d');
      ctx?.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );

      canvasRef.current.toBlob(
        async (blob) => {
          const arrayBuffer = await blob.arrayBuffer();
          window.electron?.ipcRenderer.sendMessage('video-data', {
            type: blob.type,
            data: arrayBuffer,
          });
        },
        'image/jpeg',
        0.8,
      );

      videoRef.current.requestVideoFrameCallback(onFrame);
    };

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.requestVideoFrameCallback(onFrame);
        videoRef.current.play();
        return stream;
      })
      .catch((error) => {
        console.error('Error accessing the camera: ', error);
      });
    // window.electron?.ipcRenderer.sendMessage('video-data', null);
  }, []);

  return (
    <>
      <div>Video feed in here</div>
      <video ref={videoRef} controls />
      <canvas ref={canvasRef} />
      <style>{`video { width: 200px; height: 200px; } canvas { width: 200px; height: 200px; }`}</style>
    </>
  );
}
