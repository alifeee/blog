---
title: jailbreaking your kindle and installing KOReader
date: 2025-08-20
tags:
  - kindle
  - koreader
  - jailbreaking
---
<div class="alert">

There is an updated guide in the [newer note about kindles](/waaaaah/).

</div>

Here's how I jailbreak kindles and install custom e-reader software ([KOReader](https://koreader.rocks/)).

## Why?

Once done, your e-books become files (detached from the [demon of DRM](https://www.fsf.org/blogs/licensing/drm-evil)) that you can share between your devices, download from anywhere, and from which your access can't be revoked by a higher corporate power until you start paying for the new subscription that you didn't used to need to pay for.

Also, more simply: don't sell me hardware and then tell me I can't install my own software.

## My favourite Kindle to jailbreak

The kindle that I've jailbroken most often is the [Kindle 4](https://wiki.mobileread.com/wiki/Kindle_4) from 2011 (the grey one, with buttons, without a touchscreen, without a backlight). I like this one because I don't want a fancy device. I want to read e-books with few distractions. I don't like the idea of a touchscreen (to be fair, I've not tried one), neither do I want a backlight, or I'd just read on my phone, laptop, or PC — the e-ink is the whole appeal to me!

I also like it because you can find loads of them on eBay for £15–20.

## Required Downloads

(This section will probably become out of date)

Several pages exist where I download software to put on the Kindle. These are on:

A. Amazon updates page: <https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GKMQC26VQQMM8XSW>  
B. Tools Snapshots on the MobileRead Forum: <https://www.mobileread.com/forums/showthread.php?t=225030>  
C. Updated Keystore on the MobileRead Forum: <https://www.mobileread.com/forums/showpost.php?p=4506164&postcount=1295>  
D. RenameOTABin on the MobileRead Forum: <https://www.mobileread.com/forums/showpost.php?p=4076733&postcount=25>  
E. KOReader Installation Guide: <https://github.com/koreader/koreader/wiki/Installation-on-Kindle-devices>  

## Installation Instructions

The installation is fairly easy if you use the right files, as the Kindle appears as a USB storage device when you plug it into your computer — so the general way I found to install things was to: read the `readme.txt`; copy over the files (usually listed in the `readme.txt`) to the Kindle; unplug the Kindle; go into settings and press `Update Your Kindle`. Most of the "installations" below are done either this way, or just by placing file(s) on the Kindle from the computer.

There are also (better, up-to-date) instructions on <https://kindlemodding.org/> or <https://wiki.mobileread.com/wiki/Kindle4NTHacking>, but my instructions are:

*these are specific to the Kindle 4, my setup, and might be out of date*

1. Update the Kindle to the latest firmware ([download link A](#required-downloads))  
    *(I have had problems with developer keys being untrusted without doing this)*
2. Turn on Aeroplane mode and restart Kindle  
    *(again, I've had problems without this step)*
3. Jailbreak Kindle ([download link B](#required-downloads)) by placing files in Kindle and following `README` instructions to enable "diagnostic reboot"  
    *(I like this step because people have made some cute "your kindle is jailbroken" graphics that show)*
4. Install Kindle MKK ([download link B](#required-downloads)) by placing the install file on the kindle and starting a software update
5. Install the new Kindle MKK 2025 hotfix ([download link C](#required-downloads)) in the same way
6. Install KUAL ([download link B](#required-downloads)) by placing `KUAL-KDK-1.0.azw2` in the documents folder (then check you can open it)
7. Install RenameOTABin ([download link D](#required-downloads)) by placing folder in the `extensions` folder and then activating it via the KUAL menu  
    *this is to disable "over-the-air" updates. in case Amazon pushes an update which breaks things – we disable the downloading of it*
8. Install KOReader ([download link E](#required-downloads)) and open it with KUAL.
9. Done!

## Using the Krindle

[KOReader](https://koreader.rocks/) has a lot more features than the default Kindle reader, and is a lot more user-customisable. But the important question is how to put books on it.

The two ways I've found are to either:

- plug in the device with USB and put the file (`.epub`, `.pdf`, `.html`) onto the Krindle
- (my preference) use [Calibre](https://calibre-ebook.com/) on a computer:
    1. start a device connection
    2. connect the Krindle using the KOReader menu
    3. use the "send to device" from Calibre

## Acquiring Books

Now that you're not locked in to Amazon's ecosystem, you don't have to buy all your e-books from the Amazon store (great!).

There are plenty of options of where to get e-books on the internet, including:

- e-book stores like <https://www.ebooks.com/>
- books from the public domain like <https://www.gutenberg.org/>
    - borrowing books from your local library !!! (maybe <https://www.borrowbox.com/> or <https://libbyapp.com> or [this guide](https://uk.pcmag.com/mobile-apps/134440/how-to-borrow-and-read-ebooks-from-your-local-library) will help)
- archive sites like [libgenesis](https://en.wikipedia.org/wiki/Library_Genesis) or [AnnasArchive](https://en.wikipedia.org/wiki/Anna%27s_Archive) (via guides like <https://librarygenesis.net/>)
- digital lending libraries like <https://openlibrary.org/>
- self-published books from people's personal websites

## Conclusion

I like reading books (I also like [tracking what I read](https://ramblingreaders.org/user/alifeee/) – which you can follow with Mastodon!).

I think physical books are great, but with my purchasing rules (generally sticking to charity shops & local shops), it's hard to get specific books without ordering them online.

The Krindle fills that niche and lets me read (mostly) any book I find out about.

Pretty nice, if you ask me.
