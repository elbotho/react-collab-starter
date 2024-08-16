import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebsocketProvider } from "y-websocket";
import { usersData } from "./users-data";

type Todo = { completed: boolean; title: string };

export const store = syncedStore({ todos: [] as Todo[], fragment: "xml" });

const doc = getYjsDoc(store);

// Start a y-websocket server, e.g.: HOST=localhost PORT=1234 npx y-websocket-server

export const wsProvider = new WebsocketProvider(
  "ws://localhost:1234",
  "default-room",
  doc
);

export const awareness = wsProvider.awareness;

const storedData = localStorage.getItem("dummyUser");

let randomUser = undefined;

if (!storedData) {
  const data = usersData[Math.floor(Math.random() * usersData.length)];
  randomUser = {
    ...data,
    name: `${data.name} ${Math.floor(Math.random() * 100)}`,
  };
  localStorage.setItem("dummyUser", JSON.stringify(randomUser));
}

awareness.setLocalState(storedData ? JSON.parse(storedData) : randomUser);

export const disconnect = () => wsProvider.disconnect();
export const connect = () => wsProvider.connect();
