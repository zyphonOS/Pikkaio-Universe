// components/RealityCanvas.tsx - CORRECTED VERSION
'use client';

import { useState, useEffect } from 'react';

// ECONOMIC ENGINE - Add this before the Quantum Engine
class IntentCertificateEngine {
  private certificates: any[] = [];
  private creatorReputation: Map<string, number> = new Map();

  createCertificate(creator: string, intent: string, stake: number, goal: number, quantumStability: number): string {
    const certificateId = `ic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const certificate = {
      id: certificateId,
      creator,
      intent,
      stakeAmount: stake,
      fundingGoal: goal,
      quantumStability,
      status: 'proposed',
      backers: [],
      createdAt: Date.now(),
      yieldDistributed: 0
    };

    this.certificates.push(certificate);
    this.updateReputation(creator, 10);
    
    console.log(`📜 Intent-Certificate created: ${intent}`);
    return certificateId;
  }

  private updateReputation(creator: string, change: number): void {
    const currentRep = this.creatorReputation.get(creator) || 50;
    const newRep = Math.max(0, Math.min(100, currentRep + change));
    this.creatorReputation.set(creator, newRep);
  }

  getCertificates(): any[] {
    return this.certificates;
  }

  getCreatorReputation(creator: string): number {
    return this.creatorReputation.get(creator) || 50;
  }
}

// QUANTUM ENGINE - Keep this as is
class IsolatedRealityEngine {
  private realityPixels: any[] = [];
  private quantumStates: Map<string, { amplitude: number; phase: number; entanglement: Set<string> }> = new Map();

  constructor() {
    this.initializeQuantumField();
  }

  private initializeQuantumField() {
    for (let i = 0; i < 12; i++) {
      const quantaId = `quanta_${i}`;
      this.quantumStates.set(quantaId, {
        amplitude: 0.1,
        phase: Math.random() * Math.PI * 2,
        entanglement: new Set()
      });
    }

    this.quantumStates.forEach((quanta, id) => {
      this.quantumStates.forEach((otherQuanta, otherId) => {
        if (id !== otherId) {
          quanta.entanglement.add(otherId);
        }
      });
    });
  }

  private silenceGateFilter(intent: string): { passes: boolean; frequency: number; coherence: number } {
    const noiseIndicators = intent.match(/maybe|perhaps|possibly|kind of|sort of/gi) || [];
    const focusIndicators = intent.match(/build|create|make|design|form|engine|system/gi) || [];
    
    const noiseLevel = noiseIndicators.length * 0.2;
    const focusLevel = focusIndicators.length * 0.15;
    const lengthPenalty = intent.length < 10 ? 0.3 : intent.length > 100 ? 0.2 : 0;
    
    const frequency = 0.5 + focusLevel - noiseLevel - lengthPenalty;
    const coherence = 0.6 - (noiseLevel * 0.3) + (focusLevel * 0.2);
    
    return {
      passes: frequency > 0.3 && coherence > 0.4,
      frequency: Math.max(0, Math.min(1, frequency)),
      coherence: Math.max(0, Math.min(1, coherence))
    };
  }

  private centralTunnelCompression(signal: any, intentPressure: number) {
    let compressed = { ...signal };
    
    compressed.frequency *= 1.2;
    compressed.entropy *= 0.8;
    
    compressed.frequency *= (1 + intentPressure * 0.3);
    compressed.coherence *= (1 + intentPressure * 0.2);
    compressed.entropy *= (1 - intentPressure * 0.4);
    
    compressed.frequency = Math.min(1, compressed.frequency);
    compressed.coherence = Math.min(1, compressed.coherence);
    compressed.entropy = Math.max(0, compressed.entropy);
    
    return compressed;
  }

  private applyToQuantumStates(intentPressure: number, signalStrength: number) {
    this.quantumStates.forEach((quanta, id) => {
      const pressureEffect = intentPressure * signalStrength;
      quanta.amplitude = Math.min(1, quanta.amplitude + pressureEffect * 0.3);
      quanta.phase = (quanta.phase + pressureEffect * 0.1) % (Math.PI * 2);
    });
  }

  createNewReality(observerId: string, intent: string, pressure: number = 0.7): boolean {
    console.log("🧠 QUANTUM ENGINE: Processing intent:", intent);
    
    const filterResult = this.silenceGateFilter(intent);
    if (!filterResult.passes) {
      console.log("🔇 QUANTUM ENGINE: Filtered by Silence Gate");
      return false;
    }

    const signal = {
      frequency: filterResult.frequency,
      coherence: filterResult.coherence,
      entropy: 1 - filterResult.coherence
    };
    
    const compressedSignal = this.centralTunnelCompression(signal, pressure);
    console.log("🌀 QUANTUM ENGINE: Signal compressed:", compressedSignal);

    this.applyToQuantumStates(pressure, compressedSignal.frequency);

    const stability = (compressedSignal.coherence + compressedSignal.frequency) / 2;
    this.realityPixels.push({
      intent,
      stability,
      pressure,
      observerId,
      signalMetrics: compressedSignal,
      timestamp: Date.now(),
      quantumStates: Array.from(this.quantumStates.entries()).map(([id, state]) => ({
        id,
        amplitude: state.amplitude,
        phase: state.phase,
        entanglementSize: state.entanglement.size
      }))
    });

    console.log("✅ QUANTUM ENGINE: Reality manifested with quantum states!");
    return true;
  }

  getCurrentRealityState() {
    const grid = [];
    let currentRow = [];
    
    this.realityPixels.forEach((pixel, index) => {
      currentRow.push(pixel);
      const rowLength = grid.length % 2 === 0 ? 5 : 4;
      if (currentRow.length >= rowLength) {
        grid.push([...currentRow]);
        currentRow = [];
      }
    });
    if (currentRow.length > 0) grid.push(currentRow);

    return {
      pixelCount: this.realityPixels.length,
      stability: this.realityPixels.length > 0 
        ? this.realityPixels.reduce((sum, p) => sum + p.stability, 0) / this.realityPixels.length
        : 0,
      packingEfficiency: 0.8 + (Math.random() * 0.2),
      grid,
      quantumField: Array.from(this.quantumStates.entries()).slice(0, 6)
    };
  }

  getQuantumStates() {
    return Array.from(this.quantumStates.entries()).map(([id, state]) => ({
      id,
      amplitude: state.amplitude,
      phase: state.phase,
      entanglementSize: state.entanglement.size
    }));
  }
}

// Enhanced Hexagon Component
const Hexagon = ({ pixel, index, onClick }: any) => {
  const stability = pixel ? pixel.stability : 0;
  const quantumActivity = pixel ? pixel.quantumStates.filter((q: any) => q.amplitude > 0.2).length : 0;

  return (
    <div 
      className="w-16 h-16 bg-gray-800 border-2 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all"
      onClick={onClick}
      style={{
        opacity: pixel ? 0.4 + (stability * 0.6) : 0.2,
        borderColor: pixel ? `rgba(100, 255, 100, ${0.2 + stability * 0.8})` : '#4B5563',
        background: pixel ? `radial-gradient(circle, rgba(100, 255, 100, ${0.1 + stability * 0.2}), transparent)` : ''
      }}
    >
      {pixel ? (
        <div className="text-center">
          <div className="text-white text-xs font-mono">S:{stability.toFixed(1)}</div>
          <div className="text-green-400 text-[10px]">Q:{quantumActivity}</div>
          <div className="text-blue-400 text-[8px]">C:{pixel.signalMetrics.coherence.toFixed(1)}</div>
        </div>
      ) : (
        <div className="text-gray-500 text-xs">EMPTY</div>
      )}
    </div>
  );
};

export default function RealityCanvas() {
  const [engine] = useState(() => new IsolatedRealityEngine());
  const [certificateEngine] = useState(() => new IntentCertificateEngine());
  const [realityState, setRealityState] = useState(() => engine.getCurrentRealityState());
  const [certificates, setCertificates] = useState<any[]>([]);
  const [intentInput, setIntentInput] = useState('');
  const [message, setMessage] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log("🚀 RealityCanvas mounted - Engine ready");
    setIsInitialized(true);
  }, []);

  const createIntentCertificate = (intent: string, stability: number) => {
    const creatorId = 'creator_' + Math.random().toString(36).substr(2, 9);
    const stake = Math.floor(stability * 100);
    const goal = stake * 5;
    
    const certificateId = certificateEngine.createCertificate(
      creatorId, 
      intent, 
      stake, 
      goal, 
      stability
    );
    
    setCertificates(certificateEngine.getCertificates());
    return certificateId;
  };

  const manifestReality = () => {
    if (!intentInput.trim()) return;
    
    console.log("🎯 Attempting manifestation:", intentInput);
    
    const observerId = 'user_' + Math.random().toString(36).substr(2, 9);
    const success = engine.createNewReality(observerId, intentInput, 0.7);
    
    if (success) {
      const newState = engine.getCurrentRealityState();
      console.log("✅ New reality state:", newState);
      setRealityState(newState);
      
      // Create Intent-Certificate for successful manifestations
      createIntentCertificate(intentInput, newState.stability);
      
      setMessage(`✅ Reality manifested! Certificate created with stability ${newState.stability.toFixed(2)}`);
      setIntentInput('');
    } else {
      setMessage('🔇 Intent filtered by Silence Gate - try "build quantum interface"');
    }
  };

  if (!isInitialized) {
    return <div className="p-8 text-white">Initializing Reality Engine...</div>;
  }

  const flatGrid = realityState.grid.flat();
  const displayGrid = [];
  for (let i = 0; i < 12; i++) {
    displayGrid.push(flatGrid[i] || null);
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Reality Forge v3</h2>
        <p className="text-gray-400 mb-8">Quantum Engine + Economic Layer</p>
        
        {/* Hexagonal Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8 p-6 bg-gray-900 rounded-lg">
          {displayGrid.map((pixel, index) => (
            <Hexagon 
              key={index}
              pixel={pixel}
              index={index}
              onClick={() => console.log("Pixel clicked:", pixel)}
            />
          ))}
        </div>

        {/* Creation Interface */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-white">Manifest Reality</h3>
          
          <div className="mb-4">
            <input
              type="text"
              value={intentInput}
              onChange={(e) => setIntentInput(e.target.value)}
              placeholder='Try: "build quantum interface" or "create reality engine"'
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && manifestReality()}
            />
          </div>

          <button
            onClick={manifestReality}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition"
          >
            Manifest Reality
          </button>

          {message && (
            <div className={`mt-4 p-3 rounded ${
              message.includes('✅') ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
            }`}>
              {message}
            </div>
          )}

          {/* Status */}
          <div className="mt-6 p-4 bg-black rounded border border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Reality Pixels:</span>
                <span className="text-white ml-2 font-mono">{realityState.pixelCount}</span>
              </div>
              <div>
                <span className="text-gray-400">Stability:</span>
                <span className="text-white ml-2 font-mono">{realityState.stability.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-400">Certificates:</span>
                <span className="text-white ml-2 font-mono">{certificates.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Intent-Certificates Display */}
        <div className="mt-8 bg-purple-900/20 rounded-lg border border-purple-800 p-6">
          <h3 className="text-xl font-bold mb-4 text-white">Intent-Certificates</h3>
  
          {certificates.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No certificates yet. Manifest reality to create one.</p>
          ) : (
            <div className="space-y-4">
              {certificates.slice(0, 3).map((cert: any) => (
                <div key={cert.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-white font-medium">{cert.intent}</div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      cert.status === 'completed' ? 'bg-green-900 text-green-300' :
                      cert.status === 'failed' ? 'bg-red-900 text-red-300' :
                      'bg-blue-900 text-blue-300'
                    }`}>
                      {cert.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-300">
                    <div>Stability: {cert.quantumStability.toFixed(2)}</div>
                    <div>Stake: {cert.stakeAmount}</div>
                    <div>Backers: {cert.backers.length}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Test Instructions */}
        <div className="mt-8 bg-blue-900/20 rounded-lg p-4 border border-blue-800">
          <h4 className="text-blue-300 font-bold mb-2">Test These Intents:</h4>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>✅ "build quantum interface" - Should work + create certificate</li>
            <li>✅ "create reality engine" - Should work + create certificate</li>
            <li>❌ "maybe build something" - Will be filtered</li>
            <li>❌ "hi" - Too short, will be filtered</li>
          </ul>
        </div>
      </div>
    </div>
  );
}