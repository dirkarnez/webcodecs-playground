(async () => {
    const a = await (async t => {
        
    function make_silent_audio_data(timestamp, channels, sampleRate, frames) {
      let data = new Float32Array(frames*channels);
    
      return new AudioData({
        timestamp: timestamp,
        data: data,
        numberOfChannels: channels,
        numberOfFrames: frames,
        sampleRate: sampleRate,
        format: "f32-planar",
      });
    }
    
        function make_audio_data(timestamp, channels, sampleRate, frames) {
      let data = new Float32Array(frames*channels);
    
      // This generates samples in a planar format.
      for (var channel = 0; channel < channels; channel++) {
        let hz = 100 + channel * 50; // sound frequency
        let base_index = channel * frames;
        for (var i = 0; i < frames; i++) {
          let t = (i / sampleRate) * hz * (Math.PI * 2);
          data[base_index + i] = Math.sin(t);
        }
      }
    
      return new AudioData({
        timestamp: timestamp,
        data: data,
        numberOfChannels: channels,
        numberOfFrames: frames,
        sampleRate: sampleRate,
        format: "f32-planar",
      });
    }
    
        
      let sample_rate = 48000;
      let total_duration_s = 10;
      let data_count = 100;
      let vbr_outputs = [];
      let cbr_outputs = [];
    
      let cbr_encoder = new AudioEncoder({
        error: e => {
          assert_unreached('error: ' + e);
        },
        output: chunk => {
          cbr_outputs.push(chunk);
        }
      });
    
      let vbr_encoder = new AudioEncoder({
        error: e => {
          assert_unreached('error: ' + e);
        },
        output: chunk => {
          vbr_outputs.push(chunk);
        }
      });
    
      let config = {
        codec: 'opus',
        sampleRate: sample_rate,
        numberOfChannels: 2,
        bitrate: 256000,  // 256kbit
      };
    
      let cbr_config = { ...config, bitrateMode: "constant" };
      let vbr_config = { ...config, bitrateMode: "variable" };
    
      let cbr_config_support = await AudioEncoder.isConfigSupported(cbr_config);
    
      let vbr_config_support = await AudioEncoder.isConfigSupported(vbr_config);
    
      // Configure one encoder with VBR and one CBR.
      cbr_encoder.configure(cbr_config);
      vbr_encoder.configure(vbr_config);
    
      let timestamp_us = 0;
      let data_duration_s = total_duration_s / data_count;
      let data_length = data_duration_s * config.sampleRate;
      for (let i = 0; i < data_count; i++) {
        let data;
    
        if (i == 0 || i == (data_count - 1)) {
          // Send real data for the first and last 100ms.
          data = make_audio_data(
            timestamp_us, config.numberOfChannels, config.sampleRate,
            data_length);
    
        } else {
          // Send silence for the rest of the 10s.
          data = make_silent_audio_data(
            timestamp_us, config.numberOfChannels, config.sampleRate,
            data_length);
        }
    
        vbr_encoder.encode(data);
        cbr_encoder.encode(data);
        data.close();
    
        timestamp_us += data_duration_s * 1_000_000;
      }
    
      await Promise.all([cbr_encoder.flush(), vbr_encoder.flush()])
    
      cbr_encoder.close();
      vbr_encoder.close();
    
      let vbr_total_bytes = 0;
      vbr_outputs.forEach(chunk => vbr_total_bytes += chunk.byteLength)
    
      let cbr_total_bytes = 0;
      cbr_outputs.forEach(chunk => cbr_total_bytes += chunk.byteLength)
    
        debugger;

        return vbr_outputs;
    })()
let output_data = new Uint8Array(a[0].byteLength);
  a[0].copyTo(output_data);

 const audioBlob = new Blob([output_data], { type: 'audio/opus' });
    // Create a download link for the WAV file
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(audioBlob);
    downloadLink.download = 'sound.opus';
    downloadLink.innerHTML = 'Download opus';

    // Append the download link to the document body
    document.body.appendChild(downloadLink);
downloadLink.click();

})();
