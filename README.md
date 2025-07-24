# Medicinal Plant Classifier

This project is a web application that classifies medicinal plants from images of their leaves. It uses a deep learning model to identify the plant species, providing a simple and intuitive interface for users to upload an image and receive a prediction.

## Features

-   **Image-based Classification:** Predicts the species of a medicinal plant from an uploaded leaf image.
-   **Background Removal:** Automatically removes the background from the uploaded image for better prediction accuracy.
-   **Web-based Interface:** A user-friendly interface built with React for easy interaction.
-   **Deep Learning Model:** Utilizes a pre-trained VGG16 model for feature extraction and a LightGBM model for classification.

## Technologies Used

### Backend

-   Python
-   Flask
-   TensorFlow/Keras
-   LightGBM
-   Pillow

### Frontend

-   React
-   Axios
-   Tailwind CSS (implicitly used via class names)

## Setup and Installation

To run this project locally, you will need to set up both the backend server and the frontend application.

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Create a virtual environment and activate it:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install Flask tensorflow lightgbm Pillow numpy
    ```

4.  **Run the Flask server:**
    ```bash
    python app.py
    ```
    The server will start on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the `Webapp` directory:**
    ```bash
    cd Webapp
    ```

2.  **Install the required npm packages:**
    ```bash
    npm install
    ```

3.  **Run the React development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be accessible at `http://localhost:5173` (or another port if specified).

## Usage

1.  Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  Click the "Choose Image" button to select an image of a medicinal plant leaf.
3.  The application will display a preview of the image with the background removed.
4.  Click the "Predict" button to classify the image.
5.  The predicted class and confidence score will be displayed on the screen.
6.  Click "Try Another Image" to perform a new prediction.

## Project Structure

```
.
├── .gitignore
├── app.py                    # Main Flask application
├── class_info.json           # Class labels and information
├── lightgbm_model.txt        # Trained LightGBM model
├── vgg16_feature_extractor.h5 # VGG16 feature extractor model
├── Webapp/                   # Frontend React application
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   └── ...
│   ├── package.json          # Frontend dependencies
│   └── ...
└── ...
```
