import { create } from 'zustand';
import { Client } from '@/utils/types';

interface ClientStore {
  clients: Client[];
  currentClient: Client | null;
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
  updateClient: (id: number, client: Partial<Client>) => void;
  deleteClient: (id: number) => void;
  setCurrentClient: (client: Client | null) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  currentClient: null,
  setClients: (clients) => set({ clients }),
  addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  updateClient: (id, updates) => set((state) => ({
    clients: state.clients.map(client => 
      client.id === id ? { ...client, ...updates } : client
    )
  })),
  deleteClient: (id) => set((state) => ({
    clients: state.clients.filter(client => client.id !== id)
  })),
  setCurrentClient: (client) => set({ currentClient: client }),
}));