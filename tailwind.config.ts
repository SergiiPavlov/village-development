import type { Config } from 'tailwindcss'
const config: Config = {content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'],
theme:{extend:{borderRadius:{base:'12px',lgx:'16px'}}},plugins:[]}
export default config
