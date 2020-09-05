import React from "react";
import { Query } from 'react-apollo';
import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;


export const UsersList = () => {

    function ExchangeRates() {
      const { loading, error, data } = useQuery(EXCHANGE_RATES);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
    
      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </div>
      ));
    }


    return (
        <div className="container">
          {ExchangeRates()}
        </div>
    );
};
