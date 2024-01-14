webcodecs-playground
====================
- https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API
- [**web-platform-tests/wpt**](https://github.com/web-platform-tests/wpt/)
- [WebCodecs Codec Registry](https://www.w3.org/TR/webcodecs-codec-registry/#audio-codec-registry)
- https://github.com/shinyoshiaki/werift-webrtc/
  - https://github.com/shinyoshiaki/werift-webrtc/blob/5177f42d06f2592a1a33fa00f6eb6a3f1f5eba38/packages/rtp/src/extra/container/mp4/container.ts#L291
- [guest271314/WebCodecsOpusRecorder: WebCodecs Opus Recorder/Media Source Extensions Opus EncodedAudioChunk Player](https://github.com/guest271314/WebCodecsOpusRecorder)
- [everywill/AudioEncoder: AudioEncoder of WebCodec polyfill with fdkaac and Webassembly](https://github.com/everywill/AudioEncoder)
- [eagle19243/AudioEncoder](https://github.com/eagle19243/AudioEncoder)
- [Vanilagy/webm-muxer: WebM multiplexer in pure TypeScript with support for WebCodecs API, video & audio.](https://github.com/Vanilagy/webm-muxer)
- [Vanilagy/mp4-muxer at b295e920d776a3a44cc8a12771f0a3f7a0aed468](https://github.com/Vanilagy/mp4-muxer/tree/b295e920d776a3a44cc8a12771f0a3f7a0aed468)
- [gpac/gpac at 334d8f83207aee22a729c0b72cda455271d9976f](https://github.com/gpac/gpac/tree/334d8f83207aee22a729c0b72cda455271d9976f)
- [guest271314/webcodecs at dfb21ee3bcd3c41d573f899e98eeebef62e6e552](https://github.com/guest271314/webcodecs/tree/dfb21ee3bcd3c41d573f899e98eeebef62e6e552)
- [w3c/webcodecs at 21e4a1502ed53553495c099c828592b819d5dc6c](https://github.com/w3c/webcodecs/tree/21e4a1502ed53553495c099c828592b819d5dc6c)
- [anthumchris/opus-stream-decoder: Instantly decode Ogg Opus audio streams in chunks with JavaScript & WebAssembly (Wasm)](https://github.com/anthumchris/opus-stream-decoder)
- https://github.com/jiyeyuran/aac-encoder.js
- [gpac/mp4box.js: JavaScript version of GPAC's MP4Box tool](https://github.com/gpac/mp4box.js/)
### TODOs
- [ ] opus file should be written by appending an empty file in `AudioEncoder`'s `output` callback
- [ ] ```js
      // Create an array to store the Opus audio chunks
      const opusChunks = [];
      
      // Create a MediaRecorder instance
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm; codecs=opus',
      });
      
      // Listen for the dataavailable event and store the Opus chunks
      mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          opusChunks.push(event.data);
        }
      });
      
      // Listen for the stop event and save the Opus chunks to a file
      mediaRecorder.addEventListener('stop', () => {
        const opusBlob = new Blob(opusChunks, { type: 'audio/opus' });
        const fileReader = new FileReader();
      
        fileReader.onloadend = () => {
          // Save the Opus file
          const opusFileData = new Uint8Array(fileReader.result);
          saveOpusFile(opusFileData);
        };
      
        // Read the Opus blob as an ArrayBuffer
        fileReader.readAsArrayBuffer(opusBlob);
      });
      
      // Start recording
      mediaRecorder.start();
      
      // Stop recording after a certain duration or when needed
      setTimeout(() => {
        mediaRecorder.stop();
      }, recordingDuration);
      
      // Function to save the Opus file
      function saveOpusFile(opusData) {
        const blob = new Blob([opusData], { type: 'audio/opus' });
        const url = URL.createObjectURL(blob);
      
        // Create a link element and simulate a click to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'recording.opus';
        link.click();
      
        // Clean up the object URL
        URL.revokeObjectURL(url);
      }
      ```
