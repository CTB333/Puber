import { useState } from "react";

const useOpen = (): [boolean, () => void, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  return [
    isOpen,
    () => setIsOpen(true),
    () => setIsOpen(false),
    () => setIsOpen((prev) => !prev),
  ];
};

export default useOpen;
