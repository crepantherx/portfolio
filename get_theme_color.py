from PIL import Image
from collections import Counter

def get_dominant_color(image_path):
    try:
        img = Image.open(image_path)
        img = img.resize((100, 100))  # Resize to speed up processing
        img = img.convert("RGB")
        
        pixels = list(img.getdata())
        most_common_color = Counter(pixels).most_common(1)[0][0]
        
        hex_color = '#{:02x}{:02x}{:02x}'.format(*most_common_color)
        print(f"Dominant Color: {hex_color}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    image_path = "/Users/sudhirsingh/.gemini/antigravity/brain/3bb12485-a323-4a96-affd-a3b0ce5f5878/uploaded_image_1765446571133.png"
    get_dominant_color(image_path)
