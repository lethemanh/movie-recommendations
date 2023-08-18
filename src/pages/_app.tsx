import { NextPage } from 'next';
import { ReactElement, ReactNode, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import LayoutProvider from '../providers/Layout';
import 'styles/globals.css';

const theme = createTheme({});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  if (Component.getLayout !== undefined) {
    return <Component {...pageProps} />;
  }
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <LayoutProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </LayoutProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
