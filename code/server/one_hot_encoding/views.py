from django.shortcuts import render
import pandas as pd
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from io import BytesIO
from sklearn.preprocessing import OneHotEncoder

@csrf_exempt
def OneHotEncoding(request):
    if request.method == 'POST':
        try:
            uploaded_file = request.FILES.get('file')

            if uploaded_file:
                df = pd.read_csv(uploaded_file)

                categorical_columns = df.select_dtypes(include=['object']).columns

                encoder = OneHotEncoder(sparse=False, drop='first')
                
                encoded_data = encoder.fit_transform(df[categorical_columns])
                
                encoded_df = pd.DataFrame(encoded_data, columns=encoder.get_feature_names_out(categorical_columns))

                final_df = pd.concat([encoded_df, df.drop(columns=categorical_columns)], axis=1)

                        
                final_json = final_df.to_json(orient='records')

                encoded_csv_filename = 'C:\\csv dump\\encoded_data.csv'
                final_df.to_csv(encoded_csv_filename, index=False)
                return JsonResponse({'message': 'File uploaded, processed, and mode encoded successfully.', 'encodedData': final_json})
            else:
                return JsonResponse({'message': 'No file was uploaded.'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
    return JsonResponse({'message': 'Invalid request method.'}, status=405)
