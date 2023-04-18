import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ConfigProvider } from "antd";
import Header from "../layout/page-header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000, // cache for 1 day
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <Header />
        <Component {...pageProps} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default MyApp;