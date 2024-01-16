import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
    file: string;
    file_id: string;
    data: any[];
    url:string|null;
    delimiter:string|null;
    type:string|null;
    loading:boolean;
    uploaded_at:string|null;
    optionsPlot:any[];
}


const initialState: FileState = {
    file: localStorage.getItem('file') || "New File",
    file_id:localStorage.getItem('file_id')||"0",
    data: [],
    url:localStorage.getItem('url') || null,
    delimiter:localStorage.getItem('delimiter') || null,
    type:localStorage.getItem('type') || null,
    loading:false,
    uploaded_at:localStorage.getItem('uploaded_at') || null,
    optionsPlot: JSON.parse(localStorage.getItem('optionsPlot')||'[]')
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<string>) => {
            state.file = action.payload;
            localStorage.setItem('file', action.payload);
        },
        setFileId:(state, action: PayloadAction<string>)=>{
          state.file_id=action.payload;
          localStorage.setItem('file_id', action.payload);
        },
        setURL:(state, action: PayloadAction<string>)=>{
          state.url=action.payload;
          localStorage.setItem('url', action.payload);
        },
        setOptionsPlot:(state, action: PayloadAction<any[]>)=>{
          state.optionsPlot=action.payload;
          localStorage.setItem('optionsPlot', JSON.stringify(action.payload));
        },
        setLoading:(state, action: PayloadAction<boolean>)=>{
          state.loading=action.payload;
        },
        setUploadedAt:(state, action: PayloadAction<string>)=>{
          state.uploaded_at=action.payload;
          localStorage.setItem('uploaded_at', action.payload);
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
                  break; 
                }
              }
              if (rowIndex >= 0 && rowIndex < state.data.length && columnIndex !== -1) {
                state.data[rowIndex][columnIndex] = value;
                localStorage.setItem('data', JSON.stringify(state.data));
              }
            }
          },
          setDelimiter:(state, action: PayloadAction<string>)=>{
            state.delimiter=action.payload;
            localStorage.setItem('delimiter', action.payload);
          },
          setType:(state, action: PayloadAction<string>)=>{
            state.type=action.payload;
            localStorage.setItem('type', action.payload);
          }
    },
    
});

export const { setOptionsPlot,setFile,setUploadedAt, updateData,setURL,setDelimiter,setType,setLoading,setFileId } = fileSlice.actions;

export default fileSlice.reducer;
