// lib/PikkaioRealityEngine.ts
// The core simulation of Pikkaio physics

export interface QuantumState {
  amplitude: number;
  phase: number;
  entanglement: Set<string>; // Links to other quanta
}

export interface IntentSignal {
  raw: string;
  frequency: number; // Signal strength 0-1
  coherence: number; // Signal purity 0-1  
  entropy: number; // Noise level 0-1
}

export class QuBit {
  public state: QuantumState;
  public id: string;

  constructor(id: string) {
    this.id = id;
    this.state = {
      amplitude: 1.0,
      phase: 0,
      entanglement: new Set()
    };
  }

  // Apply intent pressure to this quanta
  applyIntentPressure(pressure: number): void {
    // Intent compresses amplitude, reduces entropy
    this.state.amplitude = Math.min(1, this.state.amplitude + pressure);
    this.state.phase = this.state.phase * (1 - pressure); // Phase locking under pressure
  }
}

export class SilenceGate {
  // Active computational filter - destructive interference of non-essential signal
  applyFilter(signal: IntentSignal): IntentSignal {
    const noiseThreshold = 0.3; // Below this = noise
    const coherenceThreshold = 0.7; // Above this = clean signal
    
    if (signal.frequency < noiseThreshold || signal.coherence < coherenceThreshold) {
      // Destructive interference - signal is filtered out
      return {
        ...signal,
        amplitude: 0,
        frequency: 0
      };
    }

    // Signal passes - harmonics are stripped, core frequency amplified
    return {
      ...signal,
      frequency: Math.min(1, signal.frequency * 1.5), // Amplified
      entropy: Math.max(0, signal.entropy - 0.4) // Noise reduced
    };
  }
}

export class CentralTunnel {
  private compressionStages = 3; // Ingress → Compression → Egress
  
  processSignal(signal: IntentSignal, intentPressure: number): IntentSignal {
    let compressedSignal = signal;
    
    // Three-stage compression
    for (let stage = 0; stage < this.compressionStages; stage++) {
      const stagePressure = intentPressure * (stage + 1) / this.compressionStages;
      
      compressedSignal = {
        ...compressedSignal,
        frequency: compressedSignal.frequency * (1 + stagePressure),
        entropy: compressedSignal.entropy * (1 - stagePressure),
        coherence: Math.min(1, compressedSignal.coherence + stagePressure * 0.3)
      };
    }
    
    return compressedSignal;
  }
}

export class QuantumPixel {
  public quanta: QuBit[];
  public centralTunnel: CentralTunnel;
  public silenceGate: SilenceGate;

  constructor() {
    // Create 12 quanta - 8 for lattice, 4 for central tunnel
    this.quanta = Array.from({ length: 12 }, (_, i) => new QuBit(`quanta_${i}`));
    this.centralTunnel = new CentralTunnel();
    this.silenceGate = new SilenceGate();
    
    this.establishCompleteEntanglement();
  }

  private establishCompleteEntanglement(): void {
    // Each quanta linked to every other quanta - total connectivity
    this.quanta.forEach(quanta => {
      this.quanta.forEach(otherQuanta => {
        if (quanta.id !== otherQuanta.id) {
          quanta.state.entanglement.add(otherQuanta.id);
        }
      });
    });
  }

  // Main reality creation interface
  manifestReality(observerId: string, rawIntent: string, intentPressure: number): boolean {
    console.log(`🧠 Observer ${observerId} manifesting: "${rawIntent}"`);
    
    // Create intent signal
    const intentSignal: IntentSignal = {
      raw: rawIntent,
      frequency: this.calculateIntentFrequency(rawIntent),
      coherence: this.calculateIntentCoherence(rawIntent),
      entropy: this.calculateIntentEntropy(rawIntent)
    };

    // Apply Silence Gate
    const filteredSignal = this.silenceGate.applyFilter(intentSignal);
    
    if (filteredSignal.frequency === 0) {
      console.log(`🔇 Signal filtered out by Silence Gate`);
      return false; // Intent was too noisy
    }

    // Compress through central tunnel
    const compressedSignal = this.centralTunnel.processSignal(filteredSignal, intentPressure);

    // Apply to quantum states
    this.quanta.forEach(quanta => {
      quanta.applyIntentPressure(intentPressure * compressedSignal.frequency);
    });

    console.log(`✅ Reality manifested with coherence: ${compressedSignal.coherence.toFixed(2)}`);
    return true;
  }

  private calculateIntentFrequency(intent: string): number {
    // Simple heuristic: intent clarity = frequency
    const wordCount = intent.split(' ').length;
    const hasActionVerbs = /build|create|make|design|form/i.test(intent);
    const hasConcreteNouns = /system|engine|tool|interface|artifact/i.test(intent);
    
    let frequency = 0.5; // Base frequency
    
    if (wordCount >= 3 && wordCount <= 12) frequency += 0.2;
    if (hasActionVerbs) frequency += 0.2;
    if (hasConcreteNouns) frequency += 0.1;
    
    return Math.min(1, frequency);
  }

