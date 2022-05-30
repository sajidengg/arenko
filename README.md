This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available validations in each form

1. Active tab:
    - From and To field can't be empty and should be +ve numeric values.
    - Asset drop down can't be empty.
    - Start time should be after the current time.
    - To Time should be after the start time.
    - Maximum submission test:
        - A maximum limit will be placed on the date/times allowed in each submission. From 05:00 to 11:00 local time the Submission Maximum Date is set equal to the end of the current + 4 days. From 11:00 to 05:00 local time the Submission Maximum Date is equal to the end of the current Day + 5 days. (The current day runs from 05:00 to 05:00 local time). If single record within the submission extends beyond the date, display error message: “To Date and Time must before the maximum submission date”.
2. Tomorrow Tab:
    - Asset drop down can't be empty.
    - Verify that the single-sided submission is allowed i.e either offer only or bid only can be submitted.
    - Check that no null values are allowed for offer and Bid value.
    - Offer Price must be greater than Offer Undo.
    - Offer Undo must be greater than Bid Price.
    - Offer Price must be greater then Bid Undo.
    - Offer price and Bid Price should be in greater then equal to -99999 && less than equal to 99999.

