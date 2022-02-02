import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

import config from '../../../Planfi.Front/config.json';

const ApolloProviderContext: React.FC = ({ children }) => {

  // pipeline change this variables
  // if U wan't to shot into production database - set to true
  const productionUrl = config.apps.PlanfiApi.url;
  const isProduction = config.apps.PlanfiApi.isProduction;
  const localHostApiUrl = 'http://localhost:9001/graphql'
  const httpLink = createHttpLink({
    uri: isProduction ? productionUrl : localHostApiUrl,
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
