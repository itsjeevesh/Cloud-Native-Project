import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, getUserData, loginUser, logoutUser } from "../api/apiFunctions";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => queryClient.invalidateQueries(["user"]),
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Function to log out the user
    mutationFn: logoutUser,
    // On successful logout, invalidate the "user" query
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["userData"]);
    },
  });
};

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });
};
