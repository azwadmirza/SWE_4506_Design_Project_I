from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from library.data_preprocessing import DataProcessing
from library.model import Model
from library.classification_analysis import ClassificationAnalysis
from sklearn.tree import DecisionTreeClassifier

# Create your views here.
class decision_tree_model(APIView):
    queryset = []

    permission_classes = []
    def get(self, request):
        return Response('Decison Tree working...', status=status.HTTP_200_OK)
    
    def post(self, request):
        requestBody = request.data
        depth = requestBody.get('max_depth', None)
        criter = requestBody.get('criterion', None)
        split_data = requestBody.get('train_test_split', None)
        targetCol = requestBody.get('target', None)
        normalisation = requestBody.get('normalization', None)
        X_train, X_test, y_train, y_test = DataProcessing(requestBody['file_url'],targetCol,'class',"text/csv",split_data).get_processed_data_with_split()
        if criter is not None:
            model = Model(DecisionTreeClassifier(criterion=criter,max_depth=depth),normalisation).get_model()
        else:
            model = Model(DecisionTreeClassifier(max_depth=depth),normalisation).get_model()
        model.fit(X_train,y_train)
        return Response(ClassificationAnalysis(model,X_train,X_test,y_train,y_test).to_json(), status=status.HTTP_200_OK)