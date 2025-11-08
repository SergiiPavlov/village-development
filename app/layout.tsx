import './styles/globals.css';import type {Metadata} from 'next'
export const metadata:Metadata={title:'Zadonetske',description:'Village website skeleton (themes)'}
export default function RootLayout({children}:{children:React.ReactNode}){
  return (<html lang="uk" data-theme="ethno"><body>{children}</body></html>)}
