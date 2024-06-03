import '../src/styles/global.css'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function MyApp({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            <Component {...pageProps} />
        </PrimeReactProvider>
    );
}