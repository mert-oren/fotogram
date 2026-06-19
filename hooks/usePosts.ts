import { db } from '@/firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { Timestamp, collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export type Post = {
  id: string;
  imageUrl: string;
  caption: string;
  userId: string;
  userEmail: string;
  createdAt: Timestamp | null;
};

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    retry: false,
    queryFn: async () => {
      const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(postsQuery);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
    },
  });
}

export function useUserPosts(userId?: string) {
  return useQuery({
    queryKey: ['userPosts', userId],
    enabled: Boolean(userId),
    retry: false,
    queryFn: async () => {
      const postsQuery = query(collection(db, 'posts'), where('userId', '==', userId));
      const snapshot = await getDocs(postsQuery);

      const userPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      return userPosts.sort((firstPost, secondPost) => {
        const firstDate = firstPost.createdAt?.toDate().getTime() ?? 0;
        const secondDate = secondPost.createdAt?.toDate().getTime() ?? 0;

        return secondDate - firstDate;
      });
    },
  });
}

export function formatPostDate(createdAt: Timestamp | null) {
  if (!createdAt) {
    return '';
  }

  return createdAt.toDate().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}