const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

const scene = new THREE.Scene();

const objLoader = new THREE.OBJLoader();
const mtlLoader = new THREE.MTLLoader();

// load the material file
mtlLoader.load('movingGeorge.mtl', function (materials) {
    materials.preload();
    // load the object file, passing in the materials
    objLoader.setMaterials(materials);
    objLoader.load('movingGeorge.obj', function (object) {
        scene.add(object);
    });
});

function animate() {
    requestAnimationFrame(animate);
    // apply transformations to the object here
    renderer.render(scene, camera);
}
animate();