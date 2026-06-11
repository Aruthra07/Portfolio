import os
import shutil
import fitz  # PyMuPDF

src_dir = r"c:\Users\aruth\OneDrive\Desktop\SAMPLE PORTFOLIO\poftfolio images"
dest_dir = r"c:\Users\aruth\OneDrive\Desktop\SAMPLE PORTFOLIO\public\poftfolio images"

os.makedirs(dest_dir, exist_ok=True)
os.makedirs(os.path.join(dest_dir, "oracle"), exist_ok=True)

def process_dir(current_src, current_dest):
    for item in os.listdir(current_src):
        src_path = os.path.join(current_src, item)
        dest_path = os.path.join(current_dest, item)
        
        if os.path.isdir(src_path):
            os.makedirs(dest_path, exist_ok=True)
            process_dir(src_path, dest_path)
        elif os.path.isfile(src_path):
            ext = os.path.splitext(item)[1].lower()
            # Copy the original file (pdf or image)
            shutil.copy2(src_path, dest_path)
            print(f"Copied: {item}")
            
            # If it's a PDF, convert the first page to PNG
            if ext == '.pdf':
                try:
                    doc = fitz.open(src_path)
                    if len(doc) > 0:
                        page = doc[0]  # get first page
                        # Render at double resolution (2.0x zoom) for high quality
                        zoom = 2.0
                        mat = fitz.Matrix(zoom, zoom)
                        pix = page.get_pixmap(matrix=mat)
                        
                        png_name = os.path.splitext(item)[0] + ".png"
                        png_path = os.path.join(current_dest, png_name)
                        pix.save(png_path)
                        print(f"Converted: {item} -> {png_name}")
                except Exception as e:
                    print(f"Error converting {item}: {e}")

process_dir(src_dir, dest_dir)
print("Finished conversion and copying!")
