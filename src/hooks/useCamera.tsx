import { useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import useOnChange from "./useOnChange";
import { stringify } from "../utils";
import { Image } from "../interfaces";

const initialValue = {
  permission: "",
};

const useCamera = () => {
  const cameraRef = useRef<Camera | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [backCamera, setBackCamera] = useState(true);
  const [error, setError, errorChange] = useOnChange(initialValue);
  const [image, setImage, imageChange] = useOnChange<Image | null>(null);

  const clearError = () => setError(initialValue);

  const openCamera = async () => {
    clearError();

    let permission = await Camera.requestCameraPermissionsAsync();

    if (!permission.granted)
      return setError((prev) => ({
        ...prev,
        permission: "Camera Permission denied",
      }));

    setCameraOpen(true);
  };

  const closeCamera = () => setCameraOpen(false);

  const flipCamera = () => {
    setBackCamera((prev) => !prev);
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;

    let picture = await camera.takePictureAsync({ base64: true });

    setImage({ base64: picture.base64, uri: picture.uri });

    closeCamera();
  };

  return {
    openCamera,
    closeCamera,
    cameraOpen,
    cameraRef,
    takePicture,
    image,
    imageChange,
    backCamera,
    flipCamera,

    error,
    errorChange,
  };
};

export default useCamera;
