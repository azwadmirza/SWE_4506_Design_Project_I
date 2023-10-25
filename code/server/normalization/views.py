from django.shortcuts import render
import pandas as pd
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.preprocessing import MinMaxScaler
from io import BytesIO
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, JSONParser

class MinMaxNorm(APIView):
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
                
                original_columns = df.columns.tolist()
                
                dropColumns = [column for column in df.columns if df[column].dtype == 'object']

                df = df[[col for col in df if col not in dropColumns] + dropColumns]

                numeric_columns = [column for column in df.columns if column not in dropColumns]
                scaler = MinMaxScaler()
                scaled_data = scaler.fit_transform(df[numeric_columns])

                scaled_df = pd.DataFrame(scaled_data, columns=numeric_columns)

                final_df = pd.concat([scaled_df, df[dropColumns]], axis=1)

                final_df = final_df[original_columns]

                final_df = final_df.round(5)

                final_json = final_df.to_json(orient='records')
                
                scaled_csv_filename = 'C:\\csv dump\\scaled_data.csv'
                
                final_df.to_csv(scaled_csv_filename, index=False)

                return JsonResponse({'message': 'File uploaded, processed, and scaled successfully.', 'scaledData': final_json})
            else:
                return JsonResponse({'message': 'No file was uploaded.'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)