from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler
from sklearn.pipeline import make_pipeline

class Model:
    def __init__(__self,model,normalization):
        __self.model=model
        if normalization == "MinMaxScaler":
            __self.normalization = MinMaxScaler()
        elif normalization == "StandardScaler":
            __self.normalization = StandardScaler()
        elif normalization == "RobustScaler":
            __self.normalization = RobustScaler()
        else:
            raise Exception("Invalid Normalization Must Be Applied")
        
        __self.model=make_pipeline(__self.normalization,__self.model)
        
    def get_model(_self):
        return _self.model