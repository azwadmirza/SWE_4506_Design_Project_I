from library.best_model import grid_search
import numpy as np
class optimized_hyperparameters:
    def __init__(__self,model,param_grid,data,target_column,process,file_type,delimiter=None):
        __self.grid_scores={}
        __self.model=model
        __self.param_grid=param_grid
        __self.data=data
        __self.target_column=target_column
        __self.process=process
        __self.file_type=file_type
        __self.delimiter=delimiter
        __self.best_model=None
        __self.best_hyperparameter_combination=None
        __self.best_train_test_split=None
        __self.best_model=None
        __self.best_hyperparameter_combination=None
        __self.__template()
    
    def get_best_model(__self):
        return __self.best_model
    
    def get_best_hyperparameter_combination(__self):
        return __self.best_hyperparameter_combination
    
    def get_best_hyperparameter_combination(__self):
        return __self.best_hyperparameter_combination
    
    def __template(__self):
        __self.__initialize_grid_scores()
        __self.__find_best()
        
    
    def __initialize_grid_scores(__self):
        try:
            for i in np.arange(0.10,0.55,0.05):
                print(i)
                minMax=grid_search(__self.model(),"MinMaxScaler",__self.param_grid,__self.data,__self.target_column,__self.process,__self.file_type,i,__self.delimiter)
                std=grid_search(__self.model(),"StandardScaler",__self.param_grid,__self.data,__self.target_column,__self.process,__self.file_type,i,__self.delimiter)
                robust=grid_search(__self.model(),"RobustScaler",__self.param_grid,__self.data,__self.target_column,__self.process,__self.file_type,i,__self.delimiter)
                __self.grid_scores[round(i,2)]={
                    "MinMaxScaler":minMax,
                    "StandardScaler":std,
                    "RobustScaler":robust,
                }
        except Exception as e:
            print(str(e))
            
            
    def __find_best(__self):
        for i in np.arange(0.10,0.55,0.05):
            minMax=grid_search(__self.model(),"MinMaxScaler",__self.param_grid,__self.data,__self.target_column,__self.process,__self.file_type,i,__self.delimiter)
            std=grid_search(__self.model(),"StandardScaler",__self.param_grid,__self.data,__self.target_column,__self.process,__self.file_type,i,__self.delimiter)
            robust=grid_search(__self.model(),"RobustScaler",__self.param_grid,__self.data,__self.target_column,__self.process,__self.file_type,i,__self.delimiter)
            __self.grid_scores[round(i,2)]={
                "MinMaxScaler":minMax,
                "StandardScaler":std,
                "RobustScaler":robust,
            }
            if __self.best_model==None:
                __self.best_model=minMax
                __self.best_hyperparameter_combination=minMax.get_best_params()
                __self.best_train_test_split=minMax.get_train_test_split()
            else:
                if minMax.get_best_score_test()>__self.best_model.get_best_score_test():
                    __self.best_model=minMax
                    __self.best_hyperparameter_combination=minMax.get_best_params()
                    __self.best_train_test_split=minMax.get_train_test_split()
                if std.get_best_score_test()>__self.best_model.get_best_score_test():
                    __self.best_model=std
                    __self.best_hyperparameter_combination=std.get_best_params()
                    __self.best_train_test_split=std.get_train_test_split()
                if robust.get_best_score_test()>__self.best_model.get_best_score_test():
                    __self.best_model=robust
                    __self.best_hyperparameter_combination=robust.get_best_params()
                    __self.best_train_test_split=robust.get_train_test_split()
                    
    def to_json(__self):
        result={"best_hyperparameters":__self.best_hyperparameter_combination,"best_train_test_split":__self.best_train_test_split}
        return result