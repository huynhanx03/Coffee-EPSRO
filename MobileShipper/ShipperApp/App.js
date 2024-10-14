import 'react-native-gesture-handler'
import Navigation from './navigation/Navigation';
import { NotificationProvider } from './context/NotificationContext/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MessageBox from './components/MessageBox/MessageBox';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient()

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Navigation />
          <MessageBox />
        </NotificationProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
