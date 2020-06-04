// Libraries:
import React from 'react';

export default props => {

    const { amount, time, rate } = props.values;

    // Parsing values:
    const parsedAmount = parseFloat(amount);
    const parsedTime = parseInt(time);
    const parsedRate = parseFloat(rate);

    const amortize = (parsedAmount, parsedTime, parsedRate) => {
        // Calculating payment per month:
        const monthlyRate = parsedRate / 1200;
        const payment = parsedAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -parsedTime)));;

        // Array to map tbody:
        const tableBody = [];

        for (let i = 0; i < parsedTime; i++) {
            let interest = 0;
            let monthlyPrincipal = 0;

            interest = +(parsedAmount * monthlyRate);
            monthlyPrincipal = +(payment - interest);

            let obj = {
                month: i + 1,
                payment: payment.toFixed(2),
                debt: parsedAmount.toFixed(2),
                rate: interest.toFixed(2),
                principal: monthlyPrincipal.toFixed(2)
            }

            parsedAmount = parsedAmount - monthlyPrincipal;
            tableBody.push(obj);
        }

        return tableBody;
    }

    return (
        <React.Fragment>
            <ul>
                <li>Loan amount: {parsedAmount.toFixed(2)}</li>
                <li>Interest rate: {(parsedRate).toFixed(2)}%</li>
            </ul>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Monthly Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Debt</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        amortize(parsedAmount, parsedTime, parsedRate).map(row => {
                            return <tr key={row.month}>
                                <td>#{row.month}</td>
                                <td>${row.payment}</td>
                                <td>${row.principal}</td>
                                <td>${row.rate}</td>
                                <td>${row.debt}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </React.Fragment>
    )
}