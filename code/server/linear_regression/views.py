from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from library.data_preprocessing import DataProcessing
from library.model import Model
from library.regression_analysis import RegressionAnalysis
from sklearn.linear_model import LinearRegression
from django.http import JsonResponse



class linear_regression_model(APIView):
    queryset = []

    permission_classes = []
    def get(self, request):
        return Response('Linear Regression Model Working...', status=status.HTTP_200_OK)
    
    def post(self, request):
        requestBody = request.data
        targetCol = requestBody.get('target', None)
        normalisation = requestBody.get('normalization', None)
        split_data = requestBody.get('train_test_split', '0.2')
        X_train, X_test, y_train, y_test=DataProcessing(requestBody['file_url'],targetCol,"regression","text/csv",split_data).get_processed_data_with_split()
        model=Model(LinearRegression(),normalisation).get_model()
        model.fit(X_train, y_train)
        return JsonResponse(RegressionAnalysis(model,X_train,X_test,y_train,y_test).to_json(), status=status.HTTP_200_OK, safe=False)