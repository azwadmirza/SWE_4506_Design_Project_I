import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np

class DataProcessing:
    def __init__(__self,url,target_column,process,file_type,train_test_split=None,delimiter=None):
        __self.url = url
        if train_test_split is not None:
            __self.train_test_split = float(train_test_split/100)
        else:
            __self.train_test_split = 0.2
        __self.target_column = target_column
        __self.file_type = file_type
        __self.__get_dataframe(file_type,delimiter)
        if process == "class":
            __self.__process_class_data()
        elif process == "regression":
            __self.__process_regression_data()
        else:
            raise Exception("Operation Type Not Supported: For classification use \"class\" and for regression use \"regression\"")
        __self.__process_data()
        
    def get_processed_data(_self):
        return _self.features,_self.labels
    
    def get_processed_data_with_split(__self):
        X_train, X_test, y_train, y_test = train_test_split(__self.features, __self.labels, test_size=float(__self.train_test_split), random_state=42)
        return X_train, X_test, y_train, y_test
        
    def __get_dataframe(__self,file_type,delimiter=None):
        if(file_type=="text/csv" or __self.url[-4:] == ".csv"):
            __self.df = pd.read_csv(__self.url)
        elif(file_type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" or __self.url[-5:] == ".xlsx"):
            __self.df=pd.read_excel(__self.url)
        elif(file_type=="text/plain" or __self.url[-4:] == ".txt"):
            __self.df=pd.read_csv(__self.url, sep=delimiter)
        elif(file_type=="application/json" or __self.url[-5:] == ".json"):
            __self.df=pd.read_json(__self.url)
        else:
            raise Exception("Invalid File Type")
        
        
    def __process_data(__self):
        __self.__one_hot_encode_categorical()
        __self.__process_datetime_features()
    
    def __process_class_data(__self):
        if __self.target_column is not None:
            __self.features = __self.df.drop(__self.target_column, axis=1)
            __self.labels = __self.df[__self.target_column]
        else:
            raise Exception("Target Column Not Specified")
    
    def __process_regression_data(__self):
        if __self.target_column is not None:
            if __self.df[__self.target_column].dtype != 'int64' and __self.df[__self.target_column].dtype != 'float64':
                raise Exception('This target is not suitable for regression')
            __self.features = __self.df.drop(__self.target_column, axis=1)
            __self.labels = __self.df[__self.target_column]
        else:
            raise Exception("Target Column Not Specified")
        
    def __one_hot_encode_categorical(__self, columns=None, max_categories=10):
        if columns is None:
            columns = __self.features.select_dtypes(include=['object']).columns

        for col in columns:
            unique_categories = __self.features[col].nunique()
            if unique_categories > max_categories:
                __self.features = __self.features.drop(col, axis=1)
            else:
                encoded_cols = pd.get_dummies(__self.features[col], prefix=col, drop_first=True)
                __self.features = pd.concat([__self.features, encoded_cols], axis=1)
                __self.features = __self.features.drop(col, axis=1)
    
    def __process_datetime_features(__self, datetime_columns=None):
        if datetime_columns is None:
            datetime_columns = __self.features.select_dtypes(include=['datetime64']).columns
        for col in datetime_columns:
            __self.features[col + '_year'] = __self.features[col].dt.year
            __self.features[col + '_month'] = __self.features[col].dt.month
            __self.features[col + '_day'] = __self.features[col].dt.day
            __self.features[col + '_hour'] = __self.features[col].dt.hour
            __self.features[col + '_minute'] = __self.features[col].dt.minute
            __self.features[col + '_second'] = __self.features[col].dt.second
        __self.features = __self.features.drop(datetime_columns, axis=1)
        
    def isMultiClass(__self):
        if __self.target_column is not None:
            unique_classes = np.unique(__self.df[__self.target_column])
            return len(unique_classes) > 2
        else:
            raise Exception("Target Column Not Specified")
    
    