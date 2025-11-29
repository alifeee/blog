---
title: comparing EPC certificates with git-diff
date: 2025-02-28
tags:
- git-diff
- scripting
- housing
---
Our house just got a new EPC certificate. You can (maybe) check yours on <https://www.gov.uk/find-energy-certificate>.

I'm interested in easy ways to see change. Trying to compare the old and new webpages by eye is hard, which leads me to text-diffing. I can copy the contents of the website to a file and compare them that way. Let's. I did a similar thing a while ago [with computer benchmarks](https://blog.alifeee.net/notes/comparing-pcs-with-terminal-commands/).

I manually create two files by copying the interesting bits of the webpage, called `1` and `2` (because who has time for `.txt` extensions). Then, I can run:

```bash
git diff --no-index -U1000 ~/1 ~/2 > diff.txt
cat diff.txt | sed -E 's#^\+(.*)#<ins>\1</ins>#' | sed -E 's#^-(.*)#<del>\1</del>#' | sed 's/^ //'
```

The latter command turns each into HTML by turning `+` lines into `<ins>` ("insert"), `-` into `<del>` ("delete"), and removing leading spaces on other lines. Then, I can whack the output into a simple HTML template:

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
    body { background: black; color: white; }
    pre { padding: 1rem; }
    del { text-decoration: none; color: red; }
    ins { text-decoration: none; color: green; }
    </style>
  </head>
  <body>
<pre>
diff goes here...
<del>del lines will be red</del>
<ins>ins lines will be green</ins>
</pre>
  </body>
</html>
```

The final output is something like this (personal information removed. don't doxx me.)

<div id="comparing-pcs-diff-section">
<style>
#comparing-pcs-diff-section > pre {background: black;color: white;}
#comparing-pcs-diff-section del {text-decoration: none;color: red;}
#comparing-pcs-diff-section ins {color: green;text-decoration: none;}
</style>
<pre>
Energy rating
D

Valid until
<del>05 February 2025</del>
<ins>05 February 2035</ins>

Property type
    Mid-terrace house
Total floor area
<del>    130 square metres </del>
<ins>    123 square metres</ins>

<del>This property’s energy rating is D. It has the potential to be C. </del>
<ins>This property’s energy rating is D. It has the potential to be B.</ins>

Features in this property

Window                Fully double glazed                                        Good
Roof                  Pitched, no insulation (assumed)                           Very poor
<del>Roof                  Roof room(s), no insulation (assumed)                      Very poor</del>
<ins>Roof                  Roof room(s), insulated (assumed)                          Good</ins>
<del>Lighting              Low energy lighting in 64% of fixed outlets                Good</del>
<ins>Lighting              Low energy lighting in all fixed outlets                   Very good</ins>
Secondary heating     None                                                       N/A

Primary energy use

<del>The primary energy use for this property per year is 303 kilowatt hours per square metre (kWh/m2).</del>
<ins>The primary energy use for this property per year is 252 kilowatt hours per square metre (kWh/m2).</ins>
</pre>
</div>

Good job on us for having 100% low energy lighting fixtures, I guess...

Really, this is a complicated way to simplify something. I like simple things, so I like this.
