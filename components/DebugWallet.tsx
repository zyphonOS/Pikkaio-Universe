// components/DebugWallet.tsx
'use client';

import { useAccount, useConnect, useConnectors } from 'wagmi';

export default function DebugWallet() {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const connectors = useConnectors();

  console.log('🔍 DEBUG - Connectors:', connectors);
  console.log('🔍 DEBUG - Connected:', isConnected, address);

  return (
    <div className="bg-red-900/20 p-4 rounded border border-red-800">
      <h4 className="text-red-300 font-bold mb-2">Debug Info:</h4>
      <div className="text-sm text-red-200">
        <div>Connectors found: {connectors.length}</div>
        <div>Connected: {isConnected ? 'Yes' : 'No'}</div>
        <div>Address: {address || 'None'}</div>
        <div className="mt-2">
          {connectors.map((connector, i) => (
            <div key={i}>
              {connector.name} - {connector.ready ? 'Ready' : 'Not Ready'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}