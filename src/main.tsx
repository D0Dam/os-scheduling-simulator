import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';
import Toast from './components/common/Toast/Toast.tsx';
import GlobalStyles from './styles/global/index.ts';

createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyles />
    <App />
    <Toast />
  </>
);
