import { LicenseManager } from "ag-grid-enterprise";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";
import "react-toastify/dist/ReactToastify.css";
import "@/components/AgGrid/AgGrid.scss";
import "@/public/tw-compiled.css"; // keep import here to enable css changes to take effect by fast-refresh

LicenseManager.setLicenseKey(
  "Moreland_Connect_LLC_MultiApp_2Devs_1Deployment_3_July_2020__MTU5MzczMDgwMDAwMA==dd56b2ef7ce988a0ba9542f61bfeb74b"
);

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        revalidateOnFocus: false,
      }}
    >
      <SessionProvider session={session}>
        <div className="app-wrapper">
          <Component {...pageProps} />

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </SessionProvider>
    </SWRConfig>
  );
}
export default App;
