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
                request_data = json.loads(request.POST.get('json_data', '{}'))
                #print(request_data)

                dropColumns = request_data.get('drop_columns', [])
                #print(dropColumns)
                df = df[[col for col in df if col not in dropColumns] + dropColumns]

                features = df.drop(columns=dropColumns)

                scaler = MinMaxScaler()

                scaler.fit(features)

                scaled_data = scaler.transform(features)

                scaled_df = pd.DataFrame(data=scaled_data, columns=features.columns)

                final_df = pd.concat([df[dropColumns], scaled_df], axis=1)

                # Round the values to 5 decimal points.
                final_df = final_df.round(5)

                final_json = final_df.to_json(orient='records')

                scaled_csv_filename = 'D:\csv dump\scaled_data.csv'  # Choose a filename and path.
                final_df.to_csv(scaled_csv_filename, index=False)

                return JsonResponse({'message': 'File uploaded, processed, and scaled successfully.', 'scaledData': final_json})
            else:
                return JsonResponse({'message': 'No file was uploaded.'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
    return JsonResponse({'message': 'Invalid request method.'}, status=405)
