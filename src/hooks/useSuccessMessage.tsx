import COLORS from "../colors";
import { usePopUp } from "../providers";

const useSuccessMessage = () => {
  const { setPopUp, flash } = usePopUp();

  const showSuccess = (title: string, subTitle?: string) => {
    setPopUp({
      popUpStyle: {
        backgroundColor: COLORS.accent,
      },
      titleStyle: {},
      subTitleStyle: {},
      title,
      subTitle,
    });

    flash();
  };

  return showSuccess;
};

export default useSuccessMessage;
