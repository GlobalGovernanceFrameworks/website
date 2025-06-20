#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first:"
    echo "sudo apt-get install imagemagick"
    exit 1
fi

# Check if input file exists
if [ $# -eq 0 ]; then
    echo "Usage: $0 <input.svg>"
    exit 1
fi

INPUT_SVG="$1"
if [ ! -f "$INPUT_SVG" ]; then
    echo "Input file $INPUT_SVG not found!"
    exit 1
fi

# Create output directory if it doesn't exist
OUTPUT_DIR="app-icons"
mkdir -p "$OUTPUT_DIR"

echo "🎨 Creating icons from $INPUT_SVG..."

# Function to create PNG from SVG
create_png() {
    local size="$1"
    local output="$2"
    echo "Creating $output ($size x $size)..."
    convert -background none "$INPUT_SVG" -resize "${size}x${size}" "$OUTPUT_DIR/$output"
}

# Create various PNG sizes
echo "📏 Generating PNGs of various sizes..."
create_png 16 "favicon-16.png"
create_png 32 "favicon-32.png"
create_png 48 "favicon-48.png"
create_png 64 "favicon-64.png"
create_png 128 "favicon-128.png"
create_png 144 "ms-tile-144.png"
create_png 152 "apple-touch-icon-152.png"
create_png 167 "apple-touch-icon-167.png"
create_png 180 "apple-touch-icon-180.png"
create_png 192 "logo192.png"
create_png 250 "logo250.png"
create_png 256 "logo256.png"
create_png 512 "logo512.png"
create_png 600 "logo600.png"
create_png 1200 "logo1200.png"
create_png 32 "favicon.png"

# Create favicon.ico with multiple sizes
echo "🎯 Creating favicon.ico..."
convert "$OUTPUT_DIR/favicon-16.png" \
        "$OUTPUT_DIR/favicon-32.png" \
        "$OUTPUT_DIR/favicon-48.png" \
        "$OUTPUT_DIR/favicon-64.png" \
        "$OUTPUT_DIR/favicon.ico"

# Create Apple Touch Icons
echo "🍎 Creating Apple Touch Icons..."
# Add slight padding for Apple icons (90% of original size with padding)
convert -background none "$INPUT_SVG" \
        -resize "162x162" -gravity center -extent "180x180" \
        "$OUTPUT_DIR/apple-touch-icon.png"

# Create maskable icons (with padding to ensure safe area)
echo "🎭 Creating maskable icons..."
# Add padding for maskable icons (80% of original size with padding)
convert -background none "$INPUT_SVG" \
        -resize "154x154" -gravity center -extent "192x192" \
        "$OUTPUT_DIR/maskable_icon192.png"
convert -background none "$INPUT_SVG" \
        -resize "410x410" -gravity center -extent "512x512" \
        "$OUTPUT_DIR/maskable_icon512.png"

echo "✨ Creating PWA splash screen images..."
# Create splash screen images for various device sizes
declare -a splash_sizes=(
    "320x568"   # iPhone 5/SE
    "375x667"   # iPhone 6/7/8
    "414x736"   # iPhone 6/7/8 Plus
    "375x812"   # iPhone X/XS
    "414x896"   # iPhone XR/XS Max
    "768x1024"  # iPad
    "1024x1366" # iPad Pro
)

for size in "${splash_sizes[@]}"; do
    width=${size%x*}
    height=${size#*x}
    # Calculate logo size (40% of smaller screen dimension)
    logo_size=$((width < height ? width * 40 / 100 : height * 40 / 100))
    
    convert -size "${size}" xc:white \
            \( "$INPUT_SVG" -resize "${logo_size}x${logo_size}" \) \
            -gravity center -composite \
            "$OUTPUT_DIR/splash-${size}.png"
done

# Create a Safari pinned tab SVG (monochrome)
echo "🧭 Creating Safari pinned tab icon..."
convert "$INPUT_SVG" -colorspace gray "$OUTPUT_DIR/safari-pinned-tab.svg"

# Create EPS file for print applications
echo "🖨️ Creating EPS file for print applications..."

# Try multiple methods for EPS generation
if command -v inkscape &> /dev/null; then
    echo "Using Inkscape for EPS generation..."
    inkscape "$INPUT_SVG" --export-eps="$OUTPUT_DIR/logo.eps" 2>/dev/null || \
    inkscape "$INPUT_SVG" --export-filename="$OUTPUT_DIR/logo.eps" --export-type=eps 2>/dev/null
elif command -v rsvg-convert &> /dev/null; then
    echo "Using rsvg-convert for EPS generation..."
    rsvg-convert -f ps -o "$OUTPUT_DIR/logo.eps" "$INPUT_SVG"
else
    echo "Trying ImageMagick for EPS generation..."
    convert "$INPUT_SVG" -background none -density 300 "$OUTPUT_DIR/logo.eps"
    
    # Check if EPS file was created successfully
    if [ ! -s "$OUTPUT_DIR/logo.eps" ]; then
        echo "⚠️  EPS creation failed. Trying alternative method..."
        # Alternative: Create high-res PNG and convert to EPS
        convert "$INPUT_SVG" -background none -density 300 -resize "3000x3000" "$OUTPUT_DIR/temp_hires.png"
        convert "$OUTPUT_DIR/temp_hires.png" "$OUTPUT_DIR/logo.eps"
        rm -f "$OUTPUT_DIR/temp_hires.png"
    fi
fi

# Verify EPS file was created
if [ -s "$OUTPUT_DIR/logo.eps" ]; then
    echo "✅ EPS file created successfully"
else
    echo "❌ EPS creation failed. Consider installing Inkscape: sudo apt-get install inkscape"
fi

# Create additional vector formats
echo "🎯 Creating additional vector formats..."
# Create PDF version
convert "$INPUT_SVG" -background none "$OUTPUT_DIR/logo.pdf"

# Create high-resolution TIFF for print
convert "$INPUT_SVG" -background none -density 300 -resize "3000x3000" \
        -compress lzw "$OUTPUT_DIR/logo-print.tiff"

echo "✅ All done! Icons have been created in the $OUTPUT_DIR directory"
echo "
Generated files:
- favicon.ico (multi-size)
- favicon.png
- favicon-16.png
- favicon-32.png
- favicon-48.png
- favicon-64.png
- favicon-128.png
- logo192.png
- logo250.png
- logo256.png
- logo512.png
- logo600.png
- logo1200.png
- maskable_icon192.png
- maskable_icon512.png
- apple-touch-icon.png
- apple-touch-icon-152.png
- apple-touch-icon-167.png
- apple-touch-icon-180.png
- ms-tile-144.png
- safari-pinned-tab.svg
- logo.eps (for print applications)
- logo.pdf (vector format)
- logo-print.tiff (high-res print format)
- Various splash screen images
"

# Optional: Create a ZIP archive of all generated icons
read -p "Would you like to create a ZIP archive of all icons? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    zip -r app-icons.zip "$OUTPUT_DIR"
    echo "📦 Created app-icons.zip"
fi
