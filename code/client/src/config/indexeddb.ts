import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { parseFile } from './parser';
import uploadToBackend from './uploadFiletoBackend';
import axios from 'axios';
import { arrayToCSV, fileToCSV } from '../utils/csvConverter';

interface FileDB extends DBSchema {
  'file': {
    key: string;
    value: {
      id: string;
      url: string;
      name: string;
      type: string;
      delimiter: string | null;
      data: Blob;
      uploaded_at: string;
    };
    indexes: { 'byUrl': string; 'byName': string; 'byID': string };
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
        fileStore.createIndex('byUrl', 'url', { unique: false });
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
    const foundFile = await this.getFileByName('byName', file.name);
    if (foundFile) {
      await this.deleteFileByName('byName', file.name);
    }
    const address = import.meta.env.VITE_BACKEND_REQ_ADDRESS;
    const response = await uploadToBackend(file.data, address);
    if (response.data.success === false) {
      return undefined;
    }
    const url = response.data.file_url;
    const file_id = response.data.file_id;
    const fileWithUrl = {
      ...file,
      uploaded_at: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      id: file_id,
      url: url,
    };
    if (this.db) {
      const tx = this.db.transaction('file', 'readwrite');
      const fileStore = tx.objectStore('file');
      await fileStore.add(fileWithUrl);
      return { file_id, url };
    } else {
      return null;
    }
  }

  async addFileLocal(file: {
    name: string;
    type: string;
    delimiter: string | null;
    url: string;
    id: string;
    data: Blob;
    uploaded_at: string;
  }) {
    if (this.db) {
      const tx = this.db.transaction('file', 'readwrite');
      const fileStore = tx.objectStore('file');
      await fileStore.add(file);
    } else {
      throw new Error('Database not initialized');
    }
  }

  async getFileByURL(index: 'byUrl', value: string, id: string,file_name:string,uploaded_at:string|null) {
    if (this.db) {
      const tx = this.db.transaction('file', 'readonly');
      const fileStore = tx.objectStore('file');
      const files = await fileStore.index(index).getAll(value);
      if (files.length > 0) {
        const file = files[0];
        const fileObject = new File([file.data], file.name, { type: file.type });
        return await parseFile(fileObject, file.delimiter, file.type);
      } else {
        if (id) {
          const file = await axios.get(value);
          const file_content = await fileToCSV(file.data, value, "text/csv");
          await this.addFileLocal({
            name: file_name,
            type: "text/csv",
            delimiter: ",",
            url: value,
            id: id,
            data: file_content,
            uploaded_at: uploaded_at||new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
          });
          return await parseFile(file_content, ",", "text/csv");
        }
        else {
          throw new Error("ID Must Be Specified");
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

  async getAllFiles() {
    if (this.db) {
      const tx = this.db.transaction('file', 'readonly');
      const fileStore = tx.objectStore('file');
      const files = await fileStore.getAll();
      if (files.length == 0) {
        const res = await axios.get(import.meta.env.VITE_BACKEND_REQ_ADDRESS + "/api/file/getall/" + localStorage.getItem("user_id")+"/");
        res.data.map(async(file:any)=>{
          this.getFileByURL('byUrl', file.cloudinary_url, file.id, file.file_name, new Date(file.uploaded_at).toLocaleDateString() + " " + new Date(file.uploaded_at).toLocaleTimeString());
        })
        return res.data.map((file: any) => {
          return {
            id: file.id,
            file_name: file.file_name,
            cloudinary_url: file.cloudinary_url,
            uploaded_at: new Date(file.uploaded_at).toLocaleDateString() + " " + new Date(file.uploaded_at).toLocaleTimeString()
          }
        });
      }
      return files.map((file) => {
        return {
          id: file.id,
          file_name: file.name,
          cloudinary_url: file.url,
          uploaded_at: file.uploaded_at
        }
      });
    } else {
      console.error('Database not initialized');
      return null;
    }
  }

  async updateFileURL(jsonData: any, url: string, new_url: string) {
    if (this.db) {
      try {
        const tx = this.db.transaction('file', 'readwrite');
        const fileStore = tx.objectStore('file');
        const files = await fileStore.index('byUrl').getAll(url);

        if (files.length > 0) {
          const file = files[0];
          const file_content = await arrayToCSV(jsonData ? jsonData : [], file.delimiter ? file.delimiter : undefined, file.name, file.type);
          console.log(file.data)
          console.log(typeof file.data);
          const updatedFile = {
            id: file.id,
            name: file.name,
            type: file.type,
            delimiter: file.delimiter,
            url: new_url,
            uploaded_at: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
            data: file_content
          };
          console.log(file_content);
          console.log(typeof file_content);
          await fileStore.put(updatedFile);
          console.log('File updated successfully');
        } else {
          console.error('File not found');
        }
      } catch (error) {
        console.error('Error updating file:', error);
      }
    } else {
      console.error('Database not initialized');
    }
  }


  async deleteFileByID(index: 'byID', value: string) {
    if (this.db) {
      const tx = this.db.transaction('file', 'readwrite');
      const fileStore = tx.objectStore('file');
      const files = await fileStore.index(index).getAll(value);
      if (files.length > 0) {
        const key = files[0].id;
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
        const key = files[0].id;
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
        const key = files[0].id;
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