  private calculateIntentCoherence(intent: string): number {
    // Measures how focused and non-contradictory the intent is
    const contradictions = intent.match(/but|however|although|except/gi);
    const focusIndicators = intent.match(/will|shall|must|definitely/gi);
    
    let coherence = 0.6; // Base coherence
    
    if (contradictions) coherence -= contradictions.length * 0.1;
    if (focusIndicators) coherence += focusIndicators.length * 0.05;
    
    return Math.max(0, Math.min(1, coherence));
  }

  private calculateIntentEntropy(intent: string): number {
    // Measures noise level in the intent
    const vagueWords = intent.match(/maybe|perhaps|possibly|kind of|sort of/gi);
    const specificWords = intent.match(/exactly|precisely|specifically|clearly/gi);
    
    let entropy = 0.4; // Base entropy
    
    if (vagueWords) entropy += vagueWords.length * 0.1;
    if (specificWords) entropy -= specificWords.length * 0.05;
    
    return Math.max(0, Math.min(1, entropy));
  }

  // Get current reality stability metric
  getRealityStability(): number {
    const averageAmplitude = this.quanta.reduce((sum, q) => sum + q.state.amplitude, 0) / 12;
    const phaseCoherence = 1 - (this.quanta.reduce((sum, q) => sum + Math.abs(q.state.phase), 0) / 12);
    
    return (averageAmplitude + phaseCoherence) / 2;
  }
}

export class RealityAssembler {
  static packPixels(pixels: QuantumPixel[]): { grid: (QuantumPixel | null)[][], efficiency: number } {
    // FCFS hexagonal packing with dimensional reduction
    const hexGrid: (QuantumPixel | null)[][] = [];
    let placedCount = 0;
    
    // Hexagonal coordinates
    for (let row = 0; row < 6 && placedCount < pixels.length; row++) {
      hexGrid[row] = [];
      const cols = row % 2 === 0 ? 5 : 4; // Hexagonal offset
      
      for (let col = 0; col < cols && placedCount < pixels.length; col++) {
        hexGrid[row][col] = pixels[placedCount];
        placedCount++;
      }
    }
    
    // Calculate packing efficiency
    const totalCells = hexGrid.reduce((sum, row) => sum + row.length, 0);
    const efficiency = placedCount / totalCells;
    
    return { grid: hexGrid, efficiency };
  }

  // Dimensional reduction - prevents infinite recursion
  static reduceDimensionality(pixels: QuantumPixel[]): QuantumPixel[] {
    if (pixels.length <= 12) return pixels; // Base case - single quantum pixel
    
    // Collapse by averaging quantum states
    const collapsedPixel = new QuantumPixel();
    
    pixels.forEach(pixel => {
      pixel.quanta.forEach((quanta, index) => {
        // Average the pressure across all pixels
        const averageAmplitude = pixels.reduce((sum, p) => sum + p.quanta[index].state.amplitude, 0) / pixels.length;
        collapsedPixel.quanta[index].state.amplitude = averageAmplitude;
      });
    });
    
    return [collapsedPixel]; // Reduced to single pixel
  }
}



// Main export - the complete Pikkaio Reality Engine
export class PikkaioRealityEngine {
  private realityPixels: QuantumPixel[] = [];
  private assembler: RealityAssembler;
  
  constructor() {
    this.assembler = new RealityAssembler();
  }

  // Public interface for observers to create reality
  createNewReality(observerId: string, intent: string, intentPressure: number = 0.7): boolean {
    const newPixel = new QuantumPixel();
    const success = newPixel.manifestReality(observerId, intent, intentPressure);
    
    if (success) {
      this.realityPixels.push(newPixel);
      
      // Apply dimensional reduction if needed
      if (this.realityPixels.length > 24) {
        this.realityPixels = RealityAssembler.reduceDimensionality(this.realityPixels);
      }
    }
    
    return success;
  }

  getCurrentRealityState() {
    const packedReality = RealityAssembler.packPixels(this.realityPixels);
    
    return {
      pixelCount: this.realityPixels.length,
      stability: this.realityPixels.length > 0 
        ? this.realityPixels.reduce((sum, p) => sum + p.getRealityStability(), 0) / this.realityPixels.length
        : 0,
      packingEfficiency: packedReality.efficiency,
      grid: packedReality.grid
    };
  }

  // Get raw access to quantum states for visualization
  getQuantumStates() {
    return this.realityPixels.flatMap(pixel => 
      pixel.quanta.map(quanta => ({
        id: quanta.id,
        amplitude: quanta.state.amplitude,
        phase: quanta.state.phase,
        entanglementSize: quanta.state.entanglement.size
      }))
    );
  }
}


