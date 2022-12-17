// Get object keys with types
export const getKeys = Object.keys as <T extends object>(o: T) => Array<keyof T>

export const getEntries = Object.entries as <T extends object, K extends keyof T>(o: T) => Array<[K, T[K]]>
