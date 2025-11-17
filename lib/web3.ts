// lib/web3.ts - CORRECT VERSION (NO JSX)
'use client';

import { createConfig, http } from 'wagmi';
import { base, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// Simple MetaMask-only configuration
export const config = createConfig({
  chains: [base, sepolia],
  connectors: [
    injected({
      target: 'metaMask',
    }),
  ],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
    [sepolia.id]: http('https://rpc.sepolia.org'),
  },
});

export const CONTRACT_ADDRESSES = {
  [sepolia.id]: {
    PIKKA_TOKEN: '0x...',
    INTENT_CERTIFICATE: '0x...',
  },
  [base.id]: {
    PIKKA_TOKEN: '0x...', 
    INTENT_CERTIFICATE: '0x...',
  },
} as const;