from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from library.data_preprocessing import DataProcessing
from library.model import Model
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score, roc_curve
from sklearn.preprocessing import label_binarize
import json

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

        model.fit(X_train, y_train)

        predictions_Xtest = model.predict(X_test)

        predictions_Xtrain = model.predict(X_train)

        accuracy_test = accuracy_score(y_test, predictions_Xtest)

        accuracy_train = accuracy_score(y_train, predictions_Xtrain)

        conf_matrix_test = confusion_matrix(y_test, predictions_Xtest).tolist()  
        
        class_report_test = classification_report(y_test, predictions_Xtest, output_dict=True)
        
        conf_matrix_train = confusion_matrix(y_train, predictions_Xtrain).tolist()  

        class_report_train = classification_report(y_train, predictions_Xtrain, output_dict=True)

        print(model.classes_)
        if len(model.classes_) == 2:
            y_proba_test = model.predict_proba(X_test)[:, 1] 

            auc_scores_test = roc_auc_score(y_test, y_proba_test)

            y_proba_train = model.predict_proba(X_train)[:, 1] 

            auc_scores_train = roc_auc_score(y_train, y_proba_train)

            tpr_test_per_class = []
            fpr_test_per_class = []
            
            tpr_train_per_class = []
            fpr_train_per_class = []


            tpr, fpr, _ = roc_curve(label_binarize(y_train, classes=[0,1]), y_proba_train)

            tpr_train_per_class.append(json.dumps(tpr.tolist()))
            fpr_train_per_class.append(json.dumps(fpr.tolist()))

            tpr, fpr, _ = roc_curve(label_binarize(y_test, classes=[0,1]), y_proba_test)

            tpr_test_per_class.append(json.dumps(tpr.tolist()))
            fpr_test_per_class.append(json.dumps(fpr.tolist()))

            test_avg_tpr = tpr_test_per_class
            test_avg_fpr = fpr_test_per_class
            train_avg_tpr = tpr_train_per_class
            train_avg_fpr = fpr_train_per_class

            print(tpr)
        elif len(model.classes_) > 1:
            y_proba_test = model.predict_proba(X_test)

            y_test_binary = label_binarize(y_test, classes=model.classes_)

            auc_scores_test = {}

            for i in range(len(model.classes_)):
                auc_scores_test[model.classes_[i]] = roc_auc_score(y_test_binary[:, i], y_proba_test[:, i])

            y_proba_train = model.predict_proba(X_train)

            y_train_binary = label_binarize(y_train, classes=model.classes_)

            auc_scores_train = {}

            for i in range(len(model.classes_)):
                auc_scores_train[model.classes_[i]] = roc_auc_score(y_train_binary[:, i], y_proba_train[:, i])

            tpr_test_per_class = []
            fpr_test_per_class = []

            for i in range(len(model.classes_)):
                fpr, tpr, _ = roc_curve(label_binarize(y_test, classes=model.classes_)[:, i], y_proba_test[:, i])
                tpr_test_per_class.append(tpr)
                fpr_test_per_class.append(fpr)

            tpr_train_per_class = []
            fpr_train_per_class = []

            for i in range(len(model.classes_)):
                fpr, tpr, _ = roc_curve(label_binarize(y_train, classes=model.classes_)[:, i], y_proba_train[:, i])
                tpr_train_per_class.append(tpr)
                fpr_train_per_class.append(fpr)

            test_avg_tpr = np.mean((np.array(tpr_test_per_class)), axis=0)
            test_avg_fpr = np.mean((np.array(fpr_test_per_class)), axis=0)
            train_avg_tpr = np.mean((np.array(tpr_train_per_class)), axis=0)
            train_avg_fpr = np.mean((np.array(fpr_train_per_class)), axis=0)


        else:
            auc_scores_test = 'Not defined'
            auc_scores_train = 'Not defined'
            tpr_test_per_class = 'Not defined'
            tpr_train_per_class = 'Not defined'
            fpr_test_per_class = 'Not defined'
            fpr_train_per_class = 'Not defined'
            test_avg_tpr = 'Not defined'
            test_avg_fpr = 'Not defined'
            train_avg_tpr = 'Not defined'
            train_avg_fpr = 'Not defined'

        evaluation_results = {
            'Accuracy Test': accuracy_test,
            'Accuracy Train': accuracy_train,
            'Confusion Matrix Test': conf_matrix_test,
            'Classification Report Test': class_report_test,
            'Confusion Matrix Train': conf_matrix_train,
            'Classification Report Train': class_report_train,
            'True Positive Rate Test': tpr_test_per_class,
            'True Positive Rate Train': tpr_train_per_class,
            'False Positive Rate Test': fpr_test_per_class,
            'False Positive Rate Train': fpr_train_per_class,
            'True Positive Rate Test Average': test_avg_tpr,
            'False Positive Rate Test Average': test_avg_fpr,
            'True Positive Rate Train Average': train_avg_tpr,
            'False Positive Rate Train Average': train_avg_fpr,
            'AUC Score Test': auc_scores_test,
            'AUC Score Train': auc_scores_train,
            'Classes': model.classes_
        }
        return Response(evaluation_results, status=status.HTTP_200_OK)