import { configureStore } from "@reduxjs/toolkit"
import placereducer from "./placeslice"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  places: placereducer, 
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)




// export const store=configureStore({
//     reducer:{
//         places:placereducer
//     }

// })