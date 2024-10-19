// Basic Setup: Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
scene.add(ambientLight);

// Position the camera
camera.position.set(0, 1.5, 5);

// OrbitControls for mouse control
let controls;
if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
} else {
    console.error("OrbitControls not available");
}

// Load the 3D Gun Model using GLTFLoader
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load(
    'assets/rovelver1.0.0_gltf/rovelver1.0.0.glb',
    function (gltf) {
        const gunModel = gltf.scene;
        gunModel.scale.set(0.5, 0.5, 0.5); // Adjust scale if needed
        gunModel.position.set(0, 0, 0); // Position the gun in the center
        scene.add(gunModel); // Add the gun model to the scene
        console.log('Gun model loaded successfully');
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Loading progress
    },
    function (error) {
        console.error('An error happened while loading the model', error);
    }
);

// Handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update(); // OrbitControls updates
    renderer.render(scene, camera);
}

animate(); // Start animation loop

