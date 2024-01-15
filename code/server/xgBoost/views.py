from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from library.data_preprocessing import DataProcessing
from sklearn.preprocessing import LabelEncoder
from library.model import Model
import pandas as pd
from library.classification_analysis import ClassificationAnalysis
from library.regression_analysis import RegressionAnalysis
from xgboost import XGBClassifier,XGBRegressor


class xgboost_classification_model(APIView):
    queryset = []

    permission_classes = []
    def get(self, request):
        return Response('Decison Tree Model Working...', status=status.HTTP_200_OK)
    
    def post(self, request):
        requestBody = request.data
        depth = requestBody.get('max_depth', None)
        booster = requestBody.get('booster', None)
        split_data = requestBody.get('train_test_split', None)
        targetCol = requestBody.get('target', None)
        normalisation = requestBody.get('normalization', None)
        tree_method = requestBody.get('tree_method', None)
        grow_policy = requestBody.get('grow_policy', None)
        reg_alpha = requestBody.get('reg_alpha', None)
        reg_lambda = requestBody.get('reg_lambda', None)
        subsample = requestBody.get('subsample_ratio', None)
        objective=requestBody.get('objective', None)
        dataProcessing = DataProcessing(requestBody['file_url'],targetCol,'class',"text/csv",split_data)
        X_train, X_test, y_train, y_test=dataProcessing.get_processed_data_with_split()
        categories=dataProcessing.get_categories()
        model = Model(XGBClassifier(booster=booster,objective=objective,max_depth=depth,tree_method=tree_method,grow_policy=grow_policy,reg_alpha=reg_alpha,reg_lambda=reg_lambda,subsample=subsample,enable_categorical=True),normalisation).get_model()
        y_test=pd.Series(LabelEncoder().fit_transform(y_test))
        y_train=pd.Series(LabelEncoder().fit_transform(y_train))
        model.fit(X_train,y_train)
        return Response(ClassificationAnalysis(model,X_train,X_test,y_train,y_test,categories=categories).to_json(), status=status.HTTP_200_OK)
    
    
class xgboost_regression_model(APIView):
    queryset = []

    permission_classes = []
    def get(self, request):
        return Response('Decison Tree Model Working...', status=status.HTTP_200_OK)
    
    def post(self, request):
        requestBody = request.data
        depth = requestBody.get('max_depth', None)
        booster = requestBody.get('booster', None)
        split_data = requestBody.get('train_test_split', None)
        targetCol = requestBody.get('target', None)
        normalisation = requestBody.get('normalization', None)
        tree_method = requestBody.get('tree_method', None)
        grow_policy = requestBody.get('grow_policy', None)
        reg_alpha = requestBody.get('reg_alpha', None)
        reg_lambda = requestBody.get('reg_lambda', None)
        subsample = requestBody.get('subsample_ratio', None)
        objective=requestBody.get('objective', None)
        X_train, X_test, y_train, y_test=DataProcessing(requestBody['file_url'],targetCol,'regression',"text/csv",split_data).get_processed_data_with_split()
        model = Model(XGBRegressor(booster=booster,objective=objective,max_depth=depth,tree_method=tree_method,grow_policy=grow_policy,reg_alpha=reg_alpha,reg_lambda=reg_lambda,subsample=subsample),normalisation).get_model()
        model.fit(X_train,y_train)
        return Response(RegressionAnalysis(model,X_train,X_test,y_train,y_test).to_json(), status=status.HTTP_200_OK)