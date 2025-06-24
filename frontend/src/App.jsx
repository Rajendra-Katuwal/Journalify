import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { JournalProvider } from './contexts/JournalContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Toast from './components/common/Toast';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <JournalProvider>
          <NotificationProvider>
            <Router>
              <Toast />
              <AppRoutes />
            </Router>
          </NotificationProvider>
        </JournalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;