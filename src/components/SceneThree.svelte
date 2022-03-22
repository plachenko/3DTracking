<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import CameraControls from 'camera-controls';

  CameraControls.install( { THREE: THREE } );

  let videoEl;
  let canvasEl;
  let ctx;

  let lock = false;

  let currentCam = false;

  let headPosition;
  let ratio = window.innerWidth / window.innerHeight;
  let sendingWS = false;

  const tracking = true;
  const clock = new THREE.Clock();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, ratio, .1, 1000);
  camera.position.z = 40;
  camera.position.y = 50;
  camera.position.x = 50;
  const renderer = new THREE.WebGLRenderer({alpha: true});

  const gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
        gridHelper.position.y = -10;

  const camControls = new CameraControls(camera, renderer.domElement );
  camControls.dampingFactor = 1;

  onMount(() => {
    scene.add( gridHelper );

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

		renderer.render( scene, camera );

    render();
  });

  function render() {

    const delta = clock.getDelta();
    const hasControlsUpdated = camControls.update(delta);

    // step();

    requestAnimationFrame( render );
    renderer.render( scene, camera );
  }
</script>

<div>
</div>

<style>
  .lock{
    background-color: #00F !important;
  }
  .currentCam{
    background-color:#0F0 !important;
  }
  #btnCtn{
    position: absolute;
    padding: 5px;
    right: 0px;
    text-align: center;
    z-index: 9999;
    }
    #btnCtn div{
      padding: 5px 15px;
      border-radius: 5px;
      user-select: none;
      cursor: pointer;
      background-color:#F00;
      color:#FFF;
      margin: 5px 0px;
      }

  video{
    display: none;
    }

  #camImg{
    display:none;
  }
  #camCan{
    position: absolute;
    display: none;
    }
</style>
