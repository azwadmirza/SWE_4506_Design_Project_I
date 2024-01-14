from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from library.data_preprocessing import DataProcessing
from library.model import Model
from library.classification_analysis import ClassificationAnalysis
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.metrics import r2_score
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

        
        X_train, X_test, y_train, y_test=DataProcessing(requestBody['file_url'],targetCol,'class',"text/csv",split_data).get_processed_data_with_split()
        model=Model(LinearRegression(),normalisation).get_model()
        model.fit(X_train, y_train)

        predictions_test = model.predict(X_test)

        predictions_train = model.predict(X_train)

        predictions_Whole = model.predict(X_train.append(X_test))

        # Evaluate the model
        #Mean square error
        mse_test = mean_squared_error(y_test, predictions_test)

        mse_train = mean_squared_error(y_train, predictions_train)

        mse_whole = mean_squared_error(y, predictions_Whole)

        #Root mean square error
        rmse_test = mean_squared_error(y_test, predictions_test, squared=False)

        rmse_train = mean_squared_error(y_train, predictions_train, squared=False)

        rmse_whole = mean_squared_error(y, predictions_Whole, squared=False)

        #Mean absolute error
        mae_test = mean_absolute_error(y_test, predictions_test)

        mae_train = mean_absolute_error(y_train, predictions_train)

        mae_whole = mean_absolute_error(y, predictions_Whole)

        #R2 accuracy
        r2_accuracy_test = r2_score(y_test, predictions_test)

        r2_accuracy_train = r2_score(y_train, predictions_train)

        r2_accuracy_whole = r2_score(y, predictions_Whole)

        evaluation = {
            'MSE Test': mse_test,
            'MSE Train': mse_train,
            # 'MSE Whole': mse_whole,
            'RMSE Test': rmse_test,
            'RMSE Train': rmse_train,
            # 'RMSE Whole': rmse_whole,
            'MAE Test': mae_test,
            'MAE Train': mae_train,
            # 'MAE Whole': mae_whole,
            'R2 Accuracy Test': r2_accuracy_test,
            'R2 Accuracy Train': r2_accuracy_train,
            # 'R2 Accuracy Whole': r2_accuracy_whole,
            'Predictions Whole': predictions_Whole.tolist(), 
            # 'Actual test data': y_test.tolist(),
            # 'Actual Train data': y_train.tolist(),
            # 'Actual whole data': y.tolist(),
        }
        
        return JsonResponse(evaluation, status=status.HTTP_200_OK)