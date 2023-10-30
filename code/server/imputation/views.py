from django.shortcuts import render
import pandas as pd
import json
import openpyxl
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from io import BytesIO
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
import openpyxl


class Imputation(APIView):
    parser_classes = (MultiPartParser, JSONParser)
    permission_classes=[]
    
    def post( self, request):
        try:
            uploaded_data = None
            df = None
            if request.FILES.get('file'):
                uploaded_data = request.FILES.get('file')
                if(uploaded_data.name.endswith(".csv")):
                    df = pd.read_csv(uploaded_data)
                elif(uploaded_data.name.endswith(".xlsx")):
                    df=pd.read_excel(uploaded_data)
                elif(uploaded_data.name.endswith(".txt")):
                    df=pd.read_csv(uploaded_data, sep=request.data['delimiter'])
                elif(uploaded_data.name.endswith(".json")):
                    df=pd.read_json(uploaded_data)
                else:
                    print("Hello World")
                    return JsonResponse({'message': 'Invalid File Format'}, status=405)
            elif request.data.get("parsedJSON"):

                uploaded_data = request.data.get("parsedJSON")
                try:
                    data_list = json.loads(uploaded_data)
                    # print(data_list)
                    df = pd.read_json(data_list, orient='records')
                    print(df)
                except json.JSONDecodeError as e:
                    return JsonResponse({'message': 'Error decoding JSON: ' + str(e)}, status=400)
                except Exception as e:
                    return JsonResponse({'message': 'Error processing JSON data: ' + str(e)}, status=500)

            if uploaded_data is not None and df is not None:
                # df = pd.read_csv(uploaded_file)
                threshold = 10
                for column in df.columns:
                    dtype = df[column].dtype
                    if dtype == 'object' or df[column].nunique()<=threshold:
                        mode_value = df[column].mode().iloc[0]
                        df[column].fillna(mode_value, inplace=True)  
                    else:
                        mean_value = df[column].mean()
                        df[column].fillna(mean_value, inplace=True)
                        
                final_json = df.to_json(orient='records')
                imputed_csv_filename = 'C:\\csv dump\\imputed_data.csv'
                df.to_csv(imputed_csv_filename, index=False)
                return JsonResponse({'message': 'File uploaded, processed, and mode imputed successfully.', 'imputedData': final_json})
            else:
                return JsonResponse({'message': 'No file was uploaded.'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
