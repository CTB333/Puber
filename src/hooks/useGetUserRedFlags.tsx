import useGetAllRedFlags from "./useGetAllRedFlags";

const useGetUserRedFlags = (userId: number) => {
  const { flags: allFlags, error, loading } = useGetAllRedFlags();

  const flags = allFlags.filter((flag) => flag.onUser == userId);

  return {
    flags,
    error,
    loading,
  };
};

export default useGetUserRedFlags;
