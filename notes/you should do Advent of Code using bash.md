---
date: 2024-11-05
title: you should do Advent of Code using bash
tags:
  - advent-of-code
  - bash
---
last year I did [Advent of Code](https://adventofcode.com/) in bash.

you should do it too.

people often attempt it in a programming language which is new to them, so they can have a nice time learning how to use it. I think this language should be "the terminal".

I learnt a lot about `sed` and `awk`, and more general things about bash like pipes, redirection, `stdout` and `stderr`, and reading from and editing files.

Ever since, I've learnt more and more about the terminal and become more comfortable there, and now I feel comfortable doing some nice loops and commands, such that I process a lot of data purely on the terminal, like some of the [maps](https://alifeee.net/maps/) I've been making recently.

My Advent of Code 2023 solutions are in this GitHub repository: <https://github.com/alifeee/advent-of-code-2023>

They're mostly in bash, and they mostly solve quite quickly. I stopped after day 12 because things got too confusing and "dynamic programming", and my method of programming ("not having done a computer science degree") doesn't do well with recursion and complicated stuff.

I used a lot of `awk`, which I found very fun, and now I probably use `awk` almost every day.

For fun, here are how many times each of `awk`'s [string functions](https://www.gnu.org/software/gawk/manual/html_node/String-Functions.html) appear in my solutions

```bash
$ while read cmd; do printf "${cmd}: "; egrep --exclude=awkstrings.md -r "${cmd}" | wc -l; done <<< $(cat awkstrings.md | pcregrep -o1 '^- `([^\(`]*)')
asort: 0
gensub: 7
gsub: 10
index: 49
length: 54
match: 21
patsplit: 4
split: 24
sprintf: 1
strtonum: 0
sub: 47
substr: 20
tolower: 0
toupper: 0
```

`awk` and bash were probably terrible ways to solve complex problems, but they were certainly fun in the early days of it.

you should give it a go.
