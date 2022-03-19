import stripeClient from "stripe-client";

const stripe = stripeClient(
    "pk_test_51H8hlaJw1IphkJ3MAWTSFrRAGHCMouXlpV9U7KBXZDucnorqLqqpaYmcFPlzSD7CRarJTvjkKcukzuKcCoqBOM2x00gncJONo0"
);

export const requestToken = (card) => stripe.createToken({ card });
