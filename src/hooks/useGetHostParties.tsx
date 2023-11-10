import useGetAllParties from "./useGetAllParties";

const useGetHostParties = (userId: number) => {
  const { parties } = useGetAllParties();

  const userParties = parties.filter((party) => party.userId == userId);

  return {
    userParties,
  };
};

export default useGetHostParties;
