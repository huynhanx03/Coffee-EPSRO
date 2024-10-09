import Navigation from './navigation/Navigation';
import { NotificationProvider } from './context/NotificationContext/NotificationContext';
import MessageBox from './components/MessageBox/MessageBox';

export default function App() {
  return (
    <NotificationProvider>
      <Navigation />
      <MessageBox />
    </NotificationProvider>
  );
}
