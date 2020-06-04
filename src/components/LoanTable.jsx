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
        let totalInterest = 0;

        for (let i = 0; i < parsedTime; i++) {
            let interest = 0;
            let monthlyPrincipal = 0;

            interest = +(parsedAmount * monthlyRate);
            monthlyPrincipal = +(payment - interest);
            totalInterest += interest;

            let obj = {
                month: i + 1,
                payment: payment.toFixed(2),
                debt: parsedAmount.toFixed(2),
                rate: interest.toFixed(2),
                totalInterest: totalInterest.toFixed(2),
                principal: monthlyPrincipal.toFixed(2)
            }

            parsedAmount = parsedAmount - monthlyPrincipal;
            tableBody.push(obj);
        }

        return tableBody;
    }

    return (
        <section className="table-section">
            <table className="table">
                <thead>
                    <tr>
                        <th>Month №</th>
                        <th>Payment</th>
                        <th>Principal </th>
                        <th>Interest</th>
                        <th>Total Interest</th>
                        <th>Total Debt</th>
                    </tr>
                </thead>
                <tbody>
                    {amortize(parsedAmount, parsedTime, parsedRate).map(row => {
                        return <tr key={row.month}>
                            <td>{row.month}</td>
                            <td>${row.payment}</td>
                            <td>${row.principal}</td>
                            <td>${row.rate}</td>
                            <td>${row.totalInterest}</td>
                            <td>${row.debt}</td>
                        </tr>
                    })}
                    <tr>
                        <td colSpan={6}>Closing balance: $0</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}