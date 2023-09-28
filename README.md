DQuark is innovative app allows you to generate unique and beautiful art pieces, upload them to the IPFS network, and mint them as NFTs on the Solana blockchain.

Submission to 2023 Solana Hyperdrive Submission by:
Alan Maulana ([Github](https://github.com/cryingraven) , [Linkedin](https://www.linkedin.com/in/crlf/))

What included features in this MVP :
- Generate Art From Prompt
- Folder / Collection And File Management
- Mint Image As NFT
- Offline Mode
- Dark Mode
- Network Switch Mainnet & Devnet
- Google Sign In
- Email Sign In
- Connect Wallet

Techstack :
- WMA from Solana Mobile
- React Native Paper For UI
- React Navigation
- Zustand
- Realm for offline storage
- Firebase for Auth , Push Notification
- PRO Licensed Third AI Service API
- Next.js for API & Landing Page ([Backend](https://github.com/cryingraven/quarkz-web))
- Supabase Web & API Database
- IPFS Storage

User flow
Web 2.0 user :
User Login -> Prompt Art/Upload -> saved to IPFS and local DB -> if user want to mint must connect wallet
Web 3.0 user :
Wallect Connect ->  Prompt Art/Upload -> saved to IPFS and local DB -> Mint Approval -> Minted

Note: User can mint later

Limitation of the MVP:
- For more work load need to upgrade to enterprise license
- Only allow Image. Need More media support
- Android Only

RUN CODE
follow this instruction https://reactnative.dev/docs/environment-setup

Install all dependencies
```
yarn install
```

Run Android
```
yarn android
```
