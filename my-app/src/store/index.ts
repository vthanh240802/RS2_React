import { combineReducers, configureStore, ReducerType } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./reducers/authReducer";
import { postsReducer } from "./reducers/postReducer";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});
export type AddDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
