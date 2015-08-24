	window.onload = function(){
		var audioContext = new AudioContext();

		var attackTime = 0.5;
		var decayTime = 0.2;

		var o = audioContext.createOscillator();
		var g = audioContext.createGain();

		o.connect(g);
		g.connect(audioContext.destination);

		o.start();
		g.gain.value = 0;

		document.addEventListener('keypress', function(tommy){
			// console.log(tommy.charCode);
			scheduleEnv(audioContext.currentTime);
		});

		function scheduleEnv(when){
			g.gain.cancelScheduledValues(when);
			g.gain.setValueAtTime(0, when);
			g.gain.linearRampToValueAtTime(1, when+attackTime);
			g.gain.linearRampToValueAtTime(0, when+attackTime+decayTime);
		}
	}
