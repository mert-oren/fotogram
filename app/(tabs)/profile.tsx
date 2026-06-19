import { useAuth } from '@/context/AuthContext';
import { Post, formatPostDate, useUserPosts } from '@/hooks/usePosts';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { data: userPosts = [], isPending, error } = useUserPosts(user?.uid);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Çıkış yapılırken hata oluştu.';
      Alert.alert('Çıkış başarısız', message);
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View className="flex-row overflow-hidden rounded-2xl bg-white">
      <Image source={{ uri: item.imageUrl }} className="h-24 w-24 bg-neutral-200" />

      <View className="flex-1 justify-center gap-2 p-3">
        <Text className="text-base font-semibold text-neutral-950">{item.caption}</Text>
        <Text className="text-sm text-neutral-500">{formatPostDate(item.createdAt)}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-neutral-100 p-4">
      <View className="gap-3 rounded-2xl bg-white p-5">
        <Text className="text-sm text-neutral-500">Giriş yapan kullanıcı</Text>
        <Text className="text-lg font-extrabold text-neutral-950">{user?.email}</Text>

        <TouchableOpacity
          className="mt-2 h-12 items-center justify-center rounded-xl bg-neutral-950"
          onPress={handleLogout}>
          <Text className="text-base font-bold text-white">Çıkış Yap</Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-3 mt-6 text-xl font-extrabold text-neutral-950">Benim gönderilerim</Text>

      {isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base font-semibold text-red-700">
            {error instanceof Error ? error.message : 'Gönderiler yüklenemedi.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerClassName={
            userPosts.length === 0 ? 'flex-grow items-center justify-center' : 'gap-3 pb-6'
          }
          ListEmptyComponent={
            <Text className="text-center text-base text-neutral-500">
              Henüz gönderi paylaşmadın.
            </Text>
          }
        />
      )}
    </View>
  );
}
