from sklearn.model_selection import GridSearchCV
from data_preprocessing import DataProcessing
from model import Model
import json
class grid_search(Model,DataProcessing):
    def __init__(__self,model,normalization,param_grid,url,target_column,process,file_type,train_test_split=None,delimiter=None):
        __self.super(Model).__init__(model,normalization)
        __self.super(DataProcessing).__init__(url,target_column,process,file_type,train_test_split,delimiter)
        __self.param_grid=param_grid
        __self.template()
    
    def template(__self):
        __self.model=super().get_model()
        __self.grid_search=GridSearchCV(estimator=__self.model,param_grid=__self.param_grid,cv=10)
        __self.X_train, __self.X_test, __self.y_train, __self.y_test=super().get_processed_data_with_split()
        __self.grid_search.fit(__self.X_train,__self.y_train)
        __self.results={}
        __self.__compute_results()
    
    def get_best_score_test(__self):
        return __self.grid_search.score(__self.X_test,__self.y_test)
        

    def get_best_params(__self):
        return __self.grid_search.best_params_
    
    def get_best_score_train(__self):
        return __self.grid_search.best_score_
    
    def get_best_estimator(__self):
        return __self.grid_search.best_estimator_
    
    def get_grid_search(__self):
        return __self.grid_search
    
    def get_results(__self):
        return __self.results
    
    def __compute_results(__self):
        __self.results['Best Score']=__self.grid_search.best_score_
        __self.results['Best Parameters']=__self.grid_search.best_params_
        __self.results['Best Estimator']=__self.grid_search.best_estimator_
        __self.results['Best Index']=__self.grid_search.best_index_
        __self.results['Scorer']=__self.grid_search.scorer_
        __self.results['CV Results']=__self.grid_search.cv_results_
        __self.results['Grid Search']=__self.grid_search
    
    def to_json(__self):
        return json.dumps(__self.results)
        