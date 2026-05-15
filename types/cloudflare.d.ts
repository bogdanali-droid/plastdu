declare interface KVNamespaceListOptions {
  limit?: number;
  prefix?: string | null;
  cursor?: string | null;
}

declare interface KVNamespaceListResult<Metadata> {
  keys: { name: string; expiration?: number; metadata?: Metadata }[];
  list_complete: boolean;
  cursor?: string;
}

declare interface KVNamespace {
  get(key: string): Promise<string | null>;
  get(key: string, type: 'text'): Promise<string | null>;
  get(key: string, type: 'arrayBuffer'): Promise<ArrayBuffer | null>;
  get(key: string, type: 'stream'): Promise<ReadableStream | null>;
  put(
    key: string,
    value: string | ArrayBuffer | ReadableStream,
    options?: { expiration?: number; expirationTtl?: number; metadata?: any }
  ): Promise<void>;
  delete(key: string): Promise<void>;
  list<Metadata = unknown>(options?: KVNamespaceListOptions): Promise<KVNamespaceListResult<Metadata>>;
}

declare interface R2Object {
  arrayBuffer(): Promise<ArrayBuffer>;
  text(): Promise<string>;
  body: ReadableStream;
  httpMetadata?: { contentType?: string };
  key: string;
  size: number;
}

declare interface R2Bucket {
  get(key: string): Promise<R2Object | null>;
  put(
    key: string,
    value: ArrayBuffer | ReadableStream | string | null,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<any>;
  delete(key: string | string[]): Promise<void>;
  list(options?: any): Promise<any>;
}
