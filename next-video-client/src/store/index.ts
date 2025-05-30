import { authSlice } from '@/redux/auth.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
