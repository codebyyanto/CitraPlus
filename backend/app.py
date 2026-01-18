from flask import Flask, request, jsonify
from flask_cors import CORS
import image_utils
import traceback

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/process', methods=['POST'])
def process():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400
            
        file = request.files['image']
        image_bytes = file.read()
        
        radius = float(request.form.get('radius', 1.0))
        amount = float(request.form.get('amount', 1.0))
        threshold = float(request.form.get('threshold', 0))
        
        # 'true' from JS FormData comes as string 'true'
        use_ai = request.form.get('ai') == 'true'
        mode = request.form.get('mode', 'photo')
        
        result = image_utils.process_image_pipeline(
            image_bytes, 
            radius=radius, 
            amount=amount, 
            threshold=threshold,
            ai_mode=use_ai,
            doc_mode=(mode == 'document')
        )
        
        return jsonify(result)

    except Exception as e:
        print("Error processing request:")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
