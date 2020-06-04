// Libraries: 
import React, { useState } from 'react';

// Components: 
import LoanForm from '../components/LoanForm';
import LoanTable from '../components/LoanTable';

export default () => {

  const [values, setValues] = useState({
    amount: 0,
    time: 0,
    rate: 0,
  });

  const [visibility, setVisibility] = useState(false);

  return (
    <React.Fragment>
      <div className='form-div'>
        <LoanForm setValues={setValues} setVisibility={setVisibility} />
      </div>
      {visibility && <LoanTable values={values} />}
    </React.Fragment>
  )
}