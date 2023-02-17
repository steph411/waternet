import "../styles/globals.css";
import "@styles/quill.imageUploader.css";
import "swiper/swiper.scss";
import { Provider } from "next-auth/client";
import { withUrqlClient } from "next-urql";
import { dedupExchange, fetchExchange } from "@urql/core";
import { subscriptionExchange, Exchange, Operation } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { getSession } from "next-auth/client";
import NextApp from "next/app";
import { simplePagination } from "@urql/exchange-graphcache/extras";
import { devtoolsExchange } from "@urql/devtools";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  GET_POSTS,
  GET_PAGE,
  GET_CONVERSATION_MESSAGES,
  GET_QUESTIONS,
} from "../utils/queries";
import DefaultLayout from "@layouts/DefaultLayout";
import { pipe, mergeMap, fromPromise, fromValue, map } from "wonka";
import Head from 'next/head'

// import ws from 'ws';

// setup async fetchOptions to be able to add token in headers on the server

const isPromise = (value: any) => value && typeof value.then === "function";
export const fetchOptionsExchange = (fn: any): Exchange => ({ forward }) => (
  ops$
) => {
  return pipe(
    ops$,
    mergeMap((operation: Operation) => {
      const result = fn(operation.context.fetchOptions);
      return pipe(
        isPromise(result) ? fromPromise(result) : fromValue(result),
        map((fetchOptions: RequestInit | (() => RequestInit)) => ({
          ...operation,
          context: { ...operation.context, fetchOptions },
        }))
      );
    }),
    forward
  );
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const subscriptionUrl = process.env.NEXT_PUBLIC_SUBSCRIPTION_URL;

const MyApp = ({ Component, pageProps }) => {
  // console.log({pageProps});
  const Layout = Component.Layout || DefaultLayout;

  return (
    <Provider session={pageProps.session}>
      <>
        <Head>
          <title>ewatergate</title>
          <link rel="icon" href="/icon_e2.png" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <div id="app-modal"></div>
      </>
    </Provider>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await NextApp.getInitialProps(ctx);

  return {
    ...appProps,
  };
};

// export default MyApp

export default withUrqlClient(
  (ssrExchange, ctx: any) => {
    console.log({ context: ctx });

    let rawToken;
    const headers = {
      "X-Hasura-Role": "user",
    };

    let exchanges = [
      devtoolsExchange,
      dedupExchange,
      ssrExchange,
      cacheExchange({
        resolvers: {
          Query: {
            posts: simplePagination({
              limitArgument: "limit",
              offsetArgument: "offset",
              mergeMode: "after",
            }),
          },
        },
        updates: {
          Mutation: {
            insert_posts_one: (result, args, cache, info) => {
              const variables = { offset: 0, limit: 10 };
              cache.updateQuery(
                { query: GET_POSTS, variables: variables },
                (data: any) => {
                  if (data) {
                    console.log({ result });
                    data.posts?.unshift(result.insert_posts_one);
                  }
                  return data;
                }
              );
            },

            insert_answers_one: (result, args, cache, info) => {
              cache.updateQuery(
                { query: GET_QUESTIONS, variables: { offset: 0, limit: 20 } },
                (data: any) => {
                  console.log({ data, result, args, info });
                  if (data) {
                    console.log({ data, result });
                  }
                  return data;
                }
              );
            },

            insert_questions_one: (result, args, cache, info) => {
              cache.updateQuery(
                { query: GET_QUESTIONS, variables: { offset: 0, limit: 20 } },
                (data: any) => {
                  console.log({
                    dataupdatequestionsone: data,
                    result,
                    args,
                    cache,
                    info,
                  });
                  return data;
                }
              );
            },

            insert_questions_followers_one: (result, args, cache, info) => {
              cache.updateQuery(
                { query: GET_QUESTIONS, variables: { offset: 0, limit: 20 } },
                (data: any) => {
                  console.log({ data, result, args, info });
                  return data;
                }
              );
            },

            insert_pages_projects_one: (result, args, cache, info) => {
              cache.updateQuery({ query: GET_PAGE }, (data: any) => {
                console.log({ cachedata: data, result, args, cache, info });
                if (data) {
                  data.pages_projects?.unshift(
                    result.insert_pages_projects_one
                  );
                }
                return data;
              });
            },
          },
          Subscription: {
            messages: (result, args, cache, info) => {
              const variables = {
                conversationId: info?.variables?.conversationId,
              };
              cache.updateQuery(
                { query: GET_CONVERSATION_MESSAGES, variables },
                (data: any) => {
                  if (data) {
                    const cleanedMessages = data?.messages.filter((el) => {
                      console.log({ cleaning: el });
                      return el !== undefined;
                    });
                    console.log({ cleanedMessages });
                    console.log({ data, result, args, cache, info });
                    data.messages = cleanedMessages;
                    console.log({
                      data,
                      result,
                      args,
                      cache,
                      info,
                      cleanedMessages: "",
                    });
                    if (result.messages[0]) {
                      const existing = data?.messages.filter(
                        (el) => el.id === result.messages[0].id
                      );
                      console.log({ newsubmessageexisting: existing });
                      if (!existing) {
                        data.messages?.unshift(result.messages[0]);
                      }
                    }
                    return data;
                  }
                  console.log({ data, result, args, cache, info });
                  return null;
                }
              );
            },
          },
        },
      }),
      fetchOptionsExchange(async (fetchOptions: any) => {
        const session = await getSession(ctx);
        console.log({ sessioninsidefetchoptionsexchange: session });
        return Promise.resolve({
          ...fetchOptions,
          headers: {
            Authorization: `Bearer ${session?.rawToken}`,
            "X-Hasura-Role": session?.api["X-Hasura-Role"] || "public",
          },
        });
      }),
      fetchExchange,
    ];

    if (typeof window !== "undefined") {
      const subscriptionClient = new SubscriptionClient(subscriptionUrl, {
        reconnect: true,
        connectionParams: async () => {
          const session = await getSession(ctx);
          console.log({ sessioninsidesub: session });
          return {
            headers: {
              Authorization: `Bearer ${session?.rawToken}`,
              "X-Hasura-Role": "user",
            },
          };
        },
      });
      exchanges.push(
        subscriptionExchange({
          forwardSubscription(operation) {
            return subscriptionClient.request(operation);
          },
        })
      );
    }

    return {
      url: apiUrl,
      exchanges,
    };
  },
  { ssr: true }
)(MyApp);
