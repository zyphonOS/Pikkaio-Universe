// Simple test to verify the engine logic
class SimpleQuanta {
  constructor(id) {
    this.id = id;
    this.amplitude = 1.0;
  }
}

class SimpleEngine {
  constructor() {
    this.quanta = Array.from({ length: 12 }, (_, i) => new SimpleQuanta(i));
    this.realityPixels = [];
  }

  createReality(intent) {
    console.log("🔮 Testing engine with intent:", intent);
    
    // Simple intent analysis
    const hasAction = intent.includes('build') || intent.includes('create');
    const isSpecific = intent.length > 10 && intent.length < 50;
    
    if (hasAction && isSpecific) {
      this.realityPixels.push({
        intent: intent,
        stability: 0.8,
        timestamp: new Date().toISOString()
      });
      console.log("✅ Reality created!");
      return true;
    } else {
      console.log("❌ Intent too weak or noisy");
      return false;
    }
  }

  getState() {
    return {
      pixels: this.realityPixels.length,
      stability: this.realityPixels.length > 0 ? 0.8 : 0
    };
  }
}

// Test it
const engine = new SimpleEngine();
engine.createReality("build a quantum interface");
engine.createReality("maybe something");
console.log("Current state:", engine.getState());