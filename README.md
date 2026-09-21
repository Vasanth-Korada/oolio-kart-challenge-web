# Oolio Kart — Web

A minimal React + TypeScript frontend for the
[oolio-kart-challenge](https://github.com/Vasanth-Korada/oolio-kart-challenge)
backend: browse products, build a cart, and check out with an optional
coupon code.

Kept intentionally small and in its own repo — the assignment's focus and
grading criteria are the Go API, not the UI ("feel free to explore React"
is explicitly optional there).

## Running it

Requires the [backend](https://github.com/Vasanth-Korada/oolio-kart-challenge)
running (via `make docker-up` in that repo) on `http://localhost:8080`.

```bash
npm install
cp .env.example .env   # only needed if the backend isn't on the default URL/key
npm run dev
```

Opens on `http://localhost:5173`.

## Configuration

Two environment variables, both optional (see `.env.example`):

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend origin |
| `VITE_API_KEY` | `apitest` | Sent as the `api_key` header on `POST /order` |

## Structure

```
src/
  api/          - typed client + request/response types mirroring the OpenAPI spec
  context/      - cart state (React context, in-memory)
  components/   - ProductList, ProductCard, Cart, OrderConfirmation
```

## Try it

- Add a few items, then use coupon code `HAPPYHRS` or `FIFTYOFF` (valid) vs.
  `SUPER100` (invalid) — these are verified against the backend's real,
  313M-line coupon index, not mocked.
- Errors from the backend (invalid coupon, unknown product, etc.) surface as
  the actual message from its `{code, type, message}` error body.
