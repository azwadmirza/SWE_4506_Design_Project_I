from django.contrib import admin
from django.urls import path,include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('gateway.urls')),
    path('api/profile/', include('user_profile.urls')),
    path('api/file/', include('file_controller.urls')),
    path('api/decision_tree/', include('decision_tree.urls')),
    path('api/linear_regression/', include('linear_regression.urls')),
    path('api/logistic_regression/', include('logistic_regression.urls')),
    path('api/svm/', include('svm.urls')),
    path('api/xgboost/', include('xgBoost.urls')),
    path('api/naive_bayes/', include('naive_bayes.urls')),
    path('api/knn/', include('knn.urls')),
    path('api/optimized_model_search/', include('optimized_model_search.urls')),
    path('api/best/',include('inference.urls'))
]

