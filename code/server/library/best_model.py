from sklearn.model_selection import GridSearchCV
from data_preprocessing import DataProcessing
from model import Model
from sklearn.preprocessing import LabelEncoder
import json
class grid_search(Model,DataProcessing):
    def __init__(_self,model,normalization,param_grid,url,target_column,process,file_type,train_test_split=None,delimiter=None):
        _self.super(Model).__init__(model,normalization)
        _self.super(DataProcessing).__init__(url,target_column,process,file_type,train_test_split,delimiter)
        _self.param_grid=param_grid
        _self.__template()
        
    def get_train_test_split(_self):
        return _self.train_test_split
    
    def __template(_self):
        _self.model=super().get_model()
        _self.grid_search_results=GridSearchCV(estimator=_self.model,param_grid=_self.param_grid,cv=10)
        _self.X_train, _self.X_test, _self.y_train, _self.y_test=super().get_processed_data_with_split()
        if _self.process is "class":
            _self.y_train=LabelEncoder().fit_transform(_self.y_train)
            _self.y_test=LabelEncoder().fit_transform(_self.y_test)
        _self.results={}
        _self.__compute_results()
    
    def get_best_score_test(_self):
        return _self.grid_search_results.score(_self.X_test,_self.y_test)
        

    def get_best_params(_self):
        return json.dumps(_self.grid_search_results.best_params_)
    
    def get_best_score_train(_self):
        return _self.grid_search_results.best_score_
    
    def get_best_estimator(_self):
        return _self.grid_search_results.best_estimator_
    
    def get_grid_search(_self):
        return _self.grid_search_results
    
    def get_results(_self):
        return _self.results
    
    def __compute_results(_self):
        _self.results['Best Score']=_self.grid_search_results.best_score_
        _self.results['Best Parameters']=_self.grid_search_results.best_params_
        _self.results['Best Estimator']=_self.grid_search_results.best_estimator_
        _self.results['Best Index']=_self.grid_search_results.best_index_
        _self.results['Scorer']=_self.grid_search_results.scorer_
        _self.results['CV Results']=_self.grid_search_results.cv_results_
        _self.results['Grid Search']=_self.grid_search_results
    
    def to_json(_self):
        return json.dumps(_self.results)
        