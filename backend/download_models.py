import os
import requests

MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')
if not os.path.exists(MODELS_DIR):
    os.makedirs(MODELS_DIR)

# Dictionary of models: Name -> URL
# FSRCNN is fast and good for real-time. EDSR is slower but better quality.
MODELS = {
    "FSRCNN_x2.pb": "https://github.com/Saafke/FSRCNN_Tensorflow/raw/master/models/FSRCNN_x2.pb",
    "EDSR_x2.pb": "https://github.com/Saafke/EDSR_Tensorflow/raw/master/models/EDSR_x2.pb"
}

def download_file(url, dest_path):
    print(f"Downloading {url}...")
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(dest_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"✅ Saved to {dest_path}")
    except Exception as e:
        print(f"❌ Failed to download {url}: {e}")

def main():
    print("--- Downloading Super Resolution AI Models ---")
    for name, url in MODELS.items():
        dest = os.path.join(MODELS_DIR, name)
        if os.path.exists(dest):
            print(f"ℹ️  {name} already exists. Skipping.")
        else:
            download_file(url, dest)
    print("--- Done ---")

if __name__ == "__main__":
    main()
