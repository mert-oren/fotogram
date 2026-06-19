import { useAddPost } from '@/hooks/useAddPost';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function AddPostScreen() {
  const [imageUri, setImageUri] = useState('');
  const [caption, setCaption] = useState('');
  const addPost = useAddPost();

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled) {
      return;
    }

    const selectedUri = result.assets[0]?.uri;

    if (selectedUri) {
      setImageUri(selectedUri);
    }
  };

  const handleSharePost = async () => {
    if (!imageUri) {
      Alert.alert('Resim seçilmedi', 'Paylaşmak için bir resim seçin.');
      return;
    }

    if (!caption.trim()) {
      Alert.alert('Açıklama eksik', 'Gönderi açıklaması yazın.');
      return;
    }

    try {
      await addPost.mutateAsync({
        uri: imageUri,
        caption,
      });

      setImageUri('');
      setCaption('');
      router.replace('/(tabs)/feed');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gönderi paylaşılırken hata oluştu.';
      Alert.alert('Paylaşım başarısız', message);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-neutral-100"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="flex-grow gap-5 p-4">
        <TouchableOpacity
          className="aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-neutral-300 bg-white"
          onPress={handleSelectImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} className="h-full w-full" />
          ) : (
            <Text className="text-lg font-bold text-neutral-600">Resim Seç</Text>
          )}
        </TouchableOpacity>

        <TextInput
          className="min-h-28 rounded-2xl border border-neutral-300 bg-white p-4 text-base"
          placeholder="Açıklama"
          value={caption}
          onChangeText={setCaption}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity
          className={`h-14 items-center justify-center rounded-2xl bg-neutral-950 ${
            addPost.isPending ? 'opacity-70' : ''
          }`}
          onPress={handleSharePost}
          disabled={addPost.isPending}>
          {addPost.isPending ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-base font-bold text-white">Paylaş</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
