import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import SideNav from "../components/side-nav";
import Header from "../layout/page-header";
import "../styles/index.scss";
import styles from "./styles.module.scss";
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
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <div className={styles.pageWrapper}>
          {router.pathname.startsWith("/manager") && <SideNav />}
          <div className={styles.mainWrapper}>
            <Header />
            <div className={styles.pageContent}>
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
