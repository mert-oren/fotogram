import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Eksik bilgi', 'Email ve şifre alanlarını doldurun.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Şifre kısa', 'Şifre en az 6 karakter olmalı.');
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/(tabs)/profile');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Kayıt olurken hata oluştu.';
      Alert.alert('Kayıt başarısız', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center bg-neutral-100 px-6"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View className="gap-4 rounded-2xl bg-white p-6">
        <Text className="text-center text-3xl font-extrabold text-neutral-950">Kayıt Ol</Text>

        <Text className="mb-4 text-center text-base text-neutral-500">Yeni hesabını oluştur.</Text>

        <TextInput
          className="h-12 rounded-xl border border-neutral-300 bg-white px-4 text-base"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          className="h-12 rounded-xl border border-neutral-300 bg-white px-4 text-base"
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className={`h-12 items-center justify-center rounded-xl bg-neutral-950 ${
            loading ? 'opacity-70' : ''
          }`}
          onPress={handleSignup}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-base font-bold text-white">Kayıt Ol</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
