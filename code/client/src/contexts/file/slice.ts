import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
    file: string | null;
    data: any[];
    html: string | null;
}


const initialState: FileState = {
    file: localStorage.getItem('file') || null,
    data: JSON.parse(localStorage.getItem('data') || '[]'), 
    html: localStorage.getItem('html') || null,
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<string>) => {
            state.file = action.payload;
            // Update localStorage
            localStorage.setItem('file', action.payload);
        },
        setData: (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
            localStorage.setItem('data', JSON.stringify(action.payload));
        },
        setHTML: (state, action: PayloadAction<string | null>) => {
            state.html = action.payload;
            // Update localStorage
            localStorage.setItem('html', action.payload? action.payload : "");
        },
    },
});

export const { setFile, setData, setHTML } = fileSlice.actions;

export default fileSlice.reducer;
