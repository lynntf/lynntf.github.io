<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<script src="https://lynntf.github.io/libraries/p5.js"></script>
<script src="https://lynntf.github.io/libraries/p5.sound.min.js"></script>
<!-- <script src="sketch.js"></script> -->

<div id="canvas-container">
   <canvas id="theCanvas"></canvas>
</div>
<script src="sketch.js"></script>

This is a discontinuous shear map: \\(x_n = \mod(x + a \sin(b \pi y), 1), y_n = \mod(y + c \sin(d \pi x), 1)\\)

You can find this sketch on the [p5.js website](https://editor.p5js.org/lynntf/sketches/GnbRFcU0o) as well to play around with it.

Double click (tap) to reset the attaractor with new parameters \\(a, b, c, d\\). [Fullscreen](fullscreen.html).
