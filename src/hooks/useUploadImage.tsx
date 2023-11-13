import { useState } from "react";
import CONSTANTS from "../Constants";
import { stringify } from "../utils";

const useUploadImage = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = async (base64: string) => {
    setError(null);

    const formData = new FormData();
    formData.append("image", base64);
    formData.append("key", CONSTANTS.ImageAPIKey);

    try {
      let res = await fetch(CONSTANTS.ImageAPIUrl, {
        method: "POST",
        body: formData,
      });
      let json = await res.json();

      console.log(stringify(json));

      setUrl(json.data.url);
    } catch (err) {
      setError(err as string);
    }
  };

  return {
    url,
    upload,
    error,
  };
};

export default useUploadImage;
