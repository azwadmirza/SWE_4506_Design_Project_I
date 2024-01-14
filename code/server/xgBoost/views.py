from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from library.data_preprocessing import DataProcessing
from sklearn.preprocessing import LabelEncoder
from library.model import Model
from library.classification_analysis import ClassificationAnalysis
from xgboost import XGBClassifier

# Create your views here.
class xgboost_model(APIView):
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
        X_train, X_test, y_train, y_test = DataProcessing(requestBody['file_url'],targetCol,'class',"text/csv",split_data).get_processed_data_with_split()
        model = Model(XGBClassifier(booster,max_depth=depth,tree_method=tree_method,grow_policy=grow_policy,reg_alpha=reg_alpha,reg_lambda=reg_lambda,subsample=subsample,enable_categorical=True),normalisation).get_model()
        model.fit(X_train,y_train)
        return Response(ClassificationAnalysis(model,X_train,X_test,y_train,y_test).to_json(), status=status.HTTP_200_OK)