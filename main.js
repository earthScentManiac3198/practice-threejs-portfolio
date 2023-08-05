import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg1"),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
// const material = new THREE.MeshStandardMaterial({
//     metalness : 0.7,
//     roughness : 0.2,
//     normalMap : normalTexture
// });

// material.color = new THREE.Color(0xa3a3a3)

const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xf00f00);
pointLight.position.set(20,20,20)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// pointLight.intensity= 0.2

scene.add(pointLight,ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50)

// scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar(){
    const geometryStar = new THREE.SphereGeometry(0.25, 24, 24);
    const materialStar = new THREE.MeshStandardMaterial({color:0xC70039});
    const star = new THREE.Mesh(geometryStar, materialStar);

    const[x,y,z] = Array(3).fill().map((() => THREE.MathUtils.randFloatSpread(100)));
    star.position.set(x,y,z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

//loading texture for background
const spaceTexture = new THREE.TextureLoader().load('./assets/bg_1.png')
scene.background = spaceTexture;

//Loading texture for a specify object
const chrisTexture = new THREE.TextureLoader().load('./assets/profile.png')
//addingobject on the scene with material
const chris = new THREE.Mesh(
    new THREE.BoxGeometry(5,6,5),
    new THREE.MeshBasicMaterial({map:chrisTexture})
)

scene.add(chris)

//moon texture
const moonTexture = new THREE.TextureLoader().load('./assets/bg_2.png')
const moonNormalTexture = new THREE.TextureLoader().load('./assets/golf-ball-nm.jpg')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(6,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: moonNormalTexture
    })
)

moon.position.z = 30;
moon.position.setX(-10);

scene.add(moon)

function moveCamera(){

    //gives current dimensions of the viewport, with top property showing us exactly how far we are from the top of the webpage
    const t = document.body.getBoundingClientRect().top;
    
    //basis on the t we can change the positions of the material
    moon.position.x += 0.05;
    moon.position.y += 0.075;
    moon.position.z += 0.05;
    
    chris.position.y += 0.01;
    chris.position.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera

function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x+=0.01;
    torus.rotation.y+=0.005;
    torus.rotation.z+=0.01;

    controls.update();

    renderer.render(scene,camera);
}

animate();