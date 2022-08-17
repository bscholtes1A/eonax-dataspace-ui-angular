export interface Asset {
  id: string;
  description: string;
  logoUrl: string;
  responseExample: object;
  monetized: boolean;
  keywords: Array<String>;
}
