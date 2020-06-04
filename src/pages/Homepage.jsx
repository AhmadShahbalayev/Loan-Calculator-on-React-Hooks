// Libraries: 
import React, {useState} from 'react';

// Components: 
import LoanForm from '../components/LoanForm';
import LoanTable from '../components/LoanTable';

export default () => {

  const [values, setValues] = useState({
    amount: 0,
    time: 0,
    rate: 0
  });

  return (
    <React.Fragment>
      <LoanForm setValues = {setValues}/>
      <LoanTable values = {values}/>
    </React.Fragment>
  )
}