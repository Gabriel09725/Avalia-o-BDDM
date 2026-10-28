import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4f46e5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: 'Início - Adivinhação' }} 
      />
      <Stack.Screen 
        name="jogo" 
        options={{ title: 'Adivinhe o Número' }} 
      />
      <Stack.Screen 
        name="ranking" 
        options={{ title: 'Ranking de Jogadores' }} 
      />
    </Stack>
  );
}