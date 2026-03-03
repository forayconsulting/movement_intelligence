# Image Generation Style Guide

## Model
Use **Gemini Nano Banana 2** (or Nano Banana Pro for higher fidelity).

## Consistency Rules
Every prompt below starts with the same **style preamble**. This is critical -- it anchors the model to a consistent visual language across all outputs. Do NOT modify the preamble between generations.

If generating in Gemini's chat interface, **generate all images within the same conversation session** to maximize style consistency.

## Settings Per Image
- **Aspect ratio**: Specified per prompt
- **Resolution**: 2K or higher if available
- **Thinking mode**: High (if using API)

## Post-Processing Notes
- Body images (1-4) will be used as UI elements with SVG overlays on top
- They need **solid white backgrounds** -- do NOT request transparent
- Front/back pairs must be **proportionally identical** (same figure, same height, same arm/leg positions)
- Muscle layer images must **align exactly** with their skin-layer counterpart (same pose, same proportions, same framing)

## Style Preamble (Shared)
The following block appears at the start of every prompt and must not be altered:

> In the style of a modern wellness editorial illustration: clean, soft contour lines with minimal anatomical detail. Flat color fills with subtle warm shading. The color palette is muted and calming -- soft ivory skin tones, warm taupe and bronze shadows, accents of dusty sage and muted rose. The aesthetic is therapeutic and approachable, like a high-end wellness brand. Simplified, elegant human anatomy with smooth contours. No text, no labels, no watermarks. Solid white background.
