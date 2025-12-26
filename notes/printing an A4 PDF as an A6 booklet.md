---
title: printing an A4 PDF as an A6 booklet
date: 2025-12-26
tags:
- printing
- pdfs
- ai
---
Today I printed this zine about AI: <https://www.aimustdie.info/>.

I just wanted a small booklet, so wanted some sort of "print 4 pages per page and fold to make an A6 booklet".

There are a lot of options. First I used a website to make a PDF that was promised to be to end up an A6 booklet, but totally didn't.

Then I found <https://maedoe.github.io/booklet-page-calculator/> which is a pretty great calculator. It was as "simple" as first printing these pages, 4 per page…

```text
32,1,24,9,30,3,22,11,28,5,20,13,26,7,18,15
```

…then printing…

```text
2,31,10,23,4,29,12,21,6,27,14,19,8,25,16,17
```

This makes sense. Presumably, there's a nice formula — you can see a pattern in the numbers (maybe this could be a GCSE sequences maths question).

I used `qpdf` to rearrange the PDF (as if you put the page ranges above into the Firefox print menu, it still prints them in page order) like so:

```bash
qpdf --empty --pages "AI_Must_Die_v1.4.4.pdf" 32,1,24,9,30,3,22,11,28,5,20,13,26,7,18,15 -- AI_ODD.pdf
qpdf --empty --pages "AI_Must_Die_v1.4.4.pdf" 2,31,10,23,4,29,12,21,6,27,14,19,8,25,16,17 -- AI_EVEN.pdf
```

Then printed each manually. Usually, for duplex printing, I scribble a little arrow on the bottom left of the first piece of paper in the feed with a pen, then when the page prints, I vaguely work out in my head what orientation I need to put it back in again to get the backside on the right side and the right way up. Seems to work.

Finally, I cut the paper using a guillotine, aranged the pages, and folded them. I now have a zine. I bound it using a needle and thread, my favourite method.

AI must die.
