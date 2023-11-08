import { useEffect } from "react";
import { useModal } from "../providers";

const useModalComponent = (
  component: (close: () => void) => React.ReactNode,
  deps: any[]
) => {
  const { open, close, isOpen, setComponent } = useModal();

  useEffect(() => {
    setComponent(component(close));
  }, deps);

  return { open, close, isOpen };
};

export default useModalComponent;
