/**
 * Production Safe Storage Utility
 * Prevents DOMException, SecurityError, and QuotaExceededError crashes
 * when localStorage is restricted (e.g., incognito, iframe, cross-origin, disabled cookies).
 */

class SafeStorage {
  private memoryFallback: Map<string, string> = new Map();
  private isLocalStorageAvailable: boolean | null = null;

  private checkAvailability(): boolean {
    if (this.isLocalStorageAvailable !== null) {
      return this.isLocalStorageAvailable;
    }

    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      this.isLocalStorageAvailable = false;
      return false;
    }

    try {
      const testKey = '__astropoornima_storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      this.isLocalStorageAvailable = true;
      return true;
    } catch {
      this.isLocalStorageAvailable = false;
      return false;
    }
  }

  public getItem(key: string): string | null {
    try {
      if (this.checkAvailability()) {
        return window.localStorage.getItem(key);
      }
    } catch (err) {
      console.warn(`safeStorage.getItem error for key "${key}":`, err);
    }
    return this.memoryFallback.get(key) ?? null;
  }

  public setItem(key: string, value: string): boolean {
    try {
      if (this.checkAvailability()) {
        window.localStorage.setItem(key, value);
        return true;
      }
    } catch (err) {
      console.warn(`safeStorage.setItem error for key "${key}":`, err);
    }
    this.memoryFallback.set(key, value);
    return true;
  }

  public removeItem(key: string): boolean {
    try {
      if (this.checkAvailability()) {
        window.localStorage.removeItem(key);
        return true;
      }
    } catch (err) {
      console.warn(`safeStorage.removeItem error for key "${key}":`, err);
    }
    this.memoryFallback.delete(key);
    return true;
  }

  public clear(): void {
    try {
      if (this.checkAvailability()) {
        window.localStorage.clear();
      }
    } catch (err) {
      console.warn('safeStorage.clear error:', err);
    }
    this.memoryFallback.clear();
  }

  public getParsedJSON<T>(
    key: string,
    fallback: T,
    validator?: (data: unknown) => boolean
  ): T {
    try {
      const raw = this.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      if (validator && !validator(parsed)) {
        return fallback;
      }
      return parsed as T;
    } catch (err) {
      console.warn(`safeStorage.getParsedJSON error for key "${key}":`, err);
      return fallback;
    }
  }
}

export const safeStorage = new SafeStorage();
