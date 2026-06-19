import { Post, formatPostDate, usePosts } from '@/hooks/usePosts';
import { router } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';

export default function FeedScreen() {
  const { data: posts = [], isPending, isRefetching, refetch, error } = usePosts();

  const renderPost = ({ item }: { item: Post }) => (
    <View className="w-full max-w-[420px] self-center overflow-hidden rounded-2xl bg-white">
      <View className="gap-1 p-4">
        <Text className="text-base font-bold text-neutral-950">{item.userEmail}</Text>
        <Text className="text-sm text-neutral-500">{formatPostDate(item.createdAt)}</Text>
      </View>

      <Image
        source={{ uri: item.imageUrl }}
        className="h-[420px] w-full bg-neutral-200"
        resizeMode="cover"
      />

      <View className="p-4">
        <Text className="text-base leading-6 text-neutral-950">{item.caption}</Text>
      </View>
    </View>
  );

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-100">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    const message = error instanceof Error ? error.message : 'Gönderiler yüklenemedi.';

    return (
      <View className="flex-1 items-center justify-center bg-neutral-100 p-6">
        <Text className="text-center text-base font-semibold text-red-700">{message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-100">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerClassName={
          posts.length === 0
            ? 'flex-grow items-center justify-center p-4'
            : 'items-center gap-4 p-4'
        }
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        ListEmptyComponent={<Text className="text-base text-neutral-500">Henüz gönderi yok.</Text>}
      />

      <Pressable
        className="absolute bottom-6 right-5 h-14 w-14 items-center justify-center rounded-full bg-neutral-950"
        onPress={() => router.push('/(tabs)/add')}>
        <Text className="-mt-1 text-4xl font-medium text-white">+</Text>
      </Pressable>
    </View>
  );
}
