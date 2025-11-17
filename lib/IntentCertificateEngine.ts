// lib/IntentCertificateEngine.ts
// Economic layer built on quantum physics

export interface IntentCertificate {
  id: string;
  creator: string;
  intent: string;
  stakeAmount: number;
  fundingGoal: number;
  quantumStability: number;
  status: 'proposed' | 'funded' | 'building' | 'completed' | 'failed';
  backers: string[];
  createdAt: number;
  completedAt?: number;
  yieldDistributed: number;
}

export class IntentCertificateEngine {
  private certificates: Map<string, IntentCertificate> = new Map();
  private creatorReputation: Map<string, number> = new Map(); // Sovereignty Scores

  createCertificate(creator: string, intent: string, stake: number, goal: number, quantumStability: number): string {
    const certificateId = `ic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const certificate: IntentCertificate = {
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

    this.certificates.set(certificateId, certificate);
    
    // Initial reputation boost for creating
    this.updateReputation(creator, 10);
    
    console.log(`📜 Intent-Certificate created: ${intent}`);
    return certificateId;
  }

  backCertificate(certificateId: string, backer: string, amount: number): boolean {
    const certificate = this.certificates.get(certificateId);
    if (!certificate || certificate.status !== 'proposed') return false;

    certificate.backers.push(backer);
    
    // Check if funding goal reached
    const totalBacked = certificate.backers.length * amount; // Simulated backing
    if (totalBacked >= certificate.fundingGoal) {
      certificate.status = 'funded';
      console.log(`🎯 Certificate funded: ${certificate.intent}`);
    }

    return true;
  }

  completeCertificate(certificateId: string, success: boolean, yieldGenerated: number): void {
    const certificate = this.certificates.get(certificateId);
    if (!certificate) return;

    if (success) {
      certificate.status = 'completed';
      certificate.completedAt = Date.now();
      certificate.yieldDistributed = yieldGenerated;
      
      // Success boosts reputation
      this.updateReputation(certificate.creator, 50);
      console.log(`✅ Certificate completed: ${certificate.intent}`);
      
      // Distribute yield to backers (simplified)
      this.distributeYield(certificate, yieldGenerated);
    } else {
      certificate.status = 'failed';
      
      // Failure reduces reputation
      this.updateReputation(certificate.creator, -20);
      console.log(`❌ Certificate failed: ${certificate.intent}`);
      
      // Slash stake (simplified)
      this.slashStake(certificate);
    }
  }

  private updateReputation(creator: string, change: number): void {
    const currentRep = this.creatorReputation.get(creator) || 50; // Start at 50
    const newRep = Math.max(0, Math.min(100, currentRep + change));
    this.creatorReputation.set(creator, newRep);
    
    console.log(`📊 ${creator} reputation: ${currentRep} → ${newRep}`);
  }

  private distributeYield(certificate: IntentCertificate, yieldAmount: number): void {
    // Simplified yield distribution
    const share = yieldAmount / (certificate.backers.length + 1); // +1 for creator
    console.log(`💰 Distributing yield: ${share} to ${certificate.backers.length + 1} participants`);
  }

  private slashStake(certificate: IntentCertificate): void {
    // Simplified stake slashing
    console.log(`⚡ Slashing stake: ${certificate.stakeAmount} from ${certificate.creator}`);
  }

  getCertificates(): IntentCertificate[] {
    return Array.from(this.certificates.values());
  }

  getCreatorReputation(creator: string): number {
    return this.creatorReputation.get(creator) || 50;
  }
}