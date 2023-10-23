from django.shortcuts import render
import pandas as pd
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.preprocessing import MinMaxScaler
from io import BytesIO

@csrf_exempt
def MinMaxNorm(request):
    if request.method == 'POST':
        try:
            uploaded_file = request.FILES.get('file')

            if uploaded_file:
                df = pd.read_csv(uploaded_file)
                #request_data = json.loads(request.POST.get('json_data', '{}'))
                #print(request_data)

                #dropColumns = request_data.get('drop_columns', [])
                #print(dropColumns)
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
    return JsonResponse({'message': 'Invalid request method.'}, status=405)