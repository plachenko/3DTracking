<script lang="ts">
import { onMount } from 'svelte';
import * as THREE from 'three';
import gsap from 'gsap';
import CameraControls from 'camera-controls';

CameraControls.install( { THREE: THREE } );

let threeEl;
let camControls;

const ratio = () => window.innerWidth / window.innerHeight;

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera(75, ratio(), .1, 1000);
      camera.position.set(50, 30, 0);
const gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
const renderer = new THREE.WebGLRenderer({alpha: true})
      renderer.setSize(window.innerWidth, window.innerHeight);

scene.add( gridHelper );

onMount(()=>{

  threeEl.appendChild(renderer.domElement)

  camControls = new CameraControls(camera, renderer.domElement);
  camControls.dampingFactor = 1;
  camControls.addEventListener('update', camUpdate)

  render();
});

function camUpdate(e){
  console.log('updated', e)
}

function render() {
  const delta = clock.getDelta();
  const hasControlsUpdated = camControls.update(delta);

  renderer.render( scene, camera );

  requestAnimationFrame( render );
}
</script>

<div bind:this={threeEl}>
</div>

<style>

</style>
