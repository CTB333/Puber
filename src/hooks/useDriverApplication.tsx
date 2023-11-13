import { useEffect, useState } from "react";
import useCamera from "./useCamera";
import useOnChange from "./useOnChange";
import { Image, Party } from "../interfaces";
import useFetch from "./useFetch";
import { stringify } from "../utils";
import CONSTANTS from "../Constants";
import useUploadImage from "./useUploadImage";
import { useUser } from "../providers";

const initialValue = {
  camera: "",
  image: "",
  server: "",
};

const useDriverApplication = (party: Party) => {
  const { user } = useUser();
  const { data, put, error: fetchError } = useFetch();
  const {
    openCamera,
    closeCamera,
    cameraOpen,
    cameraRef,
    takePicture,
    image: cameraImage,
    imageChange: cameraImageChange,

    error: cameraError,
    errorChange: cameraErrorChange,
  } = useCamera();

  const { upload, url, error: uploadError } = useUploadImage();

  const [image, setImage] = useState<Image | null>(null);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataIsParty, setDataIsParty] = useState(false);

  const [error, setError, errorChange] = useOnChange(initialValue);

  useEffect(() => {
    setError((prev) => ({ ...prev, camera: cameraError.permission }));
  }, [cameraErrorChange]);

  useEffect(() => {
    if (fetchError) setError((prev) => ({ ...prev, server: fetchError }));
    if (uploadError) setError((prev) => ({ ...prev, server: uploadError }));

    if (fetchError || uploadError) setLoading(false);
  }, [stringify(fetchError), stringify(uploadError)]);

  useEffect(() => {
    if (!cameraImage) return;
    setImage(cameraImage);
  }, [cameraImageChange]);

  useEffect(() => {
    updateUser();
  }, [url]);

  useEffect(() => {
    if (!data) return;

    recieveData();
  }, [stringify(data)]);

  const clearError = () => setError(initialValue);

  const updateUser = () => {
    if (!url || !user) return;

    put(`users/${user.id}`, { ...user, liscence: url });
  };

  const updateParty = () => {
    setDataIsParty(true);

    let drivers = party.drivers;

    drivers.push(user!.id);

    put(`parties/${party.id}`, { ...party, drivers });
  };

  const recieveData = () => {
    if (!data) return;

    if (!dataIsParty) return updateParty();

    setSuccess(true);
    setLoading(false);
  };

  const submit = async () => {
    clearError();

    if (!user) return;

    const usingUserLiscence = image == null && user.liscence !== undefined;

    if (!usingUserLiscence && !image?.base64)
      return setError((prev) => ({ ...prev, image: "Missing image" }));

    setSuccess(false);
    setDataIsParty(false);
    setLoading(true);

    if (!usingUserLiscence && image?.base64) return upload(image.base64);

    if (!usingUserLiscence) return;

    updateParty();
  };

  return {
    submit,
    loading,
    success,
    error,
    errorChange,

    image,

    cameraRef,
    openCamera,
    closeCamera,
    cameraOpen,
    takePicture,
  };
};

export default useDriverApplication;
