<script lang="ts">



import { ref } from 'vue';

import { RouterLink, useRouter } from 'vue-router';
import 'video.js/dist/video-js.css'
import 'videojs-record/dist/css/videojs.record.css'
import videojs from 'video.js'

import 'webrtc-adapter'
import RecordRTC, { StereoAudioRecorder } from 'recordrtc'

// the following imports are only needed when you're recording
// audio-only using the videojs-wavesurfer plugin

// @ts-ignore
import WaveSurfer from 'wavesurfer.js';
// @ts-ignore
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
(WaveSurfer as any).microphone = MicrophonePlugin;

import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';
(WaveSurfer as any).regions = RegionsPlugin;

import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
(WaveSurfer as any).timeline = TimelinePlugin;

// register videojs-wavesurfer plugin
import videojs_wavesurfer_css from 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
// @ts-ignore
import 'videojs-wavesurfer/dist/videojs.wavesurfer.js';


// @ts-ignore
import 'videojs-record/dist/videojs.record.js'

import router from '@/router';


export default {
  setup() {
    const router = useRouter();
    let showCamera = ref(false);
    let showMicrophone = ref(false);
    let showImageFilePicker = ref(false);
    let showImageUrlTextBox = ref(false);
    let showAudioFilePicker = ref(false);
    let showAudioUrlTextBox = ref(false);
    let cameraPhoto: CameraPhoto = null!;
    let player: videojs.Player = null!;
    let wavesurfer: WaveSurfer = null;
    let imageSource = ref('Choose Source...');
    let soundSource = ref('Choose Source...');
    let previousImageSource = ref('Choose Source...');
    let previousSoundSource = ref('Choose Source...');
    let imageData = ref('')
    let soundData = ref('')
    let letters = ref('')
    let word = ref('')
    let order = ref(0)
    let unitId = ref(0);
    let itemId = ref(0);

    return {
       router,  showCamera, showImageFilePicker, showImageUrlTextBox, cameraPhoto, showMicrophone, player
      , showAudioFilePicker
      , showAudioUrlTextBox
      , wavesurfer
      , imageSource
      , soundSource
      , previousImageSource
      , previousSoundSource
      , imageData
      , soundData
      , letters
      , word
      , order
      , unitId
      , itemId
    };
  },
  async beforeCreate() {
  },
  async mounted() {
    if (this.$route.query.item) {

      this.itemId = parseInt(this.$route.query.item);
      var foundItem = await this.spellingStore.getItem(this.itemId);
      this.order = foundItem?.order;
      this.unitId = foundItem?.unitId;
      this.word = foundItem.word;

      var letters = foundItem.letters;
      for (let i = 0; i < letters.length; ++i) {
        for (let j = 0; j < letters[i].length; ++j) {
          this.letters += letters[i][j];
          if (j < letters[i].length - 1) {
            this.letters += ",";
          }
        }
        if (i < letters.length - 1) {
          this.letters += "\n";
        }
      }

      if (foundItem.sound) {
        if(foundItem.sound == 'TTS'){
          this.soundSource = 'From Text To Speech'
          this.soundSourceChanged(null, true);
        }
        else
{

        this.soundData = foundItem.sound;
        if (this.soundData.startsWith('data:')) {
          this.soundSource = 'From Microphone'
          this.soundSourceChanged(null, true);
        }
        else {
          this.soundSource = 'From Web Address'
          this.soundSourceChanged(null, true);
        }
      }
      }


      if (foundItem?.image) {
        this.imageData = foundItem?.image;
        if (this.imageData.startsWith('data:')) {
          this.imageSource = 'From Camera'
          this.imageSourceChanged(null, true);
        }
        else {
          this.imageSource = 'From Web Address'
          this.imageSourceChanged(null, true);
        }
      }


    }
  },
  methods: {


    readFile(ev: Event, prop: string) {
      debugger;
      var reader = new FileReader();
      reader.onloadend = (e) => {
        this[prop] = e.target.result;
      }

      reader.readAsDataURL(ev.target.files[0]);
    },

    // // Convert a audio-buffer segment to a Blob using WAVE representation
    // // The returned Object URL can be set directly as a source for an Auido element.
    // // (C) Ken Fyrstenberg / MIT license
    bufferToWave(abuffer, offset, len) {

      var numOfChan = abuffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample,
        pos = 0;

      // write WAVE header
      setUint32(0x46464952);                         // "RIFF"
      setUint32(length - 8);                         // file length - 8
      setUint32(0x45564157);                         // "WAVE"

      setUint32(0x20746d66);                         // "fmt " chunk
      setUint32(16);                                 // length = 16
      setUint16(1);                                  // PCM (uncompressed)
      setUint16(numOfChan);
      setUint32(abuffer.sampleRate);
      setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
      setUint16(numOfChan * 2);                      // block-align
      setUint16(16);                                 // 16-bit (hardcoded in this demo)

      setUint32(0x61746164);                         // "data" - chunk
      setUint32(length - pos - 4);                   // chunk length

      // write interleaved data
      for (i = 0; i < abuffer.numberOfChannels; i++)
        channels.push(abuffer.getChannelData(i));

      while (pos < length) {
        for (i = 0; i < numOfChan; i++) {             // interleave channels
          sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
          sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
          view.setInt16(pos, sample, true);          // update data chunk
          pos += 2;
        }
        offset++                                     // next source sample
      }

      // create Blob
      return new Blob([buffer], { type: "audio/wav" });

      function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
      }

      function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
      }
    },


    trimAudio() {

      var wavesurfer = this.player.wavesurfer().surfer;

      const start = wavesurfer.regions.list[Object.keys(wavesurfer.regions.list)[0]].start.toFixed(2);
      const end = wavesurfer.regions.list[Object.keys(wavesurfer.regions.list)[0]].end.toFixed(2);
      const originalBuffer = wavesurfer.backend.buffer;
      console.log(end, start, end, start, originalBuffer, (end - start) * (originalBuffer.sampleRate * 1))
      var emptySegment = wavesurfer.backend.ac.createBuffer(
        originalBuffer.numberOfChannels,
        //segment duration
        (end - start) * (originalBuffer.sampleRate * 1),
        originalBuffer.sampleRate
      );

      for (var i = 0; i < originalBuffer.numberOfChannels; i++) {
        var chanData = originalBuffer.getChannelData(i);
        var segmentChanData = emptySegment.getChannelData(i);
        for (var j = 0, len = chanData.length; j < end * originalBuffer.sampleRate; j++) {
          segmentChanData[j] = chanData[j + (start * originalBuffer.sampleRate)];
        }
      }

      wavesurfer.loadDecodedBuffer(emptySegment); // Here you go!
      // Not empty anymore, contains a copy of the segment!
      console.log(end, start, end - start)

      wavesurfer.regions.clear();

      var buffer = wavesurfer.backend.buffer;
      var blob = this.bufferToWave(buffer, 0, buffer.length);

      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.soundData = reader.result;
      };

    },
    async soundSourceChanged(ev: Event, dontClearData = false) {
      if (this.soundSource == 'From Microphone' && this.soundData.startsWith('data:')) {
        if (this.soundData && this.recorder && this.recorder.engine) {
          this.recorder.engine.recordedData = this.soundData;
          this.recorder.onRecordComplete();
        }
      }
      else if (this.soundData && !dontClearData) {
        var y = confirm('This will clear any existing sound. Continue?');
        if (y) {
            this.soundData = '';
        }
        else {
          this.soundSource = this.previousSoundSource;
          return;
        }
      }

      if (this.soundSource == 'From Text To Speech'){
            this.soundData = 'TTS';
          }

      this.previousSoundSource = this.soundSource;

      this.showMicrophone = false;
      document.getElementById('microphoneContainer').style.display = 'none';

      // if (this.player) {
      //   this.wavesurfer.microphone.stopDevice();
      //   this.player.reset();
      //   var stopButton = document.getElementsByClassName('vjs-icon-record-stop')[0];
      //   if (stopButton) {
      //     stopButton.click();
      //   }
      // }

      this.showAudioFilePicker = false;
      this.showAudioUrlTextBox = false;
      if (this.soundSource == 'From File') {
        this.showAudioFilePicker = true;
      }
      if (this.soundSource == 'From Web Address') {
        this.showAudioUrlTextBox = true;
      }
      if (this.soundSource == 'From Microphone') {

        this.showMicrophone = true;

        document.getElementById('microphoneContainer').style.display = '';

        if (this.player) {
          this.player.dispose();
        }
        var existingAudio = document.getElementById('myAudio');
        if (existingAudio) {
          videojs(existingAudio).dispose();
          existingAudio.remove();
        }
        var ma = document.createElement('audio');
        ma.id = 'myAudio';
        ma.className = 'video-js vjs-default-skin';
        document.getElementById('microphoneContainer')?.appendChild(ma);


        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var isEdge = /Edge/.test(navigator.userAgent);

        function _base64ToArrayBuffer(base64: string) {
          var binary_string = window.atob(base64);
          var len = binary_string.length;
          var bytes = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
          }
          return bytes.buffer;
        }

        function applyAudioWorkaround() {
          if (isSafari || isEdge) {
            if (isSafari && window.MediaRecorder !== undefined) {
              // this version of Safari has MediaRecorder
              // but use the only supported mime type
              options.plugins.record.audioMimeType = 'audio/mp4';
            } else {
              // support recording in safari 11/12
              // see https://github.com/collab-project/videojs-record/issues/295
              options.plugins.record.audioRecorderType = StereoAudioRecorder;
              options.plugins.record.audioSampleRate = 44100;
              options.plugins.record.audioBufferSize = 4096;
              options.plugins.record.audioChannels = 2;
            }
          }
        }


        /* eslint-disable */
        var options = {
          controls: true,
          bigPlayButton: false,
          width: 600,
          height: 300,
          fluid: false,
          plugins: {
            wavesurfer: {
              backend: 'WebAudio',
              waveColor: 'white',
              backgroundColor: 'gray',
              progressColor: 'red',

              displayMilliseconds: true,
              debug: true,
              cursorWidth: 1,
              hideScrollbar: true,
              plugins: [
                WaveSurfer.timeline.create({
                  container: '#wave-timeline'
                }),
                WaveSurfer.regions.create({
                  dragSelection: {
                    slop: 5
                  }
                }),
                // enable microphone plugin
                WaveSurfer.microphone.create({
                  bufferSize: 4096,
                  numberOfInputChannels: 1,
                  numberOfOutputChannels: 1,
                  constraints: {
                    video: false,
                    audio: true
                  }
                })
              ]
            },
            record: {
              audio: true,
              video: false,
              maxLength: 20,
              displayMilliseconds: true,
              debug: true
            }
          }
        };

        // apply audio workarounds for certain browsers
        applyAudioWorkaround();

        // create player
        this.player = videojs('myAudio', options, function () {
          // print version information at startup
          var msg = 'Using video.js ' + videojs.VERSION +
            ' with videojs-record ' + videojs.getPluginVersion('record') +
            ', videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
            ', wavesurfer.js ' + WaveSurfer.VERSION + ' and recordrtc ' +
            RecordRTC.version;
          videojs.log(msg);
        });

        this.recorder = this.player.record();

        // error handling
        this.player.on('ready', () => {
          if (this.isResetting) {
            this.isResetting = false;
            return;
          }
          this.wavesurfer = this.player.wavesurfer().surfer;

          document.getElementsByClassName('vjs-record-button')[0].addEventListener('mousedown', () => {
            this.wavesurfer.regions.clear();
          })

          this.wavesurfer.on('region-updated', function (region) {
            var regions = region.wavesurfer.regions.list;
            var keys = Object.keys(regions);
            if (keys.length > 1) {
              regions[keys[0]].remove();
            }
          });

          //              if(soundDataToLoad){
          // document.getElementsByClassName('vjs-icon-audio-perm')[0].click();


          // // load existing audio from data URI
          // // this.player.src({
          // //   src: soundDataToLoad
          // // });





          // // setTimeout(()=>{
          // //   debugger;
          // //   this.player.controlBar.playToggle.show();
          // // },2000)



          //             //   this.wavesurfer.load(soundDataToLoad);
          //              }


          //           });

          this.player.on('deviceReady', () => {
            if (this.soundData) {
              this.recorder.engine.recordedData = this.soundData;
              this.recorder.onRecordComplete();
            }
          });
          //             this.player.src({
          //   src: soundDataToLoad
          // });
          // this.player.load();
          // this.player.play();




          // setTimeout(()=>{
          //   debugger;
          //   this.player.controlBar.playToggle.show();
          // },2000)

          //           });
        });
        // error handling
        this.player.on('deviceError', function () {
          console.log('device error:', player.deviceErrorCode);
        });

        this.player.on('error', function (element, error) {
          console.error(error);
        });

        // user clicked the record button and started recording
        this.player.on('startRecord', function () {
          console.log('started recording!');
        });

        // user clicked the record button and started recording
        this.player.on('finishRecord', () => {
          if (this.player.recordedData != this.soundData) {
            var reader = new FileReader();
            reader.readAsDataURL(this.player.recordedData);
            reader.onloadend = () => {
              this.soundData = reader.result;
            };

          }
        });


      }
    },
    imageSourceChanged(ev: Event, dontClearData = false) {
      if (this.imageData && !dontClearData) {
        var y = confirm('This will clear any existing image. Continue?');
        if (y) {
          this.imageData = '';
        }
        else {
          this.imageSource = this.previousImageSource;
          return;
        }
      }

      this.previousImageSource = this.imageSource;

      this.showCamera = false;
      //document.getElementById('cameraContainer').style.display = 'none';

      this.showImageFilePicker = false;
      this.showImageUrlTextBox = false;
      if (this.imageSource == 'From File') {
        this.showImageFilePicker = true;
      }
      if (this.imageSource == 'From Web Address') {
        this.showImageUrlTextBox = true;
      }
      if (this.imageSource == 'From Camera') {
        this.showCamera = true;
        //document.getElementById('cameraContainer').style.display = '';


        this.$nextTick(() => {

          // get video and image elements
          let videoElement = document.getElementById('videoId');
          let imgElement = document.getElementById('imgId');

          // get select and buttons elements
          let facingModeSelectElement = document.getElementById('facingModeSelectId');
          let startCameraDefaultAllButtonElement = document.getElementById(
            'startDefaultAllButtonId'
          );
          let startDefaultResolutionButtonElement = document.getElementById(
            'startDefaultResolutionButtonId'
          );
          let startMaxResolutionButtonElement = document.getElementById(
            'startMaxResolutionId'
          );
          let takePhotoButtonElement = document.getElementById('takePhotoButtonId');
          let takePhotoAndDownloadButtonElement = document.getElementById('takePhotoAndDownloadButtonId');
          let stopCameraButtonElement = document.getElementById('stopCameraButtonId');
          let cameraSettingElement = document.getElementById('cameraSettingsId');
          let showSwitchCamerasButtonsElement = document.getElementById(
            'showSwitchCameraButtonsId'
          );
          let showDebugPlatformInfoButtonElement = document.getElementById(
            'showDebugPlatformInfoButtonId'
          );

          // instantiate CameraPhoto with the videoElement
          let cameraPhoto = new CameraPhoto(videoElement);

          function startCameraDefaultAll() {
            cameraPhoto.startCamera()
              .then(() => {
                let log = `Camera started with default All`;
                console.log(log);
              })
              .catch((error) => {
                console.error('Camera not started!', error);
              });
          }

          // start the camera with prefered environment facingMode ie. ()
          // if the environment facingMode is not avalible, it will fallback
          // to the default camera avalible.
          function startCameraDefaultResolution() {
            let facingMode = 'ENVIRONMENT';
            cameraPhoto.startCamera(FACING_MODES[facingMode])
              .then(() => {
                let log =
                  `Camera started with default resolution and ` +
                  `prefered facingMode : ${facingMode}`;
                console.log(log);
              })
              .catch((error) => {
                console.error('Camera not started!', error);
              });
          }

          // function called by the buttons.
          var takePhoto = () => {
            let sizeFactor = 1;
            let imageType = IMAGE_TYPES.JPG;
            let imageCompression = 1;

            let config = {
              sizeFactor,
              imageType,
              imageCompression
            };

            this.imageData = cameraPhoto.getDataUri(config);

            //this.showCamera = false;
          }



          function startCameraDefaultAll() {
            cameraPhoto.startCamera()
              .then(() => {
                let log = `Camera started with default All`;
                console.log(log);
              })
              .catch((error) => {
                console.error('Camera not started!', error);
              });
          }

          // start the camera with prefered environment facingMode ie. ()


          function takePhotoAndDownload() {
            let sizeFactor = 1;
            let imageType = IMAGE_TYPES.JPG;
            let imageCompression = 1;

            let config = {
              sizeFactor,
              imageType,
              imageCompression
            };

            let dataUri = cameraPhoto.getDataUri(config);
            downloadPhoto(dataUri, 'myPhoto', 1);
            imgElement.src = dataUri;
          }

          function showCameraSettings() {
            let settings = cameraPhoto.getCameraSettings();

            // by default is no camera...
            let innerHTML = 'No active camera';
            if (settings) {
              let { aspectRatio, frameRate, height, width } = settings;
              innerHTML = `
        <b>Current active camera:</b>
        aspectRatio:${aspectRatio}
        frameRate: ${frameRate}
        height: ${height}
        width: ${width}
    `;
            }
            //cameraSettingElement.innerHTML = innerHTML;
          }

          function showSwitchCameraButtons() {
            cameraPhoto.enumerateCameras().then((cameras) => {
              if (cameras && cameras.length > 0) {
                let cameraButtonsContainer = document.getElementById('cameraButtonsContainerId');
                cameraButtonsContainer.innerHTML = '';

                cameras.forEach((camera) => {
                  let { kind, label, deviceId } = camera;
                  const buttonElement = document.createElement('button');
                  buttonElement.type = 'button';
                  buttonElement.innerHTML = `${label}`;
                  (function (deviceId) {
                    buttonElement.addEventListener('click', function () {
                      console.log('click on', deviceId);
                      startCameraIdMaxResolution(deviceId);
                    });
                  })(deviceId);
                  cameraButtonsContainer.appendChild(buttonElement);
                });
              }
            }).catch((error) => {
              console.log('Error could not enumerateCameras:', error);
            });
          }

          function stopCamera() {
            cameraPhoto.stopCamera()
              .then(() => {
                console.log('Camera stoped!');
              })
              .catch((error) => {
                console.log('No camera to stop!:', error);
              });
          }

          function startCameraIdMaxResolution(deviceId) {
            cameraPhoto.startCameraMaxResolution(deviceId)
              .then(() => {
                let log =
                  `Camera started with maximum resoluton and ` +
                  `prefered deviceId: ${deviceId} `;
                console.log(log);
              })
              .catch((error) => {
                console.error('Camera not started!', error);
              });
          }

          function startCameraMaxResolution() {
            let facingMode = 'ENVIRONMENT';
            cameraPhoto.startCameraMaxResolution(FACING_MODES[facingMode])
              .then(() => {
                let log =
                  `Camera started with maximum resoluton and ` +
                  `prefered facingMode: ${facingMode} `;
                console.log(log);
              })
              .catch((error) => {
                console.error('Camera not started!', error);
              });
          }

          function showDebugPlatformInfo() {
            let debugPlatformInfoElement = document.getElementById('debugPlatformInfoId');
            debugPlatformInfoElement.innerHTML = JSON.stringify(_getDebugPlatformInfo(), null, 2);
          }

          setInterval(() => {
            showCameraSettings();
          }, 500);

          takePhotoButtonElement.onclick = takePhoto;

          showSwitchCameraButtons();
          startCameraDefaultResolution();
        });
      }
    },
    async submitForm() {
      var lettersValue = this.letters;
      var letters = [];
      if (lettersValue) {
        var letterPieces = lettersValue.toLocaleUpperCase().split('\n');

        for (const column of letterPieces) {
          var letterCol = new Array<string>();
          letters.push(letterCol);
          for (const chr of column.split(',')) {
            letterCol.push(chr);
          }
        }
      }

      if (this.$route.query.item) {

        await this.spellingStore.updateSpellingItem(new SpellingItemWID({
          id: this.itemId,
          word: this.word.toLocaleUpperCase(),
          letters: letters,
          image: this.imageData,
          sound: this.soundData,
          unitId: this.unitId,
          order: this.order
        }));
      }
      else {



        await this.spellingStore.addSpellingItem(new SpellingItem({
          word: this.word.toLocaleUpperCase(),
          order: Utilities.getMaxOrder(this.spellingStore.spellingItems) + 1,
          letters,
          unitId: this.spellingStore.unit.id,
          image: this.imageData,
          sound: this.soundData,
        }));
      }
      this.router.push({ path: Strings.SpellingUnitSettings, query: { unit: this.router.currentRoute.value.query.unit } })
    }
  },
};

