/* eslint-disable @typescript-eslint/ban-types */
import { createStore, applyMiddleware, compose, Middleware, StoreEnhancer } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import RootSagas from './rootSagas';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import appReducers from './rootReducers';
import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export default () => {
  const middleware: Middleware[] = [];
  const enhancers = [];

  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: seamlessImmutableReconciler,
    whitelist: [
      'authReducer',
    ],
  };

  const __DEV__ = process.env.NODE_ENV !== 'production';

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Sync middleware ------------- */

  middleware.push(
    createStateSyncMiddleware({
      // blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
      whitelist: ['LOGIN_REQUEST', 'LOGOUT_REQUEST'],
    }),
  );

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware) as never);

  /** ------------ Redux devtool --------------------- */

  const composeEnhancers =
    __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const persistedReducer = persistReducer(persistConfig, appReducers);
  const store = createStore(persistedReducer, composeEnhancers(...enhancers) as StoreEnhancer<unknown, unknown>);
  initMessageListener(store);

  const persistor = persistStore(store);

  // kick off root saga
  sagaMiddleware.run(RootSagas);
  return { store, persistor };
};
