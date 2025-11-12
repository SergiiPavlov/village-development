// Minimal ambient types for react-dom to satisfy TS
declare module 'react-dom' {
  export function createPortal(children: any, container: any): any;
  const _default: any;
  export default _default;
}
