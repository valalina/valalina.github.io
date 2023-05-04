const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });

// Set the renderer size to match the canvas size
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000
);
camera.position.z = 5;

const controls = new THREE.OrbitControls(camera, canvas);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

const objLoader = new THREE.OBJLoader();
const mtlLoader = new THREE.MTLLoader();

mtlLoader.load('movingGeorge.mtl', function (materials) {
    materials.preload();
    objLoader.setMaterials(materials);

    objLoader.load('movingGeorge.obj', function (object) {
        // center the object in the scene
        const bbox = new THREE.Box3().setFromObject(object);
        const center = bbox.getCenter(new THREE.Vector3());
        object.position.sub(center);

        // add the object to the scene
        scene.add(object);
    });
});

function render() {
    requestAnimationFrame(render);

    controls.update(); // update the controls

    renderer.render(scene, camera);
}
render();
