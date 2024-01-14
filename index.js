(async () => {
    const a = await (async () => {
    let sample_rate = 44100;
  let total_duration_s = 1;
  let data_count = 10;
  let chunks = [];

  let encoder = new AudioEncoder({
    error: () => {},
    output: (chunk, metadata) => {
      chunks.push(chunk);
    }
  });
  let config = {
    codec: 'opus',
    sampleRate: sample_rate,
    numberOfChannels: 2,
    // bitrate: 256000,  // 256kbit
  };
  encoder.configure(config);
  let config_supported = await AudioEncoder.isConfigSupported(config);
        console.log(config_supported);
  let timestamp_us = 0;
  const data_duration_s = total_duration_s / data_count;
  let data_length = data_duration_s * config.sampleRate;
  for (let i = 0; i < data_count; i++) {
    let buffer = new Float32Array(frames * config.numberOfChannels);


        // This generates samples in a planar format.
  for (var channel = 0; channel < config.numberOfChannels; channel++) {
    let hz = 100 + channel * 50; // sound frequency
    let base_index = channel * data_length;
    for (var j = 0; j < data_length; j++) {
      let t = (j / config.sampleRate) * hz * (Math.PI * 2);
      buffer[base_index + j] = Math.sin(t);
    }
  }


          let data = new AudioData({
      timestamp: timestamp_us,
      data: buffer,
      numberOfChannels: config.numberOfChannels,
      numberOfFrames: data_length,
      sampleRate: config.sampleRate,
      format: 'f32-planar'
    });
      

      
    timestamp_us += data_duration_s * 1_000_000;
       data.close();
    encoder.encode(data);
       
  }
  await encoder.flush();
  encoder.close();

          let total_bytes = 0;
  chunks.forEach(chunk => total_bytes += chunks.byteLength)
        debugger;
        return chunks
    })();

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
