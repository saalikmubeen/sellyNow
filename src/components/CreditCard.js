import React from "react";
import { CreditCardInput } from "react-native-credit-card-input";
import { requestToken } from "../stripe";

export default function CreditCard({ name, onError }) {
    const handleChange = async (form) => {
        const status = Object.values(form.status);
        if (status.includes("incomplete")) {
            return;
        }

        const { cvc, expiry, number } = form.values;
        const [month, year] = expiry.split("/");

        const card = {
            number: number,
            exp_month: month,
            exp_year: year,
            cvc: cvc,
            name: name,
        };

        try {
            const cardData = await requestToken(card);
            console.log(cardData)
        } catch (err) {
            onError();
        }
    };
    return <CreditCardInput onChange={handleChange} />;
}
