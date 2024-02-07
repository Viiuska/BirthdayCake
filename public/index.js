document.addEventListener("DOMContentLoaded", function(){
  const numCandles = 24;
  const candlesContainer = document.querySelector(".candles");


  // Create candles
  for (let i = 0; i < numCandles; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = `${i * (200 / numCandles)}px`;
    candlesContainer.appendChild(candle); // Append candle to candles container
  }

// Listen for microphone input
navigator.mediaDevices.getUserMedia({ audio: true })
.then(function(stream) {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

  analyser.smoothingTimeConstant = 0.3;
  analyser.fftSize = 1024;

  microphone.connect(analyser);
  analyser.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);

  javascriptNode.onaudioprocess = function() {
    const array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    const average = array.reduce((a, b) => a + b) / array.length;

    if (average > 150) {
      // Blow detected
      extinguishCandles(average);
    }
  }
})
.catch(function(err) {
  console.error("Error accessing microphone", err);
});

// Function to extinguish candles
function extinguishCandles(intensity) {
const numToExtinguish = Math.round((intensity - 150) / 10); // Adjust based on sensitivity
const candles = candlesContainer.querySelectorAll(".candle");
for (let i = 0; i < numToExtinguish; i++) {
  if (candles[i]) {
    candles[i].id = "blown";
  }
}
}
});