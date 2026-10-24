// Kot project — the WORKING program (…/kot-project/app/). Built by tools\make-update.ps1 from tools\app-sw.js.
// It runs the version of the program kept on this device and never takes a newer one from the site by itself:
// the program changes only from an update file («Файл → Установить обновление…», written by the page into the caches below).
//   kotapp-meta      — which version is current ({ version, prev })
//   kotapp-v-<ver>   — the program page (and the libraries of that update) of a version
//   kotapp-shell     — icons and manifest of the working program
//   kot-lib-1        — libraries from CDNs (shared with the development copy; addresses carry exact versions)
const BUNDLED = '2026.10.24-1541';   // the version this file came with (the first installation)
const LIBS = [
  "https://cdn.jsdelivr.net/gh/pissang/oidn-web@0.5.0/weights/rt_hdr_alb_nrm.tza",
  "https://cdn.jsdelivr.net/gh/pissang/oidn-web@0.5.0/weights/rt_hdr_alb_nrm_small.tza",
  "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2/dist/ort-wasm-simd-threaded.jsep.wasm",
  "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2/dist/transformers.js",
  "https://cdn.jsdelivr.net/npm/oidn-web@0.5.0/dist/oidn.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/PathTracingRenderer.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/PathTracingSceneGenerator.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/WebGLPathTracer.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/utils/BakedGeometry.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/utils/BufferAttributeUtils.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/utils/GeometryPreparationUtils.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/utils/MeshDiff.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/utils/StaticGeometryGenerator.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/utils/convertToStaticGeometry.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/utils/mergeGeometries.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/core/utils/sceneUpdateUtils.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/index.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/MaterialBase.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/fullscreen/BlendMaterial.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/fullscreen/ClampedInterpolationMaterial.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/fullscreen/DenoiseMaterial.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/pathtracing/PhysicalPathTracingMaterial.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/pathtracing/glsl/attenuate_hit_function.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/pathtracing/glsl/camera_util_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/pathtracing/glsl/direct_light_contribution_function.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/pathtracing/glsl/get_surface_record_function.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/pathtracing/glsl/index.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/pathtracing/glsl/render_structs.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/pathtracing/glsl/trace_scene_function.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/materials/surface/FogVolumeMaterial.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/objects/EquirectCamera.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/objects/PhysicalCamera.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/objects/PhysicalSpotLight.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/objects/ShapedAreaLight.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/bsdf/bsdf_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/bsdf/fog_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/bsdf/ggx_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/bsdf/index.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/bsdf/iridescence_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/bsdf/sheen_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/bvh/index.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/bvh/inside_fog_volume_function.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/bvh/ray_any_hit_function.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/common/fresnel_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/common/index.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/common/math_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/common/shape_intersection_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/common/texture_sample_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/common/util_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/rand/index.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/rand/pcg.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/rand/sobol.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/rand/stratified.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/sampling/equirect_sampling_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/sampling/index.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/sampling/light_sampling_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/sampling/shape_sampling_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/structs/camera_struct.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/structs/equirect_struct.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/structs/index.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/structs/lights_struct.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/structs/material_struct.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/shader/structs/surface_record_struct.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/textures/BlueNoiseTexture.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/textures/GradientEquirectTexture.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/textures/ProceduralEquirectTexture.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/textures/blueNoise/BlueNoiseGenerator.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/textures/blueNoise/BlueNoiseSamples.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/textures/blueNoise/utils.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/AttributesTextureArray.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/EquirectHdrInfoUniform.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/FloatAttributeTextureArray.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/LightsInfoUniformStruct.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/MaterialsTexture.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/PhysicalCameraUniform.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/RenderTarget2DArray.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/StratifiedSamplesTexture.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/stratified/StratifiedSampler.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/uniforms/stratified/StratifiedSamplerCombined.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/utils/BlurredEnvMapGenerator.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/utils/CubeToEquirectGenerator.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/utils/SobolNumberMapGenerator.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/utils/TextureUtils.js",
  "https://cdn.jsdelivr.net/npm/three-gpu-pathtracer@0.0.23/src/utils/bufferToHash.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/Constants.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/MeshBVH.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/MeshBVHNode.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/build/buildTree.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/build/buildUtils.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/build/computeBoundsUtils.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/build/geometryUtils.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/build/sortUtils.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/build/sortUtils_indirect.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/build/splitUtils.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/bvhcast.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/closestPointToGeometry.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/closestPointToGeometry_indirect.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/closestPointToPoint.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/intersectsGeometry.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/intersectsGeometry_indirect.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/raycast.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/raycastFirst.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/raycastFirst_indirect.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/raycast_indirect.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/refit.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/refit_indirect.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/cast/shapecast.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/utils/BufferStack.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/utils/intersectUtils.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/utils/iterationUtils.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/utils/iterationUtils_indirect.generated.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/core/utils/nodeBufferUtils.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/debug/Debug.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/gpu/BVHShaderGLSL.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/gpu/MeshBVHUniformStruct.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/gpu/VertexAttributeTexture.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/gpu/glsl/bvh_distance_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/gpu/glsl/bvh_ray_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/gpu/glsl/bvh_struct_definitions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/gpu/glsl/common_functions.glsl.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/index.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/math/ExtendedTriangle.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/math/MathUtilities.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/math/OrientedBox.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/math/SeparatingAxisBounds.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/objects/MeshBVHHelper.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/utils/ArrayBoxUtilities.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/utils/BufferUtils.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/utils/ExtendedTrianglePool.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/utils/ExtensionUtilities.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/utils/GeometryRayIntersectUtilities.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/utils/PrimitivePool.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/utils/StaticGeometryGenerator.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/utils/ThreeRayIntersectUtilities.js",
  "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.7.8/src/utils/TriangleUtilities.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/environments/RoomEnvironment.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/RoundedBoxGeometry.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/draco_decoder.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/draco_decoder.wasm",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/draco_wasm_wrapper.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/fflate.module.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/meshopt_decoder.module.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineMaterial.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineSegments2.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineSegmentsGeometry.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/DRACOLoader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/EXRLoader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/MTLLoader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/OBJLoader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/RGBELoader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/math/SimplexNoise.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/GTAOPass.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/MaskPass.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/OutputPass.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/Pass.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/RenderPass.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/ShaderPass.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/shaders/CopyShader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/shaders/GTAOShader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/shaders/OutputShader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/shaders/PoissonDenoiseShader.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/utils/BufferGeometryUtils.js",
  "https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
  "https://fonts.gstatic.com/s/golostext/v7/q5uCsoe9Lv5t7Meb31EcExN8hA.woff2",
  "https://fonts.gstatic.com/s/golostext/v7/q5uCsoe9Lv5t7Meb31EcExd8hLxR.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1isq129k.woff2",
  "https://fonts.gstatic.com/s/golostext/v7/q5uCsoe9Lv5t7Meb31EcEx58hLxR.woff2",
  "https://fonts.gstatic.com/s/golostext/v7/q5uCsoe9Lv5t7Meb31EcEx18hLxR.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1iIq129k.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1iAq129k.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1iEq129k.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwl1FgtIU.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlRFgtIU.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwl9FgtIU.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwl5FgtIU.woff2",
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgg.woff2",
  "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.0/dist/transformers.min.js",
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/exporters/GLTFExporter.js"
];           // the libraries of that version, cached at installation so it works offline at once
const LOCAL = {};         // Windows installation: the same libraries lie next to the program (./lib/<file>) — taken from there, no internet
const META = 'kotapp-meta', KEY = '/__kotapp/current', PRE = 'kotapp-v-', SHELL_C = 'kotapp-shell', LIB = 'kot-lib-1';
const SHELL = ['./manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png', './icons/maskable-512.png'];
const CDN = /^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
const page = () => new URL('./index.html', self.registration.scope).href;

async function meta(){ const c = await caches.open(META), r = await c.match(KEY); return r ? r.json() : null; }
async function setMeta(m){ const c = await caches.open(META); await c.put(KEY, new Response(JSON.stringify(m), { headers:{ 'Content-Type':'application/json' } })); }

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const sh = await caches.open(SHELL_C);
    await Promise.all(SHELL.map(u => fetch(u, { cache:'no-store' }).then(r => r.ok && sh.put(u, r)).catch(() => {})));
    // the first installation: keep the program page that came with this version
    if (!(await meta())){
      const r = await fetch('./index.html', { cache:'no-store' });
      if (!r.ok) throw new Error('no program page');
      const c = await caches.open(PRE + BUNDLED); await c.put(page(), r.clone()); await c.put(self.registration.scope, r);
      await setMeta({ version:BUNDLED, prev:null, at:Date.now() });
    }
    const l = await caches.open(LIB);
    for (const u of LIBS){
      if (await l.match(u)) continue;
      try {
        if (LOCAL[u]){ const r = await fetch('./lib/' + LOCAL[u].f, { cache:'no-store' }); if (r.ok){ await l.put(u, new Response(await r.arrayBuffer(), { headers:{ 'Content-Type':LOCAL[u].t } })); continue; } }
        const r = await fetch(u, { mode:'cors' }); if (r.ok) await l.put(u, r);
      } catch (err){}
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url), scope = self.registration.scope;
  // the program page: always the version kept on this device
  if (req.mode === 'navigate' || (req.url.startsWith(scope) && /\/(?:index\.html)?$/.test(url.pathname))){
    e.respondWith((async () => {
      const m = await meta();
      if (m){ const c = await caches.open(PRE + m.version), hit = (await c.match(page())) || (await c.match(scope));
        if (hit) return hit;
        // the chosen version is missing (cleared storage): fall back to the previous one
        if (m.prev){ const p = await caches.open(PRE + m.prev), h2 = await p.match(page()); if (h2){ await setMeta({ version:m.prev, prev:null, at:Date.now() }); return h2; } } }
      try { return await fetch(req); } catch (err){ return new Response('<!doctype html><meta charset="utf-8"><title>Kot project</title><p style="font:16px sans-serif;padding:24px">Программа ещё не сохранена на этом устройстве. Откройте её один раз с интернетом.</p>', { headers:{ 'Content-Type':'text/html; charset=utf-8' } }); }
    })());
    return;
  }
  // icons and manifest of the working program
  if (req.url.startsWith(scope)){
    e.respondWith((async () => (await caches.match(req, { cacheName:SHELL_C, ignoreSearch:true })) || fetch(req))());
    return;
  }
  // libraries: from the current version, then the shared offline cache, then the network (and keep them)
  if (CDN.test(req.url)){
    e.respondWith((async () => {
      const m = await meta();
      if (m){ const c = await caches.open(PRE + m.version), hit = await c.match(req, { ignoreVary:true }); if (hit) return hit; }
      const l = await caches.open(LIB), h = await l.match(req, { ignoreVary:true }); if (h) return h;
      try { const r = await fetch(req); if (r.ok) await l.put(req, r.clone()); return r; } catch (err){ return Response.error(); }
    })());
  }
});
