import { useEffect, useState } from "react";
import useCamera from "./useCamera";
import useOnChange from "./useOnChange";
import { Image } from "../interfaces";
import useFetch from "./useFetch";
import { stringify } from "../utils";
import CONSTANTS from "../Constants";

const initialValue = {
  camera: "",
  image: "",
  server: "",
};

const useDriverApplication = () => {
  const { data, post, error: fetchError, isPending, success } = useFetch();
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

  const [image, setImage] = useState<Image | null>(null);

  useEffect(() => {
    setError((prev) => ({ ...prev, camera: cameraError.permission }));
  }, [cameraErrorChange]);

  useEffect(() => {
    if (!fetchError) return;
    setError((prev) => ({ ...prev, server: fetchError }));
  }, [stringify(fetchError)]);

  useEffect(() => {
    if (!cameraImage) return;
    setImage(cameraImage);
  }, [cameraImageChange]);

  useEffect(() => {
    if (!data) return;

    console.log(`${stringify(data)}`);
    console.log();
  }, [stringify(data)]);

  const [error, setError, errorChange] = useOnChange(initialValue);

  const clearError = () => setError(initialValue);

  const submitImage = async () => {
    if (!image?.base64)
      return setError((prev) => ({ ...prev, image: "Missing image" }));

    const formData = new FormData();

    formData.append("image", image.base64);
    formData.append("key", CONSTANTS.ImageAPIKey);

    try {
    } catch (err) {}
  };

  const submit = async () => {
    clearError();

    // fetch(CONSTANTS.ImageAPIUrl, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(`Response: ${stringify(res)}`);
    //   })
    //   .catch((err) => {
    //     // setError(prev => ({ ...prev, server: err.message }))
    //     console.log(stringify(err));
    //   });

    // const postData = {
    //   name: "Test",
    //   image: image.base64,
    // };

    // console.log(CONSTANTS.ImageAPIUrl);

    // postImage("", postData, CONSTANTS.ImageAPIUrl);
  };

  return {
    submit,
    // loading:,
    // success,
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
