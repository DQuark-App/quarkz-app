import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {APP_IDENTITY} from '../config/identity';
// @ts-ignore
import {APP_MESSAGE} from '@env';
import {TextEncoder} from 'text-encoding';
import * as bs58 from 'bs58';

export const signMessage = async () => {
  return await transact(async wallet => {
    const message = APP_MESSAGE.toString('utf-8') || '';
    const messageBuffer = new TextEncoder().encode(message);
    // Authorize the wallet session.
    const authorizationResult = await wallet.authorize({
      cluster: 'devnet',
      identity: APP_IDENTITY,
    });

    const addresses = authorizationResult.accounts.map(
      account => account.address,
    );

    const pubKey = bs58.encode(Buffer.from(addresses[0], 'base64'));
    // Sign the payload with the provided address from authorization.
    const signature = await wallet.signMessages({
      payloads: [messageBuffer],
      addresses: [addresses[0]],
    });
    // Construct the raw token.
    const rawToken = Buffer.from(
      pubKey + '&&' + Buffer.from(signature[0]).toString('base64'),
      'utf-8',
    ).toString('base64');

    return [rawToken, pubKey, authorizationResult.auth_token];
  });
};
