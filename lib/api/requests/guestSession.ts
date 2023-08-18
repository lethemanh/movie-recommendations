import axiosInstance from "~/lib/utils/axoisInstance";

const createGuestSession = async () => {
  const { data } = await axiosInstance.get("authentication/guest_session/new");
  return data as IGuestSession;
};

export default createGuestSession;
