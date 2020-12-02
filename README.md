![NextPay](/docs/nextpay.png)

Your very own LnUrl-Pay server built on NextJS

## What's this?

Deploy this server anywhere, connect to your lightning LND node and you get your own LnUrl-Pay server that others can use to pay you some sats! 🤑

## What is LnUrl?

[LNURL](https://github.com/btcontract/lnurl-rfc) is a protocol that helps you interact with the lightning network without the need to have a back and forth conversation with whoever you want to pay with lightning.

With [LnUrl-Pay](https://github.com/btcontract/lnurl-rfc/blob/master/lnurl-pay.md), scan a QR code, say how much you want to pay and that's it! It's really that simple, no need to ask for an invoice and start copy pasting into your wallet.

## Setup

Deploy this server anywhere, add some environment variables and you are good to go.

**Deploy it for free on [Vercel](https://vercel.com/).**

### Environment Variables

```bash
# -----------
# Server Configs
# -----------
WEB_URL = 'https://yourOwnDomain.com' # Domain where your NextPay server will be available
NAME = 'My NextPay' # Name that will appear in the card header

# -----------
# Value Configs
# -----------
MAX = 1000000 # Maximum amount of satoshis that can be paid
MIN = 1000 # Minimum amount of satoshis that can be paid

# -----------
# LND Configs
# -----------
LND_MACAROON = '02010230043...' # HEX Encoded Invoice Macaroon
LND_URL = 'https://127.0.0.1:8081' # Rest endpoint of your LND node
```

## FAQ

### Which macaroon is needed?

It's recommended that you use a macaroon that only has **creating invoice** permissions. The environment variables are never exposed to the public but better be safe than sorry.

### Does my node need to be reachable from the internet?

Yes, your node must be reachable on the internet so that NextPay can connect to it from wherever it's deployed.

### Do I always have the same LnUrl QR code?

Your QR code will always be the same! Download it, share it, print it, get a tattoo of it (maybe not), and whoever scans it will be able to pay you some sats.

### Can I see an example?

Here you can check out my own [NextPay server](https://nextpay.apotdevin.com/)
