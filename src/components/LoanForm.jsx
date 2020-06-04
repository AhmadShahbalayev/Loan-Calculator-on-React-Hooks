// Libraries: 
import React from 'react';
import { useForm } from 'react-hook-form';

export default props => {

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = values => {
    props.setValues(values);
    props.setVisibility(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="loan-form">
      <div>
        <label htmlFor="amount">Loan amount</label>
        <input type="number" name="amount" id="amount"
          ref={register({
            required: true,
            validate: value => value > 0
          })} />
        {errors.amount && <p>This field must be a positive number</p>}
      </div>
      <div>
        <label htmlFor="time">Loan term in months</label>
        <input type="number" name="time" id="time"
          ref={register({
            required: true,
            validate: value => value > 0
          })} />
        {errors.time && <p>This field must be a positive number</p>}
      </div>
      <div>
        <label htmlFor="rate">Interest rate per year</label>
        <input type="number" name="rate" id="rate"
          ref={register({
            required: true,
            validate: value => value > 0
          })} />
        {errors.rate && <p>This field must be a positive number</p>}
      </div>
      <button type="submit">Calculate</button>
    </form>
  )
}