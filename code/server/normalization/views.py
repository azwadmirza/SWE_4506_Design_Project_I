from django.shortcuts import render
import pandas as pd
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

                # Assuming the data frame has multiple features to be normalized.
                dropColumns = ['price', 'mainroad', 'guestroom', 'basement', 'hotwater', 'airconditioning', 'prefarea', 'furnishingstatus']
                features = df.drop(columns=dropColumns)

                scaler = MinMaxScaler()

                scaler.fit(features)

                scaled_data = scaler.transform(features)

                scaled_df = pd.DataFrame(data=scaled_data, columns=features.columns)

                scaled_df = scaled_df.round(5)

                scaled_json = scaled_df.to_json(orient='records')

                scaled_csv_filename = 'D:\csv dump\scaled_data.csv'  # Choose a filename and path.
                scaled_df.to_csv(scaled_csv_filename, index=False)

                return JsonResponse({'message': 'File uploaded, processed, and scaled successfully.', 'scaledData': scaled_json})
            else:
                return JsonResponse({'message': 'No file was uploaded.'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
    return JsonResponse({'message': 'Invalid request method.'}, status=405)
