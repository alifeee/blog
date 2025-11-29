---
title: testing micropython on an ESP8266 D1 Mini
date: 2025-03-13
tags:
- micropython
- microcontrollers
---
I've toyed for a while with microcontrollers, and only really used Arduino/C/C++. Sometimes, I've heard talk of MicroPython, but I've never tried it out.

Until today!

I had a little experiment, and it seems promising. I might have a larger experiment soon (maybe try to retry some of my [hardware hacking](https://alifeee.net/favourites/#hardware%20hacking)).

I'll share here my initial experiments! I'm running on a Linux computer, on Pop!\_OS.

I read the:

- installation guide: <https://www.wemos.cc/en/latest/tutorials/d1/get_started_with_micropython_d1.html>
- usage guide: <https://docs.micropython.org/en/latest/esp8266/quickref.html>
- web-REPL help guide: <https://docs.micropython.org/en/latest/esp8266/tutorial/repl.html>
- D1 Mini pinout reference: <https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2019/05/ESP8266-WeMos-D1-Mini-pinout-gpio-pin.png>

…and downloaded the firmware file for the ESP8266 D1 Mini (which I have a few of) from <https://micropython.org/download/ESP8266_GENERIC/>, and then ran:

```bash
# install files and virtual environment
mkdir -p /git/micropython
cd /git/micropython
python -m venv env
. env/bin/activate
pip install esptool

# download firmware
$ ls
ESP8266_GENERIC-20241129-v1.24.1.bin

# at this point I plugged in the ESP but it was not recognised
#   after looking at `tail -f /var/log/syslog`, I saw that `brltty`
#   was doing something spooky. I remembered having this issue before,
#   and that `brltty` was something to help Braille readers. As I don't
#   need that, I...
# disabled brltty
sudo systemctl stop brltty.service
sudo systemctl mask brltty.service
sudo systemctl disable brltty.service
sudo systemctl restart

# now I could see the ESP as a USB device
$ lsusb
$ ls /dev/ | grep "ttyUSB"
ttyUSB0

# flash ESP
esptool.py --port /dev/ttyUSB0 erase_flash
esptool.py --port /dev/ttyUSB0 --baud 1000000 write_flash --flash_size=4MB -fm dio 0 ESP8266_GENERIC-20241129-v1.24.1.bin
```

That's it installed! Now, using the guides above I found I needed a terminal emulator, so I used `picocom`. And, to reach the pinnacles of complexity, tried turning the inbuilt LED on and off.

```bash
sudo apt install picocom
picocom /dev/ttyUSB0 -b115200
>>> from machine import Pin
>>> p = Pin(2, Pin.OUT)
>>> p.off()
>>> p.on()
```

It works! Neat! The REPL (Read-Evaluate-Print-Loop) is really nice to quickly debug with. Perhaps nicer than the "waiting-for-20-seconds-for-your-C-code-to-flash-onto-the-device".

I also tried connecting to WiFi and using the Web-REPL, so you can execute Python commands over the air! With...

```bash
>>> import network
>>> wlan = network.WLAN(network.WLAN.IF_STA)
>>> wlan.active(True)
>>> wlan.scan()
>>> wlan.isconnected()
>>> wlan.connect("ssid", "key")
>>> # wait a bit
>>> wlan.isconnected()
>>> # or use function from https://docs.micropython.org/en/latest/esp8266/quickref.html#networking
```

Then you can configure `webrepl` with:

```bash
>>> import webrepl_setup
```

…and it will print out an IP that you can connect to and use the REPL from your browser! Very nice.

What I haven't tried yet is using `boot.py`. From what I know it will execute on every reset of the ESP, so basically is how you "program" it, but a lot quicker, since you just place a file on the filesystem.

I'll give that a go soon...
