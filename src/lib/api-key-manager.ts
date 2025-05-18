class ApiKeyManager {
  private keys: string[];
  private currentKeyIndex: number = 0;
  private errorCounts: Map<number, number> = new Map();
  
  constructor() {
    // Load keys from environment variables
    this.keys = [
      process.env.GEMINI_API_KEY_1,
      process.env.GEMINI_API_KEY_2,
      // Add more keys as needed
    ].filter(Boolean) as string[];
    
    if (this.keys.length === 0) {
      throw new Error('No API keys configured');
    }
  }
  
  getCurrentKey(): string {
    return this.keys[this.currentKeyIndex];
  }
  
  rotateKey(): string {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
    return this.getCurrentKey();
  }
  
  recordError(keyIndex: number): void {
    const currentCount = this.errorCounts.get(keyIndex) || 0;
    this.errorCounts.set(keyIndex, currentCount + 1);
    
    // Rotate key if error threshold reached
    if (currentCount + 1 >= 5) { // Threshold for errors
      this.rotateKey();
      this.errorCounts.set(keyIndex, 0);
    }
  }
}

// Singleton instance
export const apiKeyManager = new ApiKeyManager();