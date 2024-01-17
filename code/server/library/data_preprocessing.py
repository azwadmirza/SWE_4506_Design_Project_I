import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np

class DataProcessing:
    def __init__(_self,url,target_column,process,file_type,train_test_split=None,delimiter=None):
        _self.url = url
        if train_test_split is not None:
            _self.train_test_split = float(train_test_split/100)
        else:
            _self.train_test_split = 0.2
        _self.target_column = target_column
        _self.file_type = file_type
        _self.__get_dataframe(file_type,delimiter)
        if process == "class":
            _self.__process_class_data()
        elif process == "regression":
            _self.__process_regression_data()
        else:
            raise Exception("Operation Type Not Supported: For classification use \"class\" and for regression use \"regression\"")
        _self.__process_data()
    
    def get_categories(_self):
        _self.categories=np.array(pd.Categorical(_self.labels).categories)
        return _self.categories
        
    def get_processed_data(_self):
        return _self.features,_self.labels
    
    def get_processed_data_with_split(_self):
        X_train, X_test, y_train, y_test = train_test_split(_self.features, _self.labels, test_size=_self.train_test_split, random_state=42,shuffle=True)
        return X_train, X_test, y_train, y_test
        
    def __get_dataframe(_self,file_type,delimiter=None):
        if(file_type=="text/csv" or _self.url[-4:] == ".csv"):
            _self.df = pd.read_csv(_self.url)
        elif(file_type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" or _self.url[-5:] == ".xlsx"):
            _self.df=pd.read_excel(_self.url)
        elif(file_type=="text/plain" or _self.url[-4:] == ".txt"):
            _self.df=pd.read_csv(_self.url, sep=delimiter)
        elif(file_type=="application/json" or _self.url[-5:] == ".json"):
            _self.df=pd.read_json(_self.url)
        else:
            raise Exception("Invalid File Type")
        _self.df = _self.df.dropna()
        
        
    def __process_data(_self):
        _self.__one_hot_encode_categorical()
        _self.__process_datetime_features()
    
    def __process_class_data(_self):
        if _self.target_column is not None:
            _self.features = _self.df.drop(_self.target_column, axis=1)
            _self.labels = _self.df[_self.target_column]
        else:
            raise Exception("Target Column Not Specified")
    
    def __process_regression_data(_self):
        if _self.target_column is not None:
            if _self.df[_self.target_column].dtype != 'int64' and _self.df[_self.target_column].dtype != 'float64':
                raise Exception('This target is not suitable for regression')
            _self.features = _self.df.drop(_self.target_column, axis=1)
            _self.labels = _self.df[_self.target_column]
        else:
            raise Exception("Target Column Not Specified")
        
    def __one_hot_encode_categorical(_self, columns=None, max_categories=10):
        if columns is None:
            columns = _self.features.select_dtypes(include=['object']).columns

        for col in columns:
            unique_categories = _self.features[col].nunique()
            if unique_categories > max_categories:
                _self.features = _self.features.drop(col, axis=1)
            else:
                encoded_cols = pd.get_dummies(_self.features[col], prefix=col, drop_first=True)
                _self.features = pd.concat([_self.features, encoded_cols], axis=1)
                _self.features = _self.features.drop(col, axis=1)
    
    def __process_datetime_features(_self, datetime_columns=None):
        if datetime_columns is None:
            datetime_columns = _self.features.select_dtypes(include=['datetime64']).columns
        for col in datetime_columns:
            _self.features[col + '_year'] = _self.features[col].dt.year
            _self.features[col + '_month'] = _self.features[col].dt.month
            _self.features[col + '_day'] = _self.features[col].dt.day
            _self.features[col + '_hour'] = _self.features[col].dt.hour
            _self.features[col + '_minute'] = _self.features[col].dt.minute
            _self.features[col + '_second'] = _self.features[col].dt.second
        _self.features = _self.features.drop(datetime_columns, axis=1)
        
    def isMultiClass(_self):
        if _self.target_column is not None:
            unique_classes = np.unique(_self.df[_self.target_column])
            return len(unique_classes) > 2
        else:
            raise Exception("Target Column Not Specified")
    
    