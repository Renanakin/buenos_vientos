from rembg import remove
from PIL import Image

input_path = 'public/images/logo.png'
output_path = 'public/images/logo_transparent.png'

print("Processing image...")
try:
    input_image = Image.open(input_path)
    # The image might have an alpha channel already but with white pixels. rembg handles this.
    output_image = remove(input_image)
    output_image.save(output_path)
    print("Background removed successfully.")
except Exception as e:
    print(f"Error processing image: {e}")
