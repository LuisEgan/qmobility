import { AppProps } from "next/app";
import Head from "next/head";
import withApollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, {
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-boost";
import { message } from "antd";

import "../src/less/antd.less";
import "../src/scss/index.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IProps extends AppProps {
  apollo: ApolloClient<NormalizedCacheObject>;
}

const setApolloClient = ({ initialState }) =>
  new ApolloClient({
    uri: "https://backend-qmobility.azurewebsites.net/graphql/",
    cache: new InMemoryCache().restore(initialState || {}),
    onError: () => {
      message.error("Network error!");
    },
  });

const App = ({ Component, pageProps, apollo }: IProps) => (
  <ApolloProvider client={apollo}>
    <Head>
      <title>qmobility</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default withApollo(setApolloClient)(App);
