import '../global.css';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

const queryClient = new QueryClient();

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-100">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isLoggedIn = Boolean(user);

  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ title: 'Kayıt Ol' }} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}
