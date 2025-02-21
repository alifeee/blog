---
title: how easily can I get back into an old CO2 monitoring project?
date: 2024-11-25
tags:
  - documentation
  - microcontrollers
  - co2
---
About 10 months ago I acquired a CO2 sensor ([Sensirion SCD40](https://sensirion.com/products/catalog/SCD40)), I attached it to a [D1 Mini ESP8266](https://www.wemos.cc/en/latest/d1/d1_mini.html) microcontroller, and for a week I looked into CO2 monitoring. At the end, I set up an [InfluxDB](https://www.influxdata.com/) database, and flashed the microcontroller to get and upload the CO2 data every 30 seconds. Eventually, I set Influx to delete data over 7 days old (as I didn't want to make a weird historical "is anyone in the room" sensor), and from then I could visit my Influx to see how much CO2 was in the room the sensor was in.

Since then, I have:

1. forgotten a lot of how I did it
2. stopped using VSCode (started using [VSCodium](https://vscodium.com/)), which I used to flash the microcontroller using the [PlatformIO](https://platformio.org/) extension, which doesn't work in VSCodium
3. stopped using Windows (started using Linux)

I wanted to re-use the sensor at an environmental talk today, so I grabbed it and started a small task. But, I didn't know whether it would be easy to reprogram the device, or to get data from it, or how possible it would be, as I no longer use either the OS (Windows) or the tool (VSCode) I used. I knew that PlatformIO had a CLI (Command Line Interface), so I didn't *need* the VSCode plugin to use it, and I knew programming/serial communication was probably easy enough on Linux. To be honest, I would rather know how to use the CLI than the plugin, as I prefer this most of the time. Then, when I write instructions, I can write commands instead of writing "press this button in the GUI".

I'd written a lot in the [documentation](https://github.com/alifeee/co2-monitoring) on the project, so hopefully I didn't have to remember much. This is what I had to remember...

- I had to install platformio (PIO). I did this using their [installer script](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html#id1) and then I linked the CLI executables with `ln` following [PIO's instructions](https://docs.platformio.org/en/latest/core/installation/shell-commands.html#piocore-install-shell-commands)
- I ran `pio run` and it built the binaries fine
- when I plugged in the microcontroller, it was not showing when I ran `pio device list`
    - it was showing under `lsusb`
    - I ran `dmesg` and it showed that the USB device connected to `ttyUSB0` and then immediately disconnected. I googled the error, which it turns out was about something called `brltty`, which is a braille program of some kind. I uninstalled it, as I don't use braille devices, and all was now good.
- I was able to use `pio device monitor` to see the messages being sent via Serial. When I most recently programmed the microcontroller, I accidentally left the Serial communication on (I'd made an option to disable it), which in the end was helpful
- I realised you need `pio run -t upload` to upload the firmware to the microcontroller, but it failed. I needed to update some `udev` rules. There was a link in the error output to a page which had some commands to do this

After all this figuring, I was able to reflash the microcontroller to just send environment information over Serial (i.e., not push to InfluxDB), so then I could use some commands to display a big "604 ppm" on my terminal screen.

```bash
# log from monitor
pio device monitor --quiet | awk '{printf "%s\t%s\n", strftime("%H:%M:%S", systime()), $0}' | tee env.log
# display nicely
tail -n1 env.log | awk -F'\t' '{printf "%s ppm.", $2}' | figlet -t -c
# plot
# install eplot and chmox +x
cat env.log | awk -F'\t' '{print $2}' | eplot -d -t CO2
```
