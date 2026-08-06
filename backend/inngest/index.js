import { Inngest } from "inngest";

const LOW_STOCK_THRESHOLD = 10;

// Create a client to send and receive events
export const inngest = new Inngest({ id: "FreshKart" });

// Create an empty array where we'll export future Inngest functions
export const functions = [];
