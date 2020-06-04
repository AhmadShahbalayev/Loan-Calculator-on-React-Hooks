// Libraries: 
import React from 'react';
import { useForm } from 'react-hook-form';

export default props => {

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = values => props.setValues(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="amount">Initial amount</label>
        <input type="number" name="amount" id="amount"
          ref={register({
            required: true,
            validate: value => value > 0
          })} />
        {errors.amount && <p>This field must be a positive number</p>}
      </div>
      <div>
        <label htmlFor="time">Months</label>
        <input type="number" name="time" id="time"
          ref={register({
            required: true,
            validate: value => value > 0
          })} />
        {errors.time && <p>This field must be a positive number</p>}
      </div>
      <div>
        <label htmlFor="rate">Interest rate</label>
        <input type="number" name="rate" id="rate"
          ref={register({
            required: true,
            validate: value => value > 0
          })} />
        {errors.rate && <p>This field must be a positive number</p>}
      </div>
      <div>
        <button type="submit">Calculate</button>
      </div>
    </form>
  )
}