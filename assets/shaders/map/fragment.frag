#version 450

const int MAX_LAYER_COUNT = 5;

layout(location = 0) in float height;
layout(location = 0) out vec4 o_Target;

layout(set = 2, binding = 0) uniform MapMaterial {
    vec4[MAX_LAYER_COUNT] colors;
// uses array of float but has an alignement of vec4
    float[MAX_LAYER_COUNT] layer_heights;
    float map_height;
    int layer_count;
};

float saturate(float value) {
    return clamp(value, 0, 1);
}

float inverseLerp(float a, float b, float value) {
    return saturate((value - a) / (b - a));
}

void main() {
    float height = height / map_height; // normalaize height

    // set color in range [0, layer_height[0]]
    o_Target = colors[0];

    // set color in range [layer_height[i], layer_height[i + 1]]
    for (int i = 0; i < layer_count; i++) {
        float drawStrength = saturate(sign(height - layer_heights[i])); // update color if vertex is above the layer

        o_Target = o_Target * (1 - drawStrength) + colors[i + 1] * drawStrength;
    }
}