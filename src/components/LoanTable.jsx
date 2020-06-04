// Libraries:
import React from 'react';

export default props => {

    const { amount, time, rate } = props.values;

    // Parsing values:
    const parsedDebt = parseFloat(amount);
    const parsedTime = parseFloat(time);
    const parsedRate = parseFloat(rate);

    const amortize = (parsedDebt, parsedTime, parsedRate) => {
        // Calculating payment per month:
        const monthlyRate = parsedRate / 12;
        const payment = parsedDebt * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -parsedTime)));

        // Array to map tbody:
        const tableBody = [];

        for (let i = 0; i < parsedTime; i++) {
            let calculatedInterest = 0;
            let monthlyPrincipal = 0;

            calculatedInterest = +(+parsedDebt * monthlyRate).toFixed(2);
            monthlyPrincipal = (payment - calculatedInterest).toFixed(2);

            let obj = {
                month: i + 1,
                payment: payment.toFixed(2),
                debt: parsedDebt.toFixed(2),
                rate: calculatedInterest,
                principal: monthlyPrincipal
            }

            tableBody.push(obj);
            parsedDebt -= monthlyPrincipal;
        }

        return tableBody;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Payment</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Debt</th>
                </tr>
            </thead>
            <tbody>
                {
                    amortize(parsedDebt, parsedTime, parsedRate).map(row => {
                        return <tr>
                            <td>{row.month}</td>
                            <td>{row.payment}</td>
                            <td>{row.principal}</td>
                            <td>{row.rate}</td>
                            <td>{row.debt}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}