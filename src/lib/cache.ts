/**
 * Cache utility for browser-based storage using localStorage.
 * Provides helper functions for saving, retrieving, and managing cached data.
 */

const CACHE_PREFIX = 'dq-cache-';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry?: number; // TTL in milliseconds
}

const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Saves data to localStorage with the specified key.
 * @param key - The cache key.
 * @param data - The data to store.
 * @param ttl - Time to live in milliseconds.
 */
export const saveToCache = <T>(key: string, data: T, ttl: number = DEFAULT_TTL): void => {
  try {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry: ttl,
    };
    const serializedData = JSON.stringify(item);
    localStorage.setItem(`${CACHE_PREFIX}${key}`, serializedData);
  } catch (error) {
    console.error(`Error saving to cache for key "${key}":`, error);
  }
};

/**
 * Retrieves data from localStorage for the specified key.
 * @param key - The cache key.
 * @returns The parsed data or null if not found, expired, or invalid.
 */
export const getFromCache = <T>(key: string): T | null => {
  try {
    const itemStr = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (itemStr === null) return null;

    const item = JSON.parse(itemStr) as CacheItem<T>;
    
    // Check if item is an old-format item (no timestamp)
    if (!item.timestamp) {
      // If it's old format, return as is or treat as data
      return (item as unknown) as T;
    }

    // Check for expiration
    if (item.expiry && Date.now() - item.timestamp > item.expiry) {
      removeFromCache(key);
      return null;
    }

    return item.data;
  } catch (error) {
    console.error(`Error retrieving from cache for key "${key}":`, error);
    return null;
  }
};

/**
 * Automatically cleans up all expired items from the cache.
 */
export const autoCleanup = (): void => {
  try {
    Object.keys(localStorage).forEach((fullKey) => {
      if (fullKey.startsWith(CACHE_PREFIX)) {
        const key = fullKey.replace(CACHE_PREFIX, '');
        getFromCache(key); // getFromCache already removes if expired
      }
    });
  } catch (error) {
    console.error('Error during automatic cleanup:', error);
  }
};

/**
 * Removes data from localStorage for the specified key.
 * @param key - The cache key.
 */
export const removeFromCache = (key: string): void => {
  try {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  } catch (error) {
    console.error(`Error removing from cache for key "${key}":`, error);
  }
};

/**
 * Clears all data from localStorage that matches the cache prefix.
 */
export const clearCache = (): void => {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Optional: sessionStorage helpers if needed for temporary session data.
 */
export const saveToSession = <T>(key: string, data: T): void => {
  try {
    sessionStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to session for key "${key}":`, error);
  }
};

export const getFromSession = <T>(key: string): T | null => {
  try {
    const item = sessionStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (item === null) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error retrieving from session for key "${key}":`, error);
    return null;
  }
};
