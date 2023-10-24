import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
    file:File | null;
    data: any[];
}

const initialState: FileState = {
    file: null,
    data: [],
};





const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<File | null>) => {
            state.file = action.payload;
        },
        setData: (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
        },
    },
});

export const { setFile,setData } = fileSlice.actions;

export default fileSlice.reducer;
