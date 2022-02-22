<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
Mathjax is called as a script. Mathjax transforms plaintext \\(\LaTeX\\) commands in the MarkDown (HTML) text to math symbols. These symbols are not copyable without right-clicking on them, i.e., inline math cannot be copied with the surrounding text.

```latex
\[x^2 + \phi\] 
```

\\[x^2 + \phi\\]

```latex
$$e^{i\pi}$$
```

$$e^{i\pi}$$

```latex
\(\sin(n\pi + \varepsilon) \sim \sin(n\pi)\)
```

\\(\sin(n\pi + \varepsilon) \sim \sin(n\pi)\\)

Inline math renders properly when using explicit (and escaped) start (`\\(`) and stop (`\\)`) indicators for math mode. Using `$` does not appear to work

```latex
$\arctan(\theta + \sigma_{ij})$
```

$\arctan(\theta + \sigma_{ij})$
