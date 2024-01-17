from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from library.data_preprocessing import DataProcessing
from library.model import Model
from library.classification_analysis import ClassificationAnalysis
from library.regression_analysis import RegressionAnalysis
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.decomposition import PCA

class knnClassification(APIView):
    queryset = []

    permission_classes = []
    def get(self, request):
        return Response('Decison Tree Model Working...', status=status.HTTP_200_OK)
    
    def post(self, request):
        requestBody = request.data
        split_data = requestBody.get('train_test_split', None)
        targetCol = requestBody.get('target', None)
        normalisation = requestBody.get('normalization', None)
        n_neighbours = requestBody.get('n_neighbours', None)
        if n_neighbours is None:
            return Response('n_neighbors is required', status=status.HTTP_400_BAD_REQUEST)
        p=requestBody.get('p', None)
        algorithm=requestBody.get('algorithm', None)
        distance_metric=requestBody.get('distance_metric', None)
        weights=requestBody.get('weights', None)
        X_train, X_test, y_train, y_test = DataProcessing(requestBody['file_url'],targetCol,'class',"text/csv",split_data).get_processed_data_with_split()
        pca = requestBody.get('pca', False)
        pca_features = requestBody.get('pca_features', None)
        if pca is True:
            X_train=PCA(n_components=pca_features).fit_transform(X_train)
            X_test=PCA(n_components=pca_features).fit_transform(X_test)
        model = Model(KNeighborsClassifier(n_neighbors=n_neighbours,algorithm=algorithm,p=p,weights=weights,metric=distance_metric),normalisation).get_model()   
        model.fit(X_train,y_train)
        return Response(ClassificationAnalysis(model,X_train,X_test,y_train,y_test).to_json(), status=status.HTTP_200_OK)
    
class knnRegression(APIView):
    queryset = []

    permission_classes = []
    def get(self, request):
        return Response('knn Model Working...', status=status.HTTP_200_OK)
    
    def post(self, request):
        requestBody = request.data
        print(requestBody)
        split_data = requestBody.get('train_test_split', None)
        targetCol = requestBody.get('target', None)
        normalisation = requestBody.get('normalization', None)
        n_neighbours = requestBody.get('n_neighbours', None)
        if n_neighbours is None:
            return Response('n_neighbors is required', status=status.HTTP_400_BAD_REQUEST)
        p=requestBody.get('p', None)
        algorithm=requestBody.get('algorithm', None)
        distance_metric=requestBody.get('distance_metric', None)
        weights=requestBody.get('weights', None)
        X_train, X_test, y_train, y_test = DataProcessing(requestBody['file_url'],targetCol,'class',"text/csv",split_data).get_processed_data_with_split()
        pca = requestBody.get('pca', False)
        pca_features = requestBody.get('pca_features', None)
        if pca is True:
            X_train=PCA(n_components=pca_features).fit_transform(X_train)
            X_test=PCA(n_components=pca_features).fit_transform(X_test)
        model = Model(KNeighborsRegressor(n_neighbors=n_neighbours,algorithm=algorithm,p=p,weights=weights,metric=distance_metric),normalisation).get_model()   
        model.fit(X_train,y_train)
        return Response(RegressionAnalysis(model,X_train,X_test,y_train,y_test).to_json(), status=status.HTTP_200_OK)