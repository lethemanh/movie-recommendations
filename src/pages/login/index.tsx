import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { createNewSession, createRequestToken } from '@API/requests';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

const Login: NextPage<{ requestToken: string; approved: boolean }> = ({
  requestToken,
  approved,
}: {
  requestToken: string;
  approved: boolean;
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const redirectToVerifyPage = async () => {
    try {
      const { request_token } = await createRequestToken();
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:3000/login`;
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (requestToken && approved) {
      try {
        createNewSession({ requestToken }).then(data => {
          if (data) {
            Cookies.set('userToken', JSON.stringify(data));
            router.push('/');
          }
        });
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  }, [requestToken, approved, router, enqueueSnackbar]);

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/6c884f48-f7d8-4a59-9d25-b7c138813aee/5900db94-decb-4941-87d2-a54eaf165ecc/VN-en-20230807-popsignuptwoweeks-perspective_alpha_website_large.jpg')]">
        <div className="h-fit flex flex-col gap-2 bg-black rounded px-28 py-20 bg-opacity-60">
          <p className="text-2xl font-bold text-white text-center">Sign In</p>
          <button
            onClick={redirectToVerifyPage}
            className="h-10 mt-8 rounded text-white bg-red disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!!requestToken && approved}
          >
            Sign In via TMDB
          </button>

          <p className="mt-5 text-white text-center">
            If you dont have account, you can{' '}
            <a
              className="text-blue-500"
              href="https://www.themoviedb.org/signup"
              target="_blank"
              rel="noreferrer"
            >
              Sign up
            </a>{' '}
            via TMDB
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestToken = query?.request_token || '';
  const approved = Boolean(query?.approved) || false;

  return {
    props: {
      requestToken,
      approved,
    },
  };
};
