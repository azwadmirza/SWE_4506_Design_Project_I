import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
    file:File | null;
    data: any[];
    html: string|null;
}

const initialState: FileState = {
    file: null,
    data: [],
    html:""
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
        setHTML: (state, action: PayloadAction<string | null>) => {
            state.html = action.payload;
        }
    },
});

export const { setFile,setData,setHTML } = fileSlice.actions;

export default fileSlice.reducer;
