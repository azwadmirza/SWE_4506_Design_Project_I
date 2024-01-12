import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { parseFile } from './parser';
import uploadToBackend from './uploadFiletoBackend';
import axios from 'axios';

interface FileDB extends DBSchema {
  'file': {
    key: string;
    value: {
      url: string;
      id:string;
      name: string;
      type: string;
      delimiter: string | null;
      data: Blob;
    };
    indexes: { 'byUrl': string; 'byName': string ;'byID':string};
  };
}

class IndexedDBConfig {
  private dbName: string = 'FileDatabase';
  private dbVersion: number = 1;
  private db: IDBPDatabase<FileDB> | null = null;

   async openDatabase() {
    this.db = await openDB<FileDB>(this.dbName, this.dbVersion, {
      upgrade(db) {
        const fileStore = db.createObjectStore('file', { keyPath: 'id' });
        fileStore.createIndex('byUrl', 'url', { unique: true });
        fileStore.createIndex('byID', 'id', { unique: true });
        fileStore.createIndex('byName', 'name', { unique: false });
      },
    });
    return true;
  }

  async addFile(file: {
    name: string;
    type: string;
    delimiter: string | null;
    data: Blob;
  }) {
    const foundFile=await this.getFileByName('byName',file.name);
    if(foundFile){
      await this.deleteFileByName('byName',file.name);
    }
    const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
    const response=await uploadToBackend(file.data, address);
    if(response.data.success===false){
        return undefined;
    }
    const url=response.data.file_url;
    const file_id=response.data.file_id;
    const fileWithUrl = {
        ...file,
        id:file_id,
        url: url,
      };
    if (this.db) {
      const tx = this.db.transaction('file', 'readwrite');
      const fileStore = tx.objectStore('file');
      await fileStore.add(fileWithUrl);
      return {file_id,url};
    } else {
      return null;
    }
  }

  async getFileByURL(index: 'byUrl', value: string,type:string|null,delimiter:string|null) {
    if (this.db) {
      const tx = this.db.transaction('file', 'readonly');
      const fileStore = tx.objectStore('file');
      const files = await fileStore.index(index).getAll(value);
      if (files.length > 0) {
        const file = files[0];
        const fileObject = new File([file.data], file.name, { type: file.type });
        return await parseFile(fileObject, file.delimiter, file.type);
      } else {
        await axios.get(value);
        if(type){
            this.addFile({
                name: value,
                type: type,
                delimiter: delimiter,
                data: new Blob(),
            });
            const fileObject = new File([], value, { type: type });
            return await parseFile(fileObject, delimiter, type);
        }
        else{
            throw new Error("File not found");
        }
      }
    } else {
      throw new Error("Database not initialized");
    }
  }

  async getFileByName(index: 'byName', value: string) {
    if (this.db) {
      const tx = this.db.transaction('file', 'readonly');
      const fileStore = tx.objectStore('file');
      const files = await fileStore.index(index).getAll(value);
      if (files.length > 0) {
        const file = files[0];
        const fileObject = new File([file.data], file.name, { type: file.type });
        return await parseFile(fileObject, file.delimiter, file.type);
      } else {
        console.error('File not found');
        return null;
      }
    } else {
      console.error('Database not initialized');
      return null;
    }
  }

  async getFileByID(index: 'byID', value: string) {
    if (this.db) {
      const tx = this.db.transaction('file', 'readonly');
      const fileStore = tx.objectStore('file');
      const files = await fileStore.index(index).getAll(value);
      if (files.length > 0) {
        const file = files[0];
        const fileObject = new File([file.data], file.name, { type: file.type });
        return await parseFile(fileObject, file.delimiter, file.type);
      } else {
        console.error('File not found');
        return null;
      }
    } else {
      console.error('Database not initialized');
      return null;
    }
  }

  async deleteFileByID(index: 'byID', value: string) {
    if (this.db) {
      const tx = this.db.transaction('file', 'readwrite');
      const fileStore = tx.objectStore('file');
      const files = await fileStore.index(index).getAll(value);
      if (files.length > 0) {
        const key = files[0].url; 
        await fileStore.delete(key);
        console.log('File deleted successfully');
      } else {
        console.error('File not found');
      }
    } else {
      console.error('Database not initialized');
    }
  }

  async deleteFileByURL(index: 'byUrl', value: string) {
    if (this.db) {
      const tx = this.db.transaction('file', 'readwrite');
      const fileStore = tx.objectStore('file');
      const files = await fileStore.index(index).getAll(value);
      if (files.length > 0) {
        const key = files[0].url;
        await fileStore.delete(key);
        console.log('File deleted successfully');
      } else {
        console.error('File not found');
      }
    } else {
      console.error('Database not initialized');
    }
  }

  async deleteFileByName(index: 'byName', value: string) {
    if (this.db) {
      const tx = this.db.transaction('file', 'readwrite');
      const fileStore = tx.objectStore('file');
      const files = await fileStore.index(index).getAll(value);
      if (files.length > 0) {
        const key = files[0].url;
        await fileStore.delete(key);
        console.log('File deleted successfully');
      } else {
        console.error('File not found');
      }
    } else {
      console.error('Database not initialized');
    }
  }


}

export const indexedDBConfig = new IndexedDBConfig();
