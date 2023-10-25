import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    access_token: string | null;
    verification: boolean | null;
    user_id: string | null;
}

interface RefreshState {
    refresh_token: string | null;
}

const initialAuthState: AuthState = {
    access_token: localStorage.getItem('access_token') || null,
    verification: localStorage.getItem('verification') === 'false' ? false : true,
    user_id: localStorage.getItem('user_id') || null,
};

const initialRefreshState: RefreshState = {
    refresh_token: localStorage.getItem('refresh_token') || null,
  };



const authSlice = createSlice({
    name: 'auth',
    initialState:{ ...initialAuthState, ...initialRefreshState },
    reducers: {
        setAccessTokens: (state, action: PayloadAction<AuthState>) => {
            state.access_token = action.payload.access_token;
            state.verification = action.payload.verification;
            state.user_id = action.payload.user_id;

            localStorage.setItem('access_token', action.payload.access_token !== null ? action.payload.access_token : "");

            localStorage.setItem('verification', action.payload.verification !== null ? action.payload.verification.toString() : "");
            localStorage.setItem('user_id', action.payload.user_id !== null ? action.payload.user_id : "");
        },
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.access_token = action.payload;
            localStorage.setItem('access_token', action.payload !== null ? action.payload : "");
        },
        setRefreshToken: (state, action: PayloadAction<string | null>) => {
            state.refresh_token = action.payload;
            localStorage.setItem('refresh_token', action.payload !== null ? action.payload : "");
        },
        clearTokens: (state) => {
            state.access_token = null;
            state.refresh_token = null;
            state.verification = null;
            state.user_id = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('verification');
            localStorage.removeItem('user_id');
        },
    },
});

export const { setAccessTokens,setRefreshToken, clearTokens,setAccessToken } = authSlice.actions;

export default authSlice.reducer;
