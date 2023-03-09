import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  createHttpLink
} from "@apollo/client";
import { useMemo } from "react";
import { setContext } from '@apollo/client/link/context';




let apolloClient: ApolloClient<NormalizedCacheObject>;

const graphqlUrl = process.env.NEXT_PUBLIC_API_URL

export function createIsomorphicLink() {
  
  console.log({ httplinkurl: graphqlUrl });
  return createHttpLink({ uri: graphqlUrl});
  
}

function createApolloClient(token) {

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    console.log("inside the function toskfjlaksjfkjflksj!!!!!!!!!!!!!!!!!!")
    console.log({ token });
    const result = {
      headers: { ...headers, "X-Hasura-Role": "user", "Accept": "application/json", "Content-Type": "application/json"}
    } 
    if (token) {
      result.headers["Authorization"] = `Bearer ${token}`
      
    }
    else {
      console.log("we did not have one lfjsjfsjfksjfjsf!!!!!!!!!!!")
    } 
    console.log({result})
    return result
  });
  
  const headers = {
    "X-Hasura-Role": "user"
  }
  if (token) {
    console.log("we have a tokennknskfnslnfksfjlksjf")
    headers["authorization"] = `Bearer ${token}`
  }
  console.log({afternormalobjectheaders: headers})
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    // link: authLink.concat(createHttpLink({uri: graphqlUrl})),
    uri: graphqlUrl,
    cache: new InMemoryCache(),
    headers: { 
      'X-Hasura-Role': 'user',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
}

export function initializeApollo(initialState = null, token="") {
  const _apolloClient = apolloClient ?? createApolloClient(token);

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;
  // apolloClient = apolloClient ?? _apolloClient;
  
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;

  // return _apolloClient;
}

export function useApollo(initialState, token) {
  const store = useMemo(() => initializeApollo(initialState, token), [initialState]);
  return store;
}
