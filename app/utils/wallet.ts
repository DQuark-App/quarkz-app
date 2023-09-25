import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {APP_IDENTITY} from '../config/identity';
// @ts-ignore
import {APP_MESSAGE} from '@env';
import {TextEncoder} from 'text-encoding';
import * as bs58 from 'bs58';
import {
  IdentitySigner,
  Metaplex,
  MetaplexPlugin,
} from '@metaplex-foundation/js';
import {Connection, PublicKey, Transaction} from '@solana/web3.js';
export const signMessage = async (network: string = 'devnet') => {
  return await transact(async wallet => {
    const message = APP_MESSAGE.toString('utf-8') || '';
    const messageBuffer = new TextEncoder().encode(message);
    // Authorize the wallet session.
    const authorizationResult = await wallet.authorize({
      cluster: network === 'devnet' ? 'devnet' : 'mainnet-beta',
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

export const mintNFT = async (
  uri: string,
  name: string,
  walletAuth: string | null,
  walletPubKey: string | null,
  network: string = 'devnet',
) => {
  const cluster = network === 'devnet' ? 'devnet' : 'mainnet-beta';
  const mwaIdentitySigner: IdentitySigner = {
    publicKey: new PublicKey(walletPubKey || ''),
    signMessage: async (message: Uint8Array): Promise<Uint8Array> => {
      return await transact(async (wallet: Web3MobileWallet) => {
        await wallet.authorize({
          cluster,
          identity: APP_IDENTITY,
        });

        const signedMessages = await wallet.signMessages({
          addresses: [walletPubKey || ''],
          payloads: [message],
        });

        return signedMessages[0];
      });
    },
    signTransaction: async (transaction: Transaction): Promise<Transaction> => {
      return await transact(async (wallet: Web3MobileWallet) => {
        await wallet.authorize({
          cluster,
          identity: APP_IDENTITY,
        });

        const signedTransactions = await wallet.signTransactions({
          transactions: [transaction],
        });

        return signedTransactions[0];
      });
    },
    signAllTransactions: async (
      transactions: Transaction[],
    ): Promise<Transaction[]> => {
      return await transact(async (wallet: Web3MobileWallet) => {
        await wallet.authorize({
          cluster,
          identity: APP_IDENTITY,
        });

        const signedTransactions = await wallet.signTransactions({
          transactions: transactions,
        });
        return signedTransactions;
      });
    },
  };

  const mobileWalletAdapterIdentity = (
    mwaIdentitySigner: IdentitySigner,
  ): MetaplexPlugin => ({
    install(metaplex: Metaplex) {
      metaplex.identity().setDriver(mwaIdentitySigner);
    },
  });

  const METAPLEX = MetaPlexInstance(network).use(
    mobileWalletAdapterIdentity(mwaIdentitySigner),
  );

  const {nft, response} = await METAPLEX.nfts().create(
    {
      uri: uri,
      name: name,
      sellerFeeBasisPoints: 500,
      symbol: 'DQ',
      creators: [
        {
          address: new PublicKey(walletPubKey || ''),
          share: 100,
        },
      ],
      isMutable: false,
    },
    {commitment: 'finalized'},
  );

  return {nft, response};
};

export const MetaPlexInstance = (network: string = 'devnet') => {
  const rpc =
    network === 'devnet'
      ? 'https://api.devnet.solana.com'
      : 'https://api.mainnet-beta.solana.com';

  return Metaplex.make(new Connection(rpc));
};

export const getByCreator = async (
  network: string = 'devnet',
  creator: string,
) => {
  const metaplex = MetaPlexInstance(network);

  return await metaplex.nfts().findAllByCreator({
    creator: new PublicKey(creator),
  });
};
