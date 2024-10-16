import 'react-native-gesture-handler'
import Navigation from './navigation/Navigation';
import { NotificationProvider } from './context/NotificationContext/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MessageBox from './components/MessageBox/MessageBox';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NewMessageProvider } from './context/NewMessageContext/NewMessageContext';

const queryClient = new QueryClient()

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <NewMessageProvider>
            <Navigation />
            <MessageBox />
          </NewMessageProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
