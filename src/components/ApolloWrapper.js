'use client';

import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo-client";
import { useState } from "react";

export default function ApolloWrapper({ children }) {
    const [client] = useState(createApolloClient());

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}