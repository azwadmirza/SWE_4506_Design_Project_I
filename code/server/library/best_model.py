from sklearn.model_selection import GridSearchCV
from library.data_preprocessing import DataProcessing
from library.model import Model
from sklearn.preprocessing import LabelEncoder
import json
class grid_search():
    def __init__(_self,model,normalization,param_grid,url,target_column,process,file_type,train_test_split=None,delimiter=None):
        _self.model=Model(model,normalization)
        _self.data_preprocess=DataProcessing(url,target_column,process,file_type,train_test_split,delimiter)
        _self.process=process
        _self.param_grid=param_grid
        _self.train_test_split=train_test_split
        _self.__template()
        
    def get_train_test_split(_self):
        return _self.train_test_split
    
    def __template(_self):
        try:
            _self.grid_search_class=GridSearchCV(estimator=_self.model.get_model(),param_grid=_self.param_grid,cv=10)
            _self.X_train, _self.X_test, _self.y_train, _self.y_test=_self.data_preprocess.get_processed_data_with_split()
            if _self.process=="class":
                _self.y_train=LabelEncoder().fit_transform(_self.y_train)
                _self.y_test=LabelEncoder().fit_transform(_self.y_test)
            _self.results={}
            _self.grid_search_results=_self.grid_search_class.fit(_self.X_train,_self.y_train)
            _self.__compute_results()
        except Exception as e:
            print(str(e))
            
    
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
        