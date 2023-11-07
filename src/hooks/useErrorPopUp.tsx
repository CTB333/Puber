import COLORS from "../colors";
import { usePopUp } from "../providers";

const useErrorPopUp = () => {
  const { setPopUp, flash } = usePopUp();

  const error = (title?: string, subTitle?: string) => {
    setPopUp({
      popUpStyle: { backgroundColor: "red" },
      titleStyle: { color: COLORS.white },
      subTitleStyle: { color: COLORS.white },
      title,
      subTitle,
    });

    if (!title && !subTitle) return;

    flash();
  };

  return error;
};

export default useErrorPopUp;
