// Mock data — Firestore'a geçmeden önce uygulamayı bununla çalıştırabilirsiniz.
// (Pazar dersindeki Pokemon ile aynı pattern: önce mock, sonra Firestore.)

export type Post = {
  id: string;
  imageUrl: string;
  caption: string;
  userId: string;
  userEmail: string;
  // Mock'ta string; Firestore'da Timestamp olacak
  createdAt: string;
};

export const posts: Post[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/id/1018/600/600',
    caption: 'Dağ manzarası 🏔️',
    userId: 'user-a',
    userEmail: 'ayse@example.com',
    createdAt: '2026-06-14',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/id/1025/600/600',
    caption: 'En sevdiğim dost 🐶',
    userId: 'user-b',
    userEmail: 'mehmet@example.com',
    createdAt: '2026-06-13',
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/id/1043/600/600',
    caption: 'Şehir ışıkları ✨',
    userId: 'user-a',
    userEmail: 'ayse@example.com',
    createdAt: '2026-06-12',
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/id/1062/600/600',
    caption: 'Sahil keyfi 🌊',
    userId: 'user-c',
    userEmail: 'emre@example.com',
    createdAt: '2026-06-11',
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/id/1080/600/600',
    caption: 'Taze meyveler 🍓',
    userId: 'user-b',
    userEmail: 'mehmet@example.com',
    createdAt: '2026-06-10',
  },
];
