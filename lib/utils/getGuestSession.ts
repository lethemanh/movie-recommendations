import createGuestSession from "../api/requests/guestSession";

export const getGuestSession = async () => {
  let session;
  try {
    session = localStorage.getItem("guestSession");
    if (session === null) {
      throw new Error("no session in local storage");
    }
  } catch (error) {
    const { guest_session_id } = await createGuestSession();
    session = guest_session_id;
  }
  return session;
};
