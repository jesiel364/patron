<template>
    <svg width="250" height="250">
      <circle r="100" cx="125" cy="125" class="track"></circle>
      <circle r="100" cx="125" cy="125" id="progress"></circle>
    </svg>
</template>
<script>
    let progressCircle = document.getElementById("progress");
    let radius = progressCircle.r.animVal.value;
    //circumference of a circle = 2πr;
    let circumference = 100 * 2 * Math.PI;
    progressCircle.style.strokeDasharray = circumference;

    //0 to 100
    setProgress(95);

    function setProgress(percent) {
        progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    }

</script>
<style scoped>
	.track{
		stroke-width: 1;
		stroke: lightgrey;
		fill: none;
	}

	#progress{
		stroke-width: 10;
		stroke: springgreen;
		stroke-linecap: round;
		fill: none;
		transform: rotate(270deg);
		transform-origin: center;
		stroke-dasharray: 630;
		
	}
</style>