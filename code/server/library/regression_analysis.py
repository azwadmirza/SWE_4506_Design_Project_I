import pandas as pd
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.metrics import r2_score
import json

class RegressionAnalysis:
    def __init__(__self,model,X_train,X_test,y_train,y_test):
        __self.model=model
        __self.X_train=X_train
        __self.X_test=X_test
        __self.y_train=y_train
        __self.y_test=y_test
        __self.results={}
        __self.template()
        
    def template(__self):
        __self.__get_predictions()
        __self.__get_mse()
        __self.__get_mae()
        __self.__get_rmse()
        __self.__get_r2()
        
    def __get_predictions(__self):
        __self.predictions_test = __self.model.predict(__self.X_test)
        __self.predictions_train = __self.model.predict(__self.X_train)
        __self.predictions_whole = __self.model.predict(pd.concat([__self.X_train, __self.X_test]))
        __self.results['Predictions Whole'] = __self.predictions_whole.tolist()
    
    def __get_mse(__self):
        __self.results['MSE Test'] = mean_squared_error(__self.y_test, __self.predictions_test)
        __self.results['MSE Train'] = mean_squared_error(__self.y_train, __self.predictions_train)
        
    def __get_mae(__self):
        __self.results['MAE Test'] = mean_absolute_error(__self.y_test, __self.predictions_test)
        __self.results['MAE Train'] = mean_absolute_error(__self.y_train, __self.predictions_train)
    
    def __get_rmse(__self):
        __self.results['RMSE Test'] = mean_squared_error(__self.y_test, __self.predictions_test, squared=False)
        __self.results['RMSE Train'] = mean_squared_error(__self.y_train, __self.predictions_train, squared=False)
        
    def __get_r2(__self):
        __self.results['R2 Accuracy Test'] = r2_score(__self.y_test, __self.predictions_test)
        __self.results['R2 Accuracy Train'] = r2_score(__self.y_train, __self.predictions_train)
        
    def to_json(__self):
        return json.dumps(__self.results)
    
    