from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix, classification_report

# Create your views here.
class decision_tree_model(APIView):
    queryset = []

    permission_classes = [AllowAny]
    def get(self, request):
        return Response('Decison Tree working...', status=status.HTTP_200_OK)
    
    def post(self, request):
        requestBody = request.data
        depth = requestBody.get('max_depth', None)
        criter = requestBody.get('criterion', None)
        split_data = requestBody.get('train_test_split', None)
        targetCol = requestBody.get('target', None)

        df = pd.read_csv(requestBody['file_url'])

        if targetCol is not None:
            x = df.drop(targetCol, axis=1)
            y = df[targetCol]
        else:
            x = df.iloc[:, :-1] 
            y = df.iloc[:, -1]

        # X_train = 0 
        # X_test = 0 
        # y_train = 0 
        # y_test = 0

        if split_data is not None:
            X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=float(split_data), random_state=42)
        else:
            X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

        # model = DecisionTreeClassifier()

        if depth is not None and criter is not None:
            model = DecisionTreeClassifier(criterion=criter, max_depth=int(depth))
        elif depth is not None:
            model = DecisionTreeClassifier(max_depth=int(depth))
        elif criter is not None:
            model = DecisionTreeClassifier(criterion=criter)
        else:
            model = DecisionTreeClassifier()

        model.fit(X_train, y_train)

        predictions_Xtest = model.predict(X_test)

        predictions_Xtrain = model.predict(X_train)

        accuracy_test = accuracy_score(y_test, predictions_Xtest)

        accuracy_train = accuracy_score(y_train, predictions_Xtrain)

        conf_matrix_test = confusion_matrix(y_test, predictions_Xtest)

        class_report_test = classification_report(y_test, predictions_Xtest, output_dict=True)

        conf_matrix_train = confusion_matrix(y_train, predictions_Xtrain)

        class_report_train = classification_report(y_train, predictions_Xtrain, output_dict=True)

        evaluation_results = {
            'Accuracy Test': accuracy_test,
            'Accuracy Train': accuracy_train,
            'Confusion Matrix Test': conf_matrix_test,
            'Classification Report Test': class_report_test,
            'Confusion Matrix Train': conf_matrix_train,
            'Classification Report Train': class_report_train,
        }
        return Response(evaluation_results, status=status.HTTP_200_OK)