<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<script src="https://lynntf.github.io/libraries/p5.js"></script>
<script src="https://lynntf.github.io/libraries/p5.sound.min.js"></script>

<div id="sketch-holder">
    <!-- Our sketch will go here! -->
</div>
<script src="sketch.js"></script>

Alpha, Beta, and Gamma are all angles. They can take any value you want, but all possible behaviors are represented by angles between 0 degrees and 180 degrees. I think that when Alpha = Beta, the images are most pretty (this introduces some extra symmetry in the image).

Letting the drawing run for a while will allow the colors to stabilize in its red-blue hue, but the lightness will max out after a while.
  
This is an implementation of the bi-axial hemispherical piecewise isometry (PWI) that I study in my research. See <a href="https://journals.aps.org/pre/abstract/10.1103/PhysRevE.99.032204">my paper on this PWI</a> or <a href="https://journals.aps.org/pre/abstract/10.1103/PhysRevE.101.012204">my paper on getting meaning from the coloring</a> for more detail.

You can find this sketch on the <a href = "https://editor.p5js.org/lynntf/sketches/_Et7uxMlP">p5.js website</a> as well to play around with it.

<a href = "https://lynntf.github.io/sketches"> Back to sketches </a>
