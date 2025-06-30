import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
    uri: 'https://graphql.anilist.co'
});

export function createApolloClient() {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'network-only',
            },
            watchQuery: { 
                fetchPolicy: 'network-only',
            },
        },
    });
}