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

Inline math renders properly when using explicit (and escaped) start (`\\(`) and stop (`\\)`) \\(\LaTeX\\) delimiters for math mode. Using `$` does not work, see [documentation here](https://docs.mathjax.org/en/latest/input/tex/delimiters.html#:~:text=By%20default%2C%20the%20TeX%20processor%20uses%20the%20LaTeX%20math%20delimiters%2C%20which%20are%20%5C(...%5C)%20for%20in%2Dline%20math%2C%20and%20%5C%5B...%5C%5D%20for%20displayed%20equations.%20It%20also%20recognizes%20the%20TeX%20delimiters%20%24%24...%24%24%20for%20displayed%20equations%2C%20but%20it%20does%20not%20define%20%24...%24%20as%20in%2Dline%20math%20delimiters.).

```latex
$\arctan(\theta + \sigma_{ij})$
```

$\arctan(\theta + \sigma_{ij})$

