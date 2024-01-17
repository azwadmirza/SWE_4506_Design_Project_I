from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from library.data_preprocessing import DataProcessing
from library.model import Model
from library.classification_analysis import ClassificationAnalysis
from sklearn.linear_model import LogisticRegression
from sklearn.decomposition import PCA

class logistic_regression_model(APIView):
    queryset = []

    permission_classes = []
    
    def post(self, request):
        try:
            requestBody = request.data
            iter = requestBody.get('max_iter', None)
            penalty = requestBody.get('penalty', None)
            split_data = requestBody.get('train_test_split', None)
            targetCol = requestBody.get('target', None)
            normalization = requestBody.get('normalization', None)
            pca = requestBody.get('pca', False)
            pca_features = requestBody.get('pca_features', None)
            X_train, X_test, y_train, y_test = DataProcessing(requestBody['file_url'],targetCol,'class',"text/csv",split_data).get_processed_data_with_split()
            if pca is True:
                X_train=PCA(n_components=pca_features).fit_transform(X_train)
                X_test=PCA(n_components=pca_features).fit_transform(X_test)
            is_multiclass = DataProcessing(requestBody['file_url'], targetCol, 'class', "text/csv", split_data).isMultiClass()
            if penalty and penalty.lower() in ['l1', 'l2']:
                if is_multiclass:
                    model = Model(LogisticRegression(penalty=penalty,max_iter=iter,solver='saga'),normalization).get_model()
                else:
                    model = Model(LogisticRegression(penalty=penalty,max_iter=iter,solver='liblinear'),normalization).get_model()
            else:
                model = Model(LogisticRegression(max_iter=iter),normalization).get_model()
            model.fit(X_train,y_train)
            return Response(ClassificationAnalysis(model,X_train,X_test,y_train,y_test).to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            print(str(e))
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)