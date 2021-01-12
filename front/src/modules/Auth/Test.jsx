import React from 'react';
import DisplayData from 'components/organisms/DisplayData';

const TestPage = () => {
  const errorMsg = () => (
    <>
      <h1>Brak trener</h1>
      <p>Poczekaj na przypisanie</p>
    </>
  );

  return (
    <>
      <DisplayData dataType="TrainerClients" id="o2t1" errorComponent={errorMsg} />
    </>
  );
};

export default TestPage;