</script>

<template>
  <div class="view">

      <div class="formRow">
        <div class="formLabel" style="display:flex;justify-content:space-between">Sound:
          <div class="formLabelSelectDiv">
            <select v-model="soundSource" @change="soundSourceChanged" style="width:30vmin;">
              <option value="Choose Source...">Choose Source...</option>
              <option value="From Web Address">From Web Address</option>
              <option value="From File">From File</option>
              <option value="From Microphone">From Microphone</option>
              <option value="From Text To Speech">From Text To Speech</option>
            </select>
          </div>
        </div>
      </div>


      <div class="formRow" id="microphoneContainer" style="display:none;">
        <audio id="myAudio" class="video-js vjs-default-skin"></audio>
        <div id="wave-timeline"></div>

        <button type="button" @click="trimAudio">Trim to Selection</button>

      </div>

      <div class="formRow" v-if="showAudioFilePicker" style="display:flex;justify-content:space-between">
        <span>Audio File:</span>
        <label style="background:#efefef;border:.1vmin solid #767676;border-radius: .5vmin;padding:.5vmin">
          Choose File<input type="file" @change="readFile($event, 'soundData')" style="display:none" />
        </label>
        <audio controls v-bind:src="soundData" v-if="soundData">
        </audio>

      </div>

      <div class="formRow" v-if="showAudioUrlTextBox">
        <label style="display:flex;justify-content:space-between">
          Web Url:<input v-model="soundData" placeholder="https://..." style="width:30vmin;">
        </label>
        <audio controls v-bind:src="soundData" v-if="soundData">
        </audio>
      </div>

      


  </div>
</template>

<style lang="scss">

.myAudio-dimensions {
  width: 72vmin;
  height: 40vmin;
}

.video-js {
  font-size: 2vmin;

}
</style>