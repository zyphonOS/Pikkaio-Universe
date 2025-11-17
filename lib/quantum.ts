// lib/quantum.ts
// The base substrate of Pikkaio reality

export interface Quanta {
  id: string;
  state: 'active' | 'locked' | 'flowing';
  entanglement: Set<string>; // Links to other quanta IDs
}

export class QuantumPixel {
  public quanta: Quanta[];
  public centralTunnel: Quanta[];

  constructor() {
    // Create 12 quanta
    this.quanta = Array.from({ length: 12 }, (_, i) => ({
      id: `quanta_${i}`,
      state: 'active',
      entanglement: new Set()
    }));

    // Establish cubic lattice (8 quanta) and central tunnel (4 quanta)
    this.centralTunnel = this.quanta.slice(8);
    const cubicLattice = this.quanta.slice(0, 8);

    // Entangle all quanta with each other
    this.establishTotalEntanglement();
  }

  private establishTotalEntanglement() {
    // Each quanta linked to every other quanta
    this.quanta.forEach(quanta => {
      this.quanta.forEach(otherQuanta => {
        if (quanta.id !== otherQuanta.id) {
          quanta.entanglement.add(otherQuanta.id);
        }
      });
    });
  }

  // Observer interaction method
  observeAndCreate(observerId: string, intent: string): QuantumPixel {
    console.log(`Observer ${observerId} manifesting: ${intent}`);
    // In future: Actually modify quantum states based on observation
    return this;
  }
}

// Recursive hexagonal packing system
export class RealityAssembler {
  static packPixels(pixels: QuantumPixel[]): QuantumPixel[][] {
    // Simple FCFS hexagonal packing simulation
    const hexGrid: QuantumPixel[][] = [];
    let row = 0;
    let col = 0;

    pixels.forEach(pixel => {
      if (!hexGrid[row]) hexGrid[row] = [];
      hexGrid[row][col] = pixel;
      
      // Hexagonal offset pattern
      col += row % 2 === 0 ? 1 : 1;
      if (col >= 6) { // Arbitrary row width for demo
        col = 0;
        row++;
      }
    });

    return hexGrid;
  }
}