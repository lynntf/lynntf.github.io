<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<script src="https://lynntf.github.io/libraries/p5.js"></script>
<script src="https://lynntf.github.io/libraries/p5.sound.min.js"></script>

<div id = "p5sketch">
   <!-- p5 instance will be created here -->
</div>
<script src="sketch.js"></script>

This is a Poincaré map of the [standard map](https://en.wikipedia.org/wiki/Standard_map). \\(p_{n+1} = p_n + K\sin(\theta_n)\\) and \\(\theta_{n+1} = \theta_n + p_{n+1}\\).

You can find this sketch on the [p5.js website](https://editor.p5js.org/lynntf/sketches/TUJIyYKDZ) as well to play around with it.

Double click (tap) to reset the the map with a new (random) parameter \\(K \in (0,4)\\).
