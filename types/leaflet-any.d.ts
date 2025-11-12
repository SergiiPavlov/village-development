// Minimal ambient declarations to satisfy TS without external @types
declare module 'leaflet' {
  const L: any;
  export = L;
}
declare module 'leaflet.markercluster';
