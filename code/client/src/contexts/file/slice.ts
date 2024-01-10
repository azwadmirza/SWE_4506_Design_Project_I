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
        updateData: (state, action: PayloadAction<{ key: string; value: string }>) => {
            const { key, value } = action.payload;
      
            const colonIndex = key.indexOf(':');
      
            if (colonIndex !== -1) {
              const rowIndex = parseInt(key.substring(0, colonIndex), 10);
              let columnIndex = -1;
              const propertyName = key.substring(colonIndex + 1);
              for (let i = 0; i < state.data[0].length; i++) {
                if (state.data[0][i] === propertyName) {
                  columnIndex = i;
                  break; // Exit the loop once a match is found
                }
              }
              if (rowIndex >= 0 && rowIndex < state.data.length && columnIndex !== -1) {
                state.data[rowIndex][columnIndex] = value;
                localStorage.setItem('data', JSON.stringify(state.data));
              }
            }
          },
        setHTML: (state, action: PayloadAction<string | null>) => {
            state.html = action.payload;

            localStorage.setItem('html', action.payload? action.payload : "");
        },
    },
});

export const { setFile, setData, setHTML, updateData } = fileSlice.actions;

export default fileSlice.reducer;
