<script lang="ts">

  let lock = false;
  let currentCam = false;

  function sendLock(){

  }

  function setCurrentCam(){

  }

</script>

<div id="btnCtn">
  <div on:click={sendLock} class:lock >{lock ? 'Unlock' : 'Lock'} Camera</div>
  <div on:click={setCurrentCam} class:currentCam>SetCam</div>
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
</style>
