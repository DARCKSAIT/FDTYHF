# EVE Online Fan Site Prototype

This folder contains a small Node.js prototype for an EVE Online community site with in-game subscription support.

## Features
- Generates unique payment codes that players must include in their ISK or PLEX transfers.
- Simple pages for testimonials, economy updates, battle reports, and guild or alliance progress.
- Browser page to request a payment code for subscription.
- Jest tests covering the payment flow and page rendering.

## Scripts
- `npm start` – start the Express server on port 3000.
- `npm test` – run the Jest test suite.

## Future Work
- Connect to the ESI API to check wallet or contract data and mark codes as paid automatically.
- Persist payment codes in a database instead of in-memory storage.
- Add real content management and authentication.
