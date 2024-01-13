from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score, roc_curve
from sklearn.preprocessing import label_binarize
import json
from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler

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
        split_data = requestBody.get('train_test_split', None)/100
        targetCol = requestBody.get('target', None)
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
        normalisation = requestBody.get('normalization', None)

=======
>>>>>>> 0a16c51838873919be81c88b3b5ad7c6472dbddc
>>>>>>> Stashed changes
        df = pd.read_csv(requestBody['file_url'])

        if targetCol is not None:
            if df[targetCol].dtype != 'object':
                return Response('This target is not suitable for classification', status=status.HTTP_400_BAD_REQUEST)
            x = df.drop(targetCol, axis=1)
            # y = pd.get_dummies(df[targetCol], drop_first=True).iloc[:, 0] 
            y = df[targetCol]
        else:
            x = df.iloc[:, :-1] 
            # y = pd.get_dummies(df.iloc[:, -1], drop_first=True).iloc[:, 0] 
            y = df.iloc[:, -1]

        categorical_columns = x.select_dtypes(include=['object']).columns
        if not categorical_columns.empty:
            x = pd.get_dummies(x, columns=categorical_columns)

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

        numerical_columns = X_train.select_dtypes(include=['float64', 'int64']).columns
        non_numerical_columns = X_train.select_dtypes(include=['object']).columns

        if normalisation is not None:
            X_train_scaled = X_train.copy()  
            X_test_scaled = X_test.copy()
            if normalisation == 'MinMaxScaler':
                scaler = MinMaxScaler()
                X_train_scaled[numerical_columns] = scaler.fit_transform(X_train[numerical_columns])
                X_test_scaled[numerical_columns] = scaler.transform(X_test[numerical_columns])
            elif normalisation == 'StandardScaler':
                scaler = StandardScaler()
                X_train_scaled[numerical_columns] = scaler.fit_transform(X_train[numerical_columns])
                X_test_scaled[numerical_columns] = scaler.transform(X_test[numerical_columns])
            else:
                scaler = RobustScaler
                X_train_scaled[numerical_columns] = scaler.fit_transform(X_train[numerical_columns])
                X_test_scaled[numerical_columns] = scaler.transform(X_test[numerical_columns])

            model.fit(X_train_scaled, y_train)
        else:
            model.fit(X_train, y_train)

        predictions_Xtest = model.predict(X_test)

        predictions_Xtrain = model.predict(X_train)

        #Calculate accuracy, confusion matrix, classification report
        accuracy_test = accuracy_score(y_test, predictions_Xtest)

        accuracy_train = accuracy_score(y_train, predictions_Xtrain)

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
        conf_matrix_test = confusion_matrix(y_test, predictions_Xtest)

        class_report_test = classification_report(y_test, predictions_Xtest, output_dict=True, zero_division=0)

        conf_matrix_train = confusion_matrix(y_train, predictions_Xtrain)
=======
>>>>>>> Stashed changes
        conf_matrix_test = confusion_matrix(y_test, predictions_Xtest).tolist()  
        
        class_report_test = classification_report(y_test, predictions_Xtest, output_dict=True)
        
        conf_matrix_train = confusion_matrix(y_train, predictions_Xtrain).tolist()  
<<<<<<< Updated upstream
=======
>>>>>>> 0a16c51838873919be81c88b3b5ad7c6472dbddc

        class_report_train = classification_report(y_train, predictions_Xtrain, output_dict=True, zero_division=0)

        print(model.classes_)

        #AUC Score calculation
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
                # tpr_avg = sum(tpr)/len(tpr)
                # fpr_avg = sum(fpr)/len(fpr)
                tpr_test_per_class.append(tpr)
                fpr_test_per_class.append(fpr)

            # Calculate TPR and FPR for every class in the train set
            tpr_train_per_class = []
            fpr_train_per_class = []

            for i in range(len(model.classes_)):
                fpr, tpr, threshold = roc_curve(label_binarize(y_train, classes=model.classes_)[:, i], y_proba_train[:, i])
                # tpr_avg = sum(tpr)/len(tpr)
                # fpr_avg = sum(fpr)/len(fpr)
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
>>>>>>> Stashed changes


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