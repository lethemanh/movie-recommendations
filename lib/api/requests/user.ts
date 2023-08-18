import axiosInstance from "~/lib/utils/axoisInstance";

const createRequestToken = async () => {
  const { data } = await axiosInstance.get("authentication/token/new");
  return data as IRequestToken;
};

const createNewSession = async ({
  requestToken,
}: {
  requestToken: string;
}) => {
  const { data } = await axiosInstance.post(
    '/authentication/session/new',
    {
      request_token: requestToken,
    },
  );
  return data as IUserSession;
}

const getUserDetail = async (sessionId: string) => {
  const { data } = await axiosInstance.get('/account', {
    params: {
      session_id: sessionId
    }
  });
  return data as IUserDetail;
}

const deleteSession = async (sessionId: string) => {
  await axiosInstance.delete('authentication/session', {
    data: { session_id: sessionId }
  })
}

export { getUserDetail, createRequestToken, createNewSession, deleteSession};
