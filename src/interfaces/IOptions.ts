type Rating = 'g' | 'pg' | 'r' | 'x';
type Format = 'xml' | 'qr' | 'json';

export default interface IOptions {
  size?: string; // or s
  default?: string; // or d
  rating?: Rating; // or r,
  forcedefault?: boolean | 'y'; // or f
  format?: Format;
}
