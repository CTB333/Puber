import useSetHeader from "./useSetHeader";

const useNoHeader = () => {
  // const { setHeader } = useHeader();

  // useEffect(() => {
  //   setHeader({
  //     visible: false,
  //   });
  // }, []);

  useSetHeader({
    visible: false,
  });
};

export default useNoHeader;
