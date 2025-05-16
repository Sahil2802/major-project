import json
import numpy as np
from PIL import Image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Flatten
import lightgbm as lgb

# Load the same feature extractor used in training
def get_feature_extractor():
    base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    for layer in base_model.layers:
        layer.trainable = False
    features = Flatten()(base_model.output)
    return Model(inputs=base_model.input, outputs=features)

def load_resources():
    """Load the trained model and class information"""
    # Load your trained LightGBM model
    model = lgb.Booster(model_file='lightgbm_model.txt')  # or your saved model file
    
    # Load class information
    with open('class_info.json') as f:
        class_info = json.load(f)
    
    return model, class_info

def predict_leaf(image_path, model, class_info, feature_extractor):
    """Predict the class of a leaf image"""
    # Preprocess
    img = Image.open(image_path).resize((224, 224))
    img_array = np.expand_dims(np.array(img), axis=0)
    img_array = preprocess_input(img_array)
    
    # Extract features (will output shape (1, 25088))
    features = feature_extractor.predict(img_array)
    
    # Predict
    proba = model.predict(features)[0]
    class_idx = np.argmax(proba)
    
    return {
        'class': class_info['label_encoder'][class_idx],
        'confidence': float(proba[class_idx]),
        'all_probs': dict(zip(class_info['label_encoder'], proba.tolist()))
    }

def main():
    # Initialize resources
    feature_extractor = get_feature_extractor()
    model, class_info = load_resources()
    
    # Example prediction
    image_path = r'D:\Projects\ML-projects\Medicinal Plants Classification\testing\__0_2979262.png'
    result = predict_leaf(image_path, model, class_info, feature_extractor)
    
    print("Prediction Result:")
    print(f"Class: {result['class']}")
    print(f"Confidence: {result['confidence']:.2%}")
    print("\nAll probabilities:")
    for cls, prob in result['all_probs'].items():
        print(f"{cls}: {prob:.2%}")

if __name__ == "__main__":
    main()