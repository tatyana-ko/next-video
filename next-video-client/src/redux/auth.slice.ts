import { EnumTokens } from '@/types/enum.tokens';
import type { IUser } from '@/types/user.types';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface IAuthState {
	user: IUser | null;
	isLoggedIn: boolean;
	accessToken: string | null;
}

const initialState: IAuthState = {
	user: null,
	isLoggedIn: !!Cookies.get(EnumTokens.ACCESS_TOKEN),
	accessToken: Cookies.get(EnumTokens.ACCESS_TOKEN) || null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthData: (state, actions) => {
      state.user = actions.payload.user
      state.isLoggedIn = true
      state.accessToken = actions.payload.accessToken
		},
		
    removeAuthData: (state) => {
      state.user = null
      state.isLoggedIn = false
      state.accessToken = null
		},
	},
});

export const {setAuthData, removeAuthData } = authSlice.actions;
