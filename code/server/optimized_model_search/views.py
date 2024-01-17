from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import numpy as np
from library.optimized_hyperparameters import optimized_hyperparameters
from sklearn.tree import DecisionTreeClassifier,DecisionTreeRegressor
from sklearn.neighbors import KNeighborsClassifier,KNeighborsRegressor
from sklearn.svm import SVC,SVR
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression,LinearRegression
from xgboost import XGBClassifier,XGBRegressor
import pandas as pd

class decision_tree_classification_grid_search(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            param_grid={
                'criterion':['gini','entropy','log_loss'],
                'max_depth':[None,i for i in range(1,101)],
            }
            best_combination=optimized_hyperparameters(DecisionTreeClassifier,param_grid,data,target_column,'classification',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
    
class decision_tree_regression_grid_search(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            param_grid={
                'criterion':['mse','friedman_mse','mae','poisson'],
                'max_depth':[None,i for i in range(1,101)],
            }
            best_combination=optimized_hyperparameters(DecisionTreeRegressor,param_grid,data,target_column,'regression',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
    
class knn_classification_grid_search(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            df=pd.read_csv(data)
            number_of_features=df.shape[1]-1
            theoretical_optimal_n=np.sqrt(number_of_features)
            param_grid = {
                'n_neighbors': [i for i in range(max(theoretical_optimal_n-10,1),theoretical_optimal_n+10)],  
                'p': [1, 2, 3, 4],  
                'algorithm': ['auto', 'ball_tree', 'kd_tree', 'brute'], 
                'metric': ['minkowski', 'euclidean', 'manhattan', 'haversine'],  
                'weights': ['uniform', 'distance']  
            }
            best_combination=optimized_hyperparameters(KNeighborsClassifier,param_grid,data,target_column,'class',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
        
class knn_regression_grid_search(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            df=pd.read_csv(data)
            number_of_features=df.shape[1]-1
            theoretical_optimal_n=np.sqrt(number_of_features)
            param_grid = {
                'n_neighbors': [i for i in range(max(theoretical_optimal_n-10,1),theoretical_optimal_n+10)],  
                'p': [1, 2, 3, 4],  
                'algorithm': ['auto', 'ball_tree', 'kd_tree', 'brute'], 
                'metric': ['minkowski', 'euclidean', 'manhattan', 'haversine'],  
                'weights': ['uniform', 'distance']  
            }
            best_combination=optimized_hyperparameters(KNeighborsRegressor,param_grid,data,target_column,'regression',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
        
        

class svm_regression_grid_search(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            param_grid = {
                'kernel': ['linear', 'rbf','poly','sigmoid'],   
                'degree': [i for i in range(1,21)],   
                'C': [0.01,0.1,1,10,100,1000],
                'max_iter': [10,20,50,100,1000,10000],        
            }
            best_combination=optimized_hyperparameters(SVR,param_grid,data,target_column,'regression',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
        
class svm_classification_grid_search(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            param_grid = {
                'kernel': ['linear', 'rbf','poly','sigmoid'],   
                'degree': [i for i in range(1,21)],   
                'C': [0.01,0.1,1,10,100,1000],
                'max_iter': [10,20,50,100,1000,10000],        
            }
            best_combination=optimized_hyperparameters(SVC,param_grid,data,target_column,'class',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
        
class naive_bayes_classification_grid_search(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            best_combination=optimized_hyperparameters(GaussianNB,{
                'var_smoothing':[1e-9,1e-8,1e-7,1e-6,1e-5,1e-4,1e-3,1e-2,1e-1,0.2,0.4,0.6,0.8,0.99]
                },data,target_column,'class',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
        
class logistic_regression_grid_search(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            best_combination=optimized_hyperparameters(LogisticRegression,{
                    'max_iter':[100,200,300,400,500,600,700,800,900,1000],
                    'penalty':[None,'l1','l2','elasticnet']
                },data,target_column,'class',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
        
class linear_regression_grid_search(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            best_combination=optimized_hyperparameters(LinearRegression,{},data,target_column,'regression',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
        
        
class xgboost_regression_grid_search(APIView):
    queryset = []
    permission_classes = []
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            param_grid=param_grid = {
                'max_depth': [3, 5, 7],                     
                'booster': ['gbtree', 'gblinear', 'dart'],
                'tree_method': ['hist', 'exact', 'approx'],
                'grow_policy': ['depthwise', 'lossguide'], 
                'reg_alpha': [0.01,0.1,1,10,100,1000],       
                'reg_lambda': [0.01,0.1,1,10,100,1000],           
                'subsample': [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9, 1.0],        
                'objective': ['reg:squarederror', 'reg:squaredlogerror', 'reg:linear', 'reg:gamma', 'reg:tweedie'], 
            }
            best_combination=optimized_hyperparameters(XGBRegressor,param_grid,data,target_column,'regression',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)
        
        
class xgboost_classification_grid_search(APIView):
    queryset = []
    permission_classes = []
    def post(self, request):
        try:
            data=request.data['file_url']
            target_column=request.data['target_column']
            param_grid=param_grid = {
                'max_depth': [3, 5, 7],                     
                'booster': ['gbtree', 'gblinear', 'dart'],
                'tree_method': ['hist', 'exact', 'approx'],
                'grow_policy': ['depthwise', 'lossguide'], 
                'reg_alpha': [0.01,0.1,1,10,100,1000],       
                'reg_lambda': [0.01,0.1,1,10,100,1000],           
                'subsample': [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8, 0.9, 1.0],        
                'objective': ['binary:logistic',"binary:logitraw", 'multi:softmax',"multi:softprob"], 
            }
            best_combination=optimized_hyperparameters(XGBClassifier,param_grid,data,target_column,'class',"text/csv")
            return Response(best_combination.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Error Occurs: {str(e)}', status=status.HTTP_400_BAD_REQUEST)