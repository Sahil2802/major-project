import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setResult(null);
    setLoading(true);

    try {
      const bgRemovedResponse = await axios.post('http://localhost:5000/remove-background',
        new FormData().append('image', selectedFile),
        { responseType: 'blob' }
      );

      const blob = bgRemovedResponse.data;
      const url = URL.createObjectURL(blob);
      setPreview(url);
      setFile(new File([blob], selectedFile.name, { type: 'image/png' }));
    } catch (error) {
      console.error('Background removal failed:', error);
      alert('Error removing background');
    } finally {
      setLoading(false);
    }


  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Error: Could not fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Medicinal Plant Classifier</h2>

        {!result && (
          <>
            <div className="mb-4">
              <label className="flex items-center justify-center w-full px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {file ? file.name : "Choose Image"}
              </label>
            </div>


            {preview && (
              <div className="mb-4">
                <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded border" />
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </>
        )}

        {result && (
          <div className="mt-6 text-left">
            <h3 className="text-lg font-medium text-gray-700">Prediction Result:</h3>
            <p className="text-gray-800"><strong>Class:</strong> {result.class}</p>
            <p className="text-gray-800"><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>

            <button
              onClick={handleReset}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Try Another Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
