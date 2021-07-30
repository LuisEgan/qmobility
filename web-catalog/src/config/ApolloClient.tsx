import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { message } from "antd";

const httpLink = createHttpLink({
  uri: "https://backend-qmobility.azurewebsites.net/graphql/",
});

const authLink = setContext(() => ({
  headers: {},
}));

const onErrorLink = onError((errorHandler) => {
  const { graphQLErrors, networkError } = errorHandler;

  if (graphQLErrors || networkError) {
    message.error("Network error!");
  }
});

const authFlowLink = authLink.concat(onErrorLink);
const link = authFlowLink.concat(httpLink);

const setApolloClient = ({ initialState }) =>
  new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    link,
  });

export default setApolloClient;
