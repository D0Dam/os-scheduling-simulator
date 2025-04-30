// import { createContext, useContext, useState } from 'react';

// import { StoreApi, createStore, useStore } from 'zustand';

// import type { User } from '@/types/auth/client';

// import { getAuth } from '@/apis/auth';

// interface UserState {
//   user: User | null;
// }

// interface UserAction {
//   setUser: VoidFunction;
// }

// const UserStoreContext = createContext<StoreApi<UserState & UserAction> | null>(null);

// export const useUserStore = () => {
//   const store = useContext(UserStoreContext);

//   if (!store) {
//     throw new Error('Missing BearStoreProvider');
//   }

//   return useStore(store, (state) => state);
// };

// export function UserStoreProvider({
//   children,
//   initialUser,
// }: {
//   children: React.ReactNode;
//   initialUser: User | null;
// }) {
//   const [store] = useState(() =>
//     createStore<UserState & UserAction>((set) => ({
//       user: initialUser,
//       setUser: async () => {
//         const user = await getAuth();

//         if (user) {
//           return set({ user });
//         }

//         return set({ user: null });
//       },
//     }))
//   );

//   return <UserStoreContext.Provider value={store}>{children}</UserStoreContext.Provider>;
// }

import { create } from 'zustand';

import type { User } from '@/types/auth/client';

import { getAuth } from '@/apis/auth';

interface UserState {
  loading: boolean;
  user: User | null;
}

interface UserAction {
  setUser: VoidFunction;
  clearUser: VoidFunction;
}

const useUserState = create<UserState & UserAction>((set) => ({
  user: null,
  loading: false,

  setUser: async () => {
    set({ loading: true });
    const user = await getAuth();
    set({ loading: false });

    if (user) {
      return set({ user });
    }

    return set({ user: null });
  },
  clearUser: () => set({ user: null }),
}));

getAuth().then((user) => useUserState.setState({ user }));

export default useUserState;
