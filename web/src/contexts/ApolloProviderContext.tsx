import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

const ApolloProviderContext: React.FC = ({ children }) => {
  const localHostApiUrl = 'http://localhost:9001/graphql'
  const httpLink = createHttpLink({
    uri: localHostApiUrl,
  })

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloProviderContext
