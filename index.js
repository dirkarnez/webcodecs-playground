(async () => {
    const a = await (async () => {
    let sample_rate = 48000;
  let total_duration_s = 1;
  let data_count = 10;
  let chunks = [];

  let encoder_init = {
    error: () => {},
    output: (chunk, metadata) => {
      chunks.push(chunk);
    }
  };
  let encoder = new AudioEncoder(encoder_init);
  let config = {
    codec: 'opus',
    sampleRate: sample_rate,
    numberOfChannels: 2,
    bitrate: 256000,  // 256kbit
  };
  encoder.configure(config);
  let config_supported = await AudioEncoder.isConfigSupported(config);
        console.log(config_supported);
        debugger;
  let timestamp_us = 0;
  const data_duration_s = total_duration_s / data_count;
 const frames = Math.max(1, Math.round(data_duration_s * config.sampleRate));
  for (let i = 0; i < data_count; i++) {
    let buffer = new Float32Array(frames * config.numberOfChannels);
    let data = new AudioData({
      timestamp: timestamp_us,
      data: buffer,
      numberOfChannels: config.numberOfChannels,
      numberOfFrames: frames,
      sampleRate: config.sampleRate,
      format: 'f32-planar',
      transfer: [buffer.buffer]
    });
    timestamp_us += data_duration_s * 1_000_000;
    encoder.encode(data);
  }
  await encoder.flush();
  encoder.close();
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
