from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from library.data_preprocessing import DataProcessing
from library.model import Model
from library.regression_analysis import RegressionAnalysis
from sklearn.linear_model import LinearRegression
from django.http import JsonResponse
from sklearn.decomposition import PCA



class linear_regression_model(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            requestBody = request.data
            targetCol = requestBody.get('target', None)
            normalization = requestBody.get('normalization', None)
            split_data = requestBody.get('train_test_split', '0.2')
            X_train, X_test, y_train, y_test=DataProcessing(requestBody['file_url'],targetCol,"regression","text/csv",split_data).get_processed_data_with_split()
            pca = requestBody.get('pca', False)
            pca_features = requestBody.get('pca_features', None)
            if pca is True:
                X_train=PCA(n_components=pca_features).fit_transform(X_train)
                X_test=PCA(n_components=pca_features).fit_transform(X_test)
            model=Model(LinearRegression(),normalization).get_model()
            model.fit(X_train, y_train)
            return JsonResponse(RegressionAnalysis(model,X_train,X_test,y_train,y_test).to_json(), status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            print(str(e))
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)