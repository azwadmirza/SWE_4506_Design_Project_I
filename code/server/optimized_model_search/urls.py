from django.urls import path
from . import views

urlpatterns = [
     path('classification/xgboost/', views.xgboost_classification_grid_search.as_view(), name='knn_model'),
     path('regression/xgboost/', views.xgboost_regression_grid_search.as_view(), name='knn_tree'),
     path('classification/decision_tree/', views.decision_tree_classification_grid_search.as_view(), name='knn_model'),
     path('regression/decision_tree/', views.decision_tree_regression_grid_search.as_view(), name='knn_tree'),
     path('classification/svm/', views.svm_classification_grid_search.as_view(), name='knn_model'),
     path('regression/svm/', views.svm_regression_grid_search.as_view(), name='knn_tree'),
     path('classification/knn/.', views.knn_classification_grid_search.as_view(), name='knn_model'),
     path('regression/knn/', views.knn_regression_grid_search.as_view(), name='knn_tree'),
     path('classification/logistic/.', views.logistic_regression_grid_search.as_view(), name='knn_model'),
     path('classification/naive-bayes/.', views.naive_bayes_classification_grid_search.as_view(), name='knn_model'),
     path('regression/linear/', views.linear_regression_grid_search.as_view(), name='knn_tree'),
]