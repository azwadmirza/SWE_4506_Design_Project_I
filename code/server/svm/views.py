from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from library.data_preprocessing import DataProcessing
from library.model import Model
from library.classification_analysis import ClassificationAnalysis
from library.regression_analysis import RegressionAnalysis
from sklearn import svm
from sklearn.decomposition import PCA


class svmClassification(APIView):
    queryset = []

    permission_classes = []
    def get(self, request):
        return Response('Support Vector Machines Model Working...', status=status.HTTP_200_OK)
    
    def post(self, request):
        requestBody = request.data
        iter = requestBody.get('max_iter', None)
        kernel = requestBody.get('kernel', None)
        split_data = requestBody.get('train_test_split', None)
        targetCol = requestBody.get('target', None)
        normalisation = requestBody.get('normalization', None)
        degree = requestBody.get('degree', None)
        is_multiclass = DataProcessing(requestBody['file_url'], targetCol, 'class', "text/csv", split_data).isMultiClass()
        X_train, X_test, y_train, y_test = DataProcessing(requestBody['file_url'],targetCol,'class',"text/csv",split_data).get_processed_data_with_split()
        pca = requestBody.get('pca', False)
        pca_features = requestBody.get('pca_features', None)
        if pca is True:
            X_train=PCA(n_components=pca_features).fit_transform(X_train)
            X_test=PCA(n_components=pca_features).fit_transform(X_test)
        if is_multiclass:
            if kernel.lower() in ['poly']:
                model = Model(svm.SVC(kernel=kernel, degree=degree, max_iter=iter, decision_function_shape='ovr',random_state=42, probability=True ),normalisation).get_model()
            else:
                model = Model(svm.SVC(kernel=kernel, max_iter=iter, decision_function_shape='ovr',random_state=42, probability=True ),normalisation).get_model()
        else:
            if kernel.lower() in ['poly']:
                model = Model(svm.SVC(kernel=kernel, degree=degree, max_iter=iter, decision_function_shape='ovo',random_state=42, probability=True ),normalisation).get_model()
            else:
                model = Model(svm.SVC(kernel=kernel, max_iter=iter, decision_function_shape='ovo',random_state=42, probability=True ),normalisation).get_model()

        model.fit(X_train,y_train)
        return Response(ClassificationAnalysis(model,X_train,X_test,y_train,y_test).to_json(), status=status.HTTP_200_OK)
    
class svmRegression(APIView):
    queryset = []

    permission_classes = []
    def get(self, request):
        return Response('Support Vector Machines Model Working...', status=status.HTTP_200_OK)
    
    def post(self, request):
        requestBody = request.data
        iter = requestBody.get('max_iter', None)
        kernel = requestBody.get('kernel', None)
        split_data = requestBody.get('train_test_split', None)
        targetCol = requestBody.get('target', None)
        normalisation = requestBody.get('normalization', None)
        degree = requestBody.get('degree', None)

        X_train, X_test, y_train, y_test = DataProcessing(requestBody['file_url'], targetCol, 'regression', "text/csv", split_data).get_processed_data_with_split()
        pca = requestBody.get('pca', False)
        pca_features = requestBody.get('pca_features', None)
        if pca is True:
            X_train=PCA(n_components=pca_features).fit_transform(X_train)
            X_test=PCA(n_components=pca_features).fit_transform(X_test)
        if kernel.lower() in ['poly']:
            model = Model(svm.SVR(kernel=kernel, degree=degree, max_iter=iter), normalisation).get_model()
        else:
            model = Model(svm.SVR(kernel=kernel, max_iter=iter), normalisation).get_model()

        model.fit(X_train, y_train)
        return Response(RegressionAnalysis(model, X_train, X_test, y_train, y_test).to_json(), status=status.HTTP_200_OK)