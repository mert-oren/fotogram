import { auth, db, storage } from '@/firebaseConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

type AddPostInput = {
  uri: string;
  caption: string;
};

export function useAddPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uri, caption }: AddPostInput) => {
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error('Oturum bulunamadı.');
      }

      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}.jpg`);

      await uploadBytes(storageRef, blob);

      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'posts'), {
        imageUrl,
        caption: caption.trim(),
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
}