import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useTheme, { ThemeProvider } from '../hooks/useTheme'

export default function RootLayout() {
    return (
      <ThemeProvider>
        <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="[id]" />
          <Stack.Screen name="review" />
        </Stack>
      </SafeAreaProvider>
      </ThemeProvider>
  );
}
