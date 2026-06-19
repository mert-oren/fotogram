import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="profile"
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#111111',
        tabBarInactiveTintColor: '#999999',
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Akış',
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: 'Ekle',
          tabBarIcon: ({ color, size }) => <Feather name="plus-circle" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <Feather name="smile" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
