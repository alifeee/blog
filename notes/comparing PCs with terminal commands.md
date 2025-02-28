---
title: comparing PCs with terminal commands
date: 2024-12-12
tags:
  - pc-building
  - scripting
  - git-diff
---
I was given an old computer. I'd quite like to make a computer to use in my studio, and take my tower PC home to play video games (mainly/only local coop games like [Wilmot's Warehouse](https://www.wilmotswarehouse.com/), [Towerfall Ascension](https://maddymakesgamesinc.itch.io/towerfall), or [Unrailed](https://unrailed-game.com/unrailed.html), and occasionally [Gloomhaven](https://store.steampowered.com/app/780290/Gloomhaven/)).

It's not the best, and I'd like to know what parts I would want to replace to make it suit my needs (which are vaguely "can use a modern web browser" without being slow).

By searching the web, I found these commands to collect hardware information for a computer:

```bash
uname -a # vague computer information
lscpu # cpu information
df -h # hard drive information
sudo dmidecode -t bios # bios information
free -h # memory (RAM) info
lspci -v | grep VGA -A11 # GPU info (1)
sudo lshw -numeric -C display # GPU info (2)
```

I also found these commands to benchmark some things:

```bash
sudo apt install sysbench glmark2
# benchmark CPU
sysbench --test=cpu run
# benchmark memory
sysbench --test=memory run
# benchmark graphics
glmark2
```

I put the output of all of these commands into text files for each computer, into a directory that looks like:

```text
├── ./current
│   ├── ./current/benchmarks
│   │   ├── ./current/benchmarks/cpu
│   │   ├── ./current/benchmarks/gpu
│   │   └── ./current/benchmarks/memory
│   ├── ./current/bios
│   ├── ./current/cpu
│   ├── ./current/disks
│   ├── ./current/gpu
│   ├── ./current/memory
│   └── ./current/uname
└── ./new
    ├── ./new/benchmarks
    │   ├── ./new/benchmarks/cpu
    │   ├── ./new/benchmarks/gpu
    │   └── ./new/benchmarks/memory
    ├── ./new/bios
    ├── ./new/cpu
    ├── ./new/disks
    ├── ./new/gpu
    ├── ./new/memory
    └── ./new/uname
4 directories, 19 files
```

Then, I ran this command to generate a diff file to look at:

```bash
echo "<html><head><style>html {background: black;color: white;}del {text-decoration: none;color: red;}ins {color: green;text-decoration: none;}</style></head><body>" > compare.html
while read file; do
  f=$(echo "${file}" | sed 's/current\///')
  git diff --no-index --word-diff "current/${f}" "new/${f}" \
    | sed 's/\[\-/<del>/g' | sed 's/-\]/<\/del>/g' \
    | sed -E 's/\{\+/<ins>/g' | sed -E 's/\+\}/<\/ins>/g' \
    | sed '1s/^/<pre>/' | sed '$a</pre>'
done <<< $(find current/ -type f) >> compare.html
echo "</body></html>" >> compare.html 
```

then I could open that html file and look very easily at the differences between the computers. Here is a snippet of the file as an example:

<div id="comparing-pcs-diff-section">
<style>
#comparing-pcs-diff-section > pre {background: black;color: white;}
#comparing-pcs-diff-section del {text-decoration: none;color: red;}
#comparing-pcs-diff-section ins {color: green;text-decoration: none;}
</style>
<pre>CPU(s):                   <del>12</del><ins>6</ins>
  On-line CPU(s) list:    <del>0-11</del><ins>0-5</ins>
Vendor ID:                <del>AuthenticAMD</del><ins>GenuineIntel</ins>
  Model name:             <del>AMD Ryzen 5 1600 Six-Core Processor</del><ins>Intel(R) Core(TM) i5-9400F CPU @ 2.90GHz</ins>
    CPU family:           <del>23</del><ins>6</ins>
    Model:                <del>1</del><ins>158</ins>
    Thread(s) per core:   <del>2</del><ins>1</ins>
    Core(s) per socket:   6
    Socket(s):            1
</pre>
<pre>Latency (ms):
         min:                                    <del>0.55</del><ins>0.71</ins>
         avg:                                    <del>0.57</del><ins>0.73</ins>
         max:                                    <del>1.62</del><ins>1.77</ins>
         95th percentile:                        <del>0.63</del><ins>0.74</ins>
         sum:                                 <del>9997.51</del><ins>9998.07</ins>
</pre>
<pre>
    glmark2 2021.02
=======================================================
    OpenGL Information
    GL_VENDOR:     <del>AMD</del><ins>Mesa</ins>
    GL_RENDERER:   <del>AMD Radeon RX 580 Series (radeonsi, polaris10, LLVM 15.0.7, DRM 3.57, 6.9.3-76060903-generic)</del><ins>NV106</ins>
    GL_VERSION:    <del>4.6</del><ins>4.3</ins> (Compatibility Profile) Mesa 24.0.3-1pop1~1711635559~22.04~7a9f319
...
[loop] fragment-loop=false:fragment-steps=5:vertex-steps=5: FPS: <del>9303</del><ins>213</ins> FrameTime: <del>0.107</del><ins>4.695</ins> ms
[loop] fragment-steps=5:fragment-uniform=false:vertex-steps=5: FPS: <del>8108</del><ins>144</ins> FrameTime: <del>0.123</del><ins>6.944</ins> ms
[loop] fragment-steps=5:fragment-uniform=true:vertex-steps=5: FPS: <del>7987</del><ins>240</ins> FrameTime: <del>0.125</del><ins>4.167</ins> ms
=======================================================
                                  glmark2 Score: <del>7736</del><ins>203</ins>
</pre>
</div>

It seems like the big limiting factor is the GPU. Everything else seems reasonable to leave in there.

As ever, I find `git diff --no-index` a highly invaluable tool.
