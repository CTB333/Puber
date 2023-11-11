import useGetAllParties from "./useGetAllParties";
import useGetAllUsers from "./useGetAllUsers";

const useGetUser = (userId?: number) => {
  const { users, success, usersChange } = useGetAllUsers();

  const user = users.find((user) => user.id == userId);

  return {
    user,
    users,
    usersChange,
    getUser: (uid: number) => users.find((user) => user.id == uid),
  };
};

export default useGetUser;
