// source of the spinner loader class can be found here:
// https://gist.github.com/knee-cola/a58c4a61b924151932902af77119a9b9

function initScene() {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    let fieldOfView = 75,
        aspectRatio = window.innerWidth / window.innerHeight,
        near = 0.1,
        far = 400;

    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.position.z = 300;

    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // creating a new loader
    var spinLoader = new THREE.BallSpinerLoader({ groupRadius: 20 });
    scene.add(spinLoader.mesh);

    function render() {
        // animation
        requestAnimationFrame(render);

        // requesting spinner animation
        spinLoader.animate();

        renderer.render(scene, camera);

    }

    render();
}

initScene();