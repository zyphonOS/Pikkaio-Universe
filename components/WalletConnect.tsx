// components/WalletConnect.tsx - SIMPLIFIED VERSION
'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-white">Web3 Identity</h3>
        <div className="text-center py-8">
          <div className="text-gray-400">Loading wallet connectors...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-white">Web3 Identity</h3>
      
      {!isConnected ? (
        <div className="space-y-3">
          <p className="text-gray-400 text-sm">Connect your wallet:</p>
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition"
            >
              Connect {connector.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-green-400 text-sm">✅ Connected</span>
            <button
              onClick={() => disconnect()}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Disconnect
            </button>
          </div>
          
          <div className="bg-black rounded p-3 border border-gray-800">
            <div className="text-xs text-gray-400 mb-1">Account</div>
            <div className="text-white font-mono text-sm truncate">
              {address}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}