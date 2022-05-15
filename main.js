import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'dat.gui'
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';



let controls, renderer, scene, camera, cube, container, settings;
let composer;
let logo_left, logo_right;

// class LogoModel {
//     constructor(right_beam, left_beam, right_pillar, left_pillar) {
//         this.right_beam = right_beam;
//         this.left_beam = left_beam;
//         this.right_pillar = right_pillar;
//         this.left_pillar = left_pillar;
//     }
// };

const loader = new GLTFLoader();

function sceneOne() {
    logo_left.position.x = -0.11;
    logo_left.position.y = 0;
    logo_left.position.z = 0.076;

    logo_right.rotation.y = 1.6

    logo_right.position.x = 0.22;
    logo_right.position.y = 0;
    logo_right.position.z = -0.14;

    camera.position.x = 4;
    camera.position.y = 15;
    camera.position.z = 3;

    camera.rotation.x = -1;
    camera.rotation.y = 0;
    camera.rotation.z = 0.3;
}

function sceneTwo() {
    logo_left.position.x = -0.11;
    logo_left.position.y = 0;
    logo_left.position.z = 0.076;

    logo_right.rotation.y = 1.6;

    logo_right.position.x = 0.22;
    logo_right.position.y = 3;
    logo_right.position.z = -0.14;

    camera.position.x = -7;
    camera.position.y = 12;
    camera.position.z = 8;

    camera.rotation.x = -1;
    camera.rotation.y = -1;
    camera.rotation.z = -0.7;

}

function init() {

    container = document.querySelector(".scene.one");

    // Create scene, camera and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    let width = window.innerWidth;
    let height = window.innerHeight;
    // camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    // Initialize the things 
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    let ambientLight = new THREE.AmbientLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.75);
    scene.add(ambientLight);
    let directionalLightBack = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.25);
    directionalLightBack.position.set(30, 100, 100);
    scene.add(directionalLightBack);
    let directionalLightFront = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.25);
    directionalLightFront.position.set(-30, 100, -100);
    scene.add(directionalLightFront);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);

    composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    loadGlb().then(
        function () {
            addGUI();
            sceneOne();
            gsapAnimations();
        }
    )
}

// this utility function allows you to use any three.js
// loader with promises and async/await
function modelLoader(url) {
    return new Promise((resolve, reject) => {
        loader.load(url, data => resolve(data), null, reject);
    });
}


async function loadGlb() {

    const gltfData = await modelLoader('logo_new.glb');

    let model = gltfData.scene;
    scene.add(model);

    logo_left = gltfData.scene.children[0];
    logo_right = gltfData.scene.children[1];

    gltfData.scene.children[0].material.color.set(0xf10086);
    gltfData.scene.children[1].material.color.set(0xf10086);

    // gltfData.scene.traverse(function (object) {

    //     if (object.isMesh) {

    //         object.material.color.set(0xf10086);
    //         if (object.name = "left") {
    //             logo_left = object;
    //             console.log(object);

    //         }
    //         if (object.name = "right") {
    //             logo_right = object;
    //         }
    //     }
    // });
}

function addGUI() {
    const gui = new GUI()

    const logo_leftPositionFolder = gui.addFolder('logo_left position')
    logo_leftPositionFolder.add(logo_left.position, 'x', -10, 10).listen().onChange(
        function () {
            console.log(logo_left.position.x)
        }
    )
    logo_leftPositionFolder.add(logo_left.position, 'y', -10, 10).listen().onChange(
        function () {
            console.log(logo_left.position.y)
        }
    )
    logo_leftPositionFolder.add(logo_left.position, 'z', -10, 10).listen().onChange(
        function () {
            console.log(logo_left.position.z)
        }
    )

    const logo_rightRotationFolder = gui.addFolder('logo_right rotation')
    logo_rightRotationFolder.add(logo_right.rotation, 'x', -5, 5).listen().onChange(
        function () {
            console.log(logo_right.rotation.x)
        }
    )
    logo_rightRotationFolder.add(logo_right.rotation, 'y', -5, 5).listen().onChange(
        function () {
            console.log(logo_right.rotation.y)
        }
    )
    logo_rightRotationFolder.add(logo_right.rotation, 'z', -5, 5).listen().onChange(
        function () {
            console.log(logo_right.rotation.z)
        }
    )

    const logo_rightPositionFolder = gui.addFolder('logo_right position')
    logo_rightPositionFolder.add(logo_right.position, 'x', -10, 10).listen().onChange(
        function () {
            console.log(logo_right.position.x)
        }
    )
    logo_rightPositionFolder.add(logo_right.position, 'y', -10, 10).listen().onChange(
        function () {
            console.log(logo_right.position.y)
        }
    )
    logo_rightPositionFolder.add(logo_right.position, 'z', -10, 10).listen().onChange(
        function () {
            console.log(logo_right.position.z)
        }
    )

    const logo_leftRotationFolder = gui.addFolder('logo_left rotation')
    logo_leftRotationFolder.add(logo_left.rotation, 'x', -5, 5).listen().onChange(
        function () {
            console.log(logo_left.rotation.x)
        }
    )
    logo_leftRotationFolder.add(logo_left.rotation, 'y', -5, 5).listen().onChange(
        function () {
            console.log(logo_left.rotation.y)
        }
    )
    logo_leftRotationFolder.add(logo_left.rotation, 'z', -5, 5).listen().onChange(
        function () {
            console.log(logo_left.rotation.z)
        }
    )

    const cameraPositionFolder = gui.addFolder('camera position')
    cameraPositionFolder.add(camera.position, 'x', -10, 10).listen().onChange(
        function () {
            console.log(camera.position.x)
        }
    )
    cameraPositionFolder.add(camera.position, 'y', -10, 10).listen().onChange(
        function () {
            console.log(camera.position.y)
        }
    )
    cameraPositionFolder.add(camera.position, 'z', -20, 20).listen().onChange(
        function () {
            console.log(camera.position.z)
        }
    )

    const cameraRotationFolder = gui.addFolder('camera rotation')
    cameraRotationFolder.add(camera.rotation, 'x', -5, 5).listen().onChange(
        function () {
            console.log(camera.rotation.x)
        }
    )
    cameraRotationFolder.add(camera.rotation, 'y', -5, 5).listen().onChange(
        function () {
            console.log(camera.rotation.y)
        }
    )
    cameraRotationFolder.add(camera.rotation, 'z', -5, 5).listen().onChange(
        function () {
            console.log(camera.rotation.z)
        }
    )

}

function animate() {
    // controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function gsapAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
        immediateRender: false,
        ease: "power1.inOut",
        scrub: true
    });


    let logo_anim = gsap.timeline();

    logo_anim.to(logo_left.position, {
        x: -0.11, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);
    logo_anim.to(logo_left.position, {
        y: 0, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);
    logo_anim.to(logo_left.position, {
        z: 0.076, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);

    logo_anim.to(logo_right.position, {
        x: 0.22, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);
    logo_anim.to(logo_right.position, {
        y: 3, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);
    logo_anim.to(logo_right.position, {
        z: -0.14, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);

    logo_anim.to(logo_right.rotation, {
        y: 1.6, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);

    logo_anim.to(camera.position, {
        x: -7, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);
    logo_anim.to(camera.position, {
        y: 12, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);
    logo_anim.to(camera.position, {
        z: 8, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);


    logo_anim.to(camera.rotation, {
        x: -1, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);
    logo_anim.to(camera.rotation, {
        y: -1, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);
    logo_anim.to(camera.rotation, {
        z: -0.7, scrollTrigger: {
            trigger: ".section-two",
            endTrigger: ".section-three",
            end: "top bottom",
        }
    }, 0);



    // logo_anim.add("second");

    // logo_anim.to(cube.position, {
    //     x: 1,
    //     scrollTrigger: {
    //         trigger: ".section-three",
    //         start: "top bottom",
    //         end: "top top",
    //     }
    // }, "second");

    // logo_anim.to(cube.position, {
    //     y: 0,
    //     scrollTrigger: {
    //         trigger: ".section-three",
    //         start: "top bottom",
    //         end: "top top",
    //     }
    // }, "second");

    // logo_anim.to(cube.position, {
    //     z: -6,
    //     scrollTrigger: {
    //         trigger: ".section-three",
    //         start: "top bottom",
    //         end: "top top",
    //     }
    // }, "second");

    // logo_anim.to(cube.rotation, {
    //     x: 1.6,
    //     scrollTrigger: {
    //         trigger: ".section-three",
    //         start: "top bottom",
    //         end: "top top",
    //     }
    // }, "second");


    // logo_anim.to(cube.rotation, {
    //     y: 1.4,
    //     scrollTrigger: {
    //         trigger: ".section-three",
    //         start: "top bottom",
    //         end: "top top",
    //     }
    // }, "second");


    // logo_anim.to(cube.rotation, {
    //     z: 0,
    //     scrollTrigger: {
    //         trigger: ".section-three",
    //         start: "top bottom",
    //         end: "top top",
    //     }
    // }, "second");

}

init();
animate();