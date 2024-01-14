import numpy as np
import pandas as pd
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report,
    roc_auc_score,
    roc_curve,
)
from sklearn.preprocessing import label_binarize
import json

class ClassificationAnalysis:
    def __init__(__self, model, X_train, X_test, y_train, y_test):
        __self.model = model
        __self.X_train = X_train
        __self.X_test = X_test
        __self.y_train = y_train
        __self.y_test = y_test
        __self.results = {}
        __self.template()
    
    def template(__self):
        __self.predict()
        __self.calculate_accuracy()
        __self.calculate_confusion_matrix()
        __self.calculate_classification_report()
        __self.calculate_roc_auc()

    def predict(__self):
        __self.predictions_Xtest = __self.model.predict(__self.X_test)
        __self.predictions_Xtrain = __self.model.predict(__self.X_train)

    def calculate_accuracy(__self):
        __self.results['Accuracy Test'] = accuracy_score(__self.y_test, __self.predictions_Xtest)
        __self.results['Accuracy Train'] = accuracy_score(__self.y_train, __self.predictions_Xtrain)

    def calculate_confusion_matrix(__self):
        __self.results['Confusion Matrix Test'] = confusion_matrix(__self.y_test, __self.predictions_Xtest).tolist()
        __self.results['Confusion Matrix Train'] = confusion_matrix(__self.y_train, __self.predictions_Xtrain).tolist()

    def calculate_classification_report(__self):
        __self.results['Classification Report Test'] = classification_report(__self.y_test, __self.predictions_Xtest, output_dict=True)
        __self.results['Classification Report Train'] = classification_report(__self.y_train, __self.predictions_Xtrain, output_dict=True)
        
    def binary_classification(__self):
            __self.y_proba_test = __self.model.predict_proba(__self.X_test)[:, 1]
            __self.y_proba_train = __self.model.predict_proba(__self.X_train)[:, 1]

            __self.results['auc_scores_test'] = roc_auc_score(__self.y_test, __self.y_proba_test)
            __self.results['auc_scores_train'] = roc_auc_score(__self.y_train, __self.y_proba_train)

            tpr_test_per_class = []
            fpr_test_per_class = []
            tpr_train_per_class = []
            fpr_train_per_class = []

            tpr, fpr, _ = roc_curve(label_binarize(__self.y_train, classes=[0, 1]), __self.y_proba_train)
            tpr_train_per_class.append(json.dumps(tpr.tolist()))
            fpr_train_per_class.append(json.dumps(fpr.tolist()))

            tpr, fpr, _ = roc_curve(label_binarize(__self.y_test, classes=[0, 1]), __self.y_proba_test)
            tpr_test_per_class.append(json.dumps(tpr.tolist()))
            fpr_test_per_class.append(json.dumps(fpr.tolist()))

            __self.results['test_avg_tpr'] = tpr_test_per_class
            __self.results['test_avg_fpr'] = fpr_test_per_class
            __self.results['train_avg_tpr'] = tpr_train_per_class
            __self.results['train_avg_fpr'] = fpr_train_per_class
            
    # def multiclass_classification(__self):
    #         __self.y_proba_test = __self.model.predict_proba(__self.X_test)
    #         __self.y_test_binary = label_binarize(__self.y_test, classes=__self.model.classes_)

    #         __self.results['auc_scores_test'] = {}

    #         for i in range(len(__self.model.classes_)):
    #             __self.results['auc_scores_test'][__self.model.classes_[i]] = roc_auc_score(
    #                 __self.y_test_binary[:, i], __self.y_proba_test[:, i]
    #             )

    #         __self.y_proba_train = __self.model.predict_proba(__self.X_train)
    #         __self.y_train_binary = label_binarize(__self.y_train, classes=__self.model.classes_)

    #         __self.results['auc_scores_train'] = {}

    #         for i in range(len(__self.model.classes_)):
    #             __self.results['auc_scores_train'][__self.model.classes_[i]] = roc_auc_score(
    #                 __self.y_train_binary[:, i], __self.y_proba_train[:, i]
    #             )

    #         tpr_test_per_class = []
    #         fpr_test_per_class = []
    #         tpr_train_per_class = []
    #         fpr_train_per_class = []

    #         for i in range(len(__self.model.classes_)):
    #             fpr, tpr, _ = roc_curve(
    #                 label_binarize(__self.y_test, classes=__self.model.classes_)[:, i], __self.y_proba_test[:, i]
    #             )
    #             tpr_test_per_class.append(tpr)
    #             fpr_test_per_class.append(fpr)

    #         for i in range(len(__self.model.classes_)):
    #             fpr, tpr, _ = roc_curve(
    #                 label_binarize(__self.y_train, classes=__self.model.classes_)[:, i], __self.y_proba_train[:, i]
    #             )
    #             tpr_train_per_class.append(tpr)
    #             fpr_train_per_class.append(fpr)

    #         __self.results['test_avg_tpr'] = [np.mean(np.array(tpr_list)) for tpr_list in tpr_test_per_class]
    #         __self.results['test_avg_fpr'] = [np.mean(np.array(fpr_list)) for fpr_list in fpr_test_per_class]
    #         __self.results['train_avg_tpr'] = [np.mean(np.array(tpr_list)) for tpr_list in tpr_train_per_class]
    #         __self.results['train_avg_fpr'] = [np.mean(np.array(fpr_list)) for fpr_list in fpr_train_per_class]


    def multiclass_classification(__self):
        __self.y_proba_test = __self.model.predict_proba(__self.X_test)
        __self.y_test_binary = label_binarize(__self.y_test, classes=__self.model.classes_)

        __self.results['auc_scores_test'] = {}

        for i in range(len(__self.model.classes_)):
            class_label = str(__self.model.classes_[i])
            __self.results['auc_scores_test'][class_label] = roc_auc_score(
                __self.y_test_binary[:, i], __self.y_proba_test[:, i]
            )

        __self.y_proba_train = __self.model.predict_proba(__self.X_train)
        __self.y_train_binary = label_binarize(__self.y_train, classes=__self.model.classes_)

        __self.results['auc_scores_train'] = {}

        for i in range(len(__self.model.classes_)):
            class_label = str(__self.model.classes_[i])
            __self.results['auc_scores_train'][class_label] = roc_auc_score(
                __self.y_train_binary[:, i], __self.y_proba_train[:, i]
            )

        __self.results['tpr_test_per_class'] = {}
        __self.results['fpr_test_per_class'] = {}
        __self.results['tpr_train_per_class'] = {}
        __self.results['fpr_train_per_class'] = {}

        for i in range(len(__self.model.classes_)):
            class_label = str(__self.model.classes_[i])
            fpr, tpr, _ = roc_curve(
                label_binarize(__self.y_test, classes=__self.model.classes_)[:, i], __self.y_proba_test[:, i]
            )
            __self.results['tpr_test_per_class'][class_label] = tpr.tolist()
            __self.results['fpr_test_per_class'][class_label] = fpr.tolist()

        for i in range(len(__self.model.classes_)):
            class_label = str(__self.model.classes_[i])
            fpr, tpr, _ = roc_curve(
                label_binarize(__self.y_train, classes=__self.model.classes_)[:, i], __self.y_proba_train[:, i]
            )
            __self.results['tpr_train_per_class'][class_label] = tpr.tolist()
            __self.results['fpr_train_per_class'][class_label] = fpr.tolist()
            
            
    def calculate_roc_auc(__self):
        if len(__self.model.classes_) == 2:
            __self.binary_classification()
        elif len(__self.model.classes_) > 1:
            __self.multiclass_classification()
        else:
            __self.results['auc_scores_test'] = 'Not defined'
            __self.results['auc_scores_train'] = 'Not defined'
            __self.results['test_avg_tpr'] = 'Not defined'
            __self.results['test_avg_fpr'] = 'Not defined'
            __self.results['train_avg_tpr'] = 'Not defined'
            __self.results['train_avg_fpr'] = 'Not defined'

    def to_json(__self):
        print(__self.results)
        return json.dumps(__self.results)


