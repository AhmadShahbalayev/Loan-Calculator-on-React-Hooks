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

        // Creating values for UI:
        let uiDebt = parsedDebt.toFixed(2);
        const uiInterestRate = (parsedRate * 100).toFixed(2);
        const uiPayment = payment.toFixed(2); 
        const uiTotalDebt = (payment * parsedTime).toFixed(2);

        // Array to map tbody:
        const tableBody = [];

        for (let i = 0; i < parsedTime; i++) {
            let calculatedInterest = 0;
            let monthlyPrincipal = 0;

            calculatedInterest = (parsedDebt * monthlyRate).toFixed(2);
            monthlyPrincipal = (payment - calculatedInterest).toFixed(2);

            let obj = {
                month: i + 1,
                debt: uiDebt,
                rate: calculatedInterest,
                principal: monthlyPrincipal
            }

            tableBody.push(obj);
            uiDebt -= monthlyPrincipal;
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
                {/* Here will be table body... */}
            </tbody>
        </table>
    )
}