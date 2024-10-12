import Navigation from './navigation/Navigation';
import { NotificationProvider } from './context/NotificationContext/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MessageBox from './components/MessageBox/MessageBox';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Navigation />
        <MessageBox />
      </NotificationProvider>
    </QueryClientProvider>
  );
}
