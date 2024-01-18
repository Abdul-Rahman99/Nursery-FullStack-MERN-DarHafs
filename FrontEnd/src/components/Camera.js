import React, { useRef, useState } from "react";

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [mediaStream, setMediaStream] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas.getContext("2d").drawImage(video, 0, 0);

      video.pause();
      stopCamera();

      canvas.toBlob((blob) => {
        if (blob) {
          onCapture(blob);
        }
      }, "image/jpeg");
    }
  };

  return (
    <div className="container m-3">
      <div className="row">
        <div className="col-12">
          <div className="btn-group m-1">
            <button className="btn btn-primary m-1" onClick={startCamera}>
              تشغيل الكاميرا
            </button>
            <button className="btn btn-success m-1" onClick={captureImage}>
              التقاط صورة
            </button>
            <button className="btn btn-danger m-1" onClick={stopCamera}>
              إيقاف الكاميرا
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <video ref={videoRef} autoPlay muted className="w-100" />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
