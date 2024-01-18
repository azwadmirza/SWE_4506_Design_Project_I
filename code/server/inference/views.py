from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import numpy as np
from library.optimized_hyperparameters import optimized_hyperparameters
from sklearn.neighbors import KNeighborsClassifier,KNeighborsRegressor
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression,LinearRegression
import pandas as pd

    
class best_model_performance(APIView):
    permission_classes = []
    def post(self, request):
        try:
            print("Comes Here")
            data=request.data['file_url']
            df=pd.read_csv(data)
            number_of_features=df.shape[1]-1
            theoretical_optimal_n=int(np.sqrt(number_of_features))
            param_grid_knn_classifier = {
                'kneighborsclassifier__n_neighbors': [i for i in range(max(theoretical_optimal_n-2,1),theoretical_optimal_n+2)],  
            }
            param_grid_knn_regressor = {
                'kneighborsregressor__n_neighbors': [i for i in range(max(theoretical_optimal_n-2,1),theoretical_optimal_n+2)],  
            }
            class_targets=df.select_dtypes(include='object').columns
            regression_targets=pd.concat([df.select_dtypes(include='int64'),df.select_dtypes(include='float64')],axis=1).columns
            column_best_models={}
            for target_column in class_targets:
                result1=optimized_hyperparameters(KNeighborsClassifier,param_grid_knn_classifier,data,target_column,'class',"text/csv").get_best_score()
                result2=optimized_hyperparameters(LogisticRegression,{
                        'logisticregression__max_iter':[10,20],
                        'logisticregression__penalty':[None,'l1','l2','elasticnet']
                    },data,target_column,'class',"text/csv").get_best_score()
                result3=optimized_hyperparameters(GaussianNB,{
                    'gaussiannb__var_smoothing':[1e-9,1e-8,1e-7,1e-6,1e-5,1e-4,1e-3,1e-2,1e-1,0.2,0.4,0.6,0.8,0.99]
                    },data,target_column,'class',"text/csv").get_best_score()
                if result1>result2 and result2>result3:
                    column_best_models[str(target_column)]="KNearestNeighbours Classifier"
                elif result2>result3 and result3>result1:
                    column_best_models[str(target_column)]="Logistic Regression"
                else:
                    column_best_models[str(target_column)]="Naive Bayes"
                    
            for target_column in regression_targets:
                result1=optimized_hyperparameters(KNeighborsRegressor,param_grid_knn_regressor,data,target_column,'regression',"text/csv").get_best_score()
                result2=optimized_hyperparameters(LinearRegression,{},data,target_column,'regression',"text/csv").get_best_score()
                if result1>result2:
                    column_best_models[str(target_column)]="KNearestNeighbours Regressor"
                else:
                    column_best_models[str(target_column)]="Linear Regression"
            return Response(column_best_models,status=status.HTTP_200_OK)

        except Exception as e:
            print(str(e))
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
        

        
        


        

    
    
        
        
