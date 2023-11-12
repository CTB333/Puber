import useGetAllParties from "./useGetAllParties";
import useGetAllRedFlags from "./useGetAllRedFlags";
import useGetAllUsers from "./useGetAllUsers";

const useGetRedFlag = (redFlagId?: number) => {
  const { flags, loading } = useGetAllRedFlags();

  const redFlag = flags.find((flag) => flag.id == redFlagId);


  return redFlag
  
};

export default useGetRedFlag;
