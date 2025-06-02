interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class CacheService {
  private static instance: CacheService;
  private cache: Map<string, CacheItem<any>>;
  private readonly DEFAULT_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  private constructor() {
    this.cache = new Map();
    this.loadFromLocalStorage();
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  private loadFromLocalStorage() {
    try {
      const savedCache = localStorage.getItem('githubCache');
      if (savedCache) {
        const parsedCache = JSON.parse(savedCache);
        Object.entries(parsedCache).forEach(([key, value]: [string, any]) => {
          this.cache.set(key, value);
        });
      }
    } catch (error) {
      console.error('Error loading cache from localStorage:', error);
    }
  }

  private saveToLocalStorage() {
    try {
      const cacheObject = Object.fromEntries(this.cache);
      localStorage.setItem('githubCache', JSON.stringify(cacheObject));
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }

  public async get<T>(key: string, fetchFn: () => Promise<T>, expirationMs: number = this.DEFAULT_EXPIRATION): Promise<T> {
    const cachedItem = this.cache.get(key);
    const now = Date.now();

    if (cachedItem && (now - cachedItem.timestamp) < expirationMs) {
      return cachedItem.data;
    }

    const freshData = await fetchFn();
    this.set(key, freshData);
    return freshData;
  }

  public set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    this.saveToLocalStorage();
  }

  public clear(): void {
    this.cache.clear();
    localStorage.removeItem('githubCache');
  }

  public forceRefresh<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    return fetchFn().then(data => {
      this.set(key, data);
      return data;
    });
  }
}

export default CacheService.getInstance(); 