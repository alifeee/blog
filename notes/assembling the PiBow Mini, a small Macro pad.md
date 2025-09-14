---
title: "assembling the PiBow Mini, a small Macro pad"
date: 2025-09-14
tags:
- hardware
- keyboards
- raspberry-pi
- scripting
---
## What is it

I picked up a [Keybow Mini](https://shop.pimoroni.com/products/keybow-mini-3-key-macro-pad-kit) from [Sheffield Hackspace](https://www.sheffieldhackspace.org.uk/) a few weeks ago, which is a small 3-key mechanical keyboard or "macro pad".

It had been donated to the hackspace by [Pimoroni](https://pimoroni.com/); I also picked up a donated Pi Zero and a lying 1024GB SD card I'd picked up a few weeks ago, and assembled it.

## Assembly

Unfortunately, this is a text only-blog. I assure you that the pictures of me putting keycaps and circuitboards together are incredibly riveting — but you'll just have to imagine.

## end result

After following the [assembly guide](https://learn.pimoroni.com/article/assembling-keybow-mini) and the [creating macros guide](https://learn.pimoroni.com/article/using-macros-and-snippets-with-keybow), I had a little 3-key keyboard which could increase, decrease, or mute my volume (via media keys). I wanted to have more options, so I wrote a little layout in Lua in which the left button switches "layout", and the other two buttons do different actions based on which layout is currently enabled. The keys I started with are:

- Volume Up / Volume Down
- F15 / F16
- F17 / F18

…where the latter two groups are from the ['expanded function key set'](https://www.reddit.com/r/pcmasterrace/comments/r1pord/did_you_know_there_are_f13f24_keys/).

## AutoKey

It works well! I can use the function keys to run macros with [AutoKey](https://github.com/autokey/autokey). For example, here's a script which prints the current date:

```python
output = system.exec_command("date '+%Y-%m-%d'")
keyboard.send_keys(output)
```

## Firmware

Here's the Lua script for what I described. I think it's pretty readable.

```lua
require "keybow"

-- do loads of things --
--   left button switches between mode
--   do not use F13 as by default it opens settings
-- red: media controller
-- blue: send F15 and F16
-- green: send F17 and F18

Kbsetup = 0
TotKbSetups = 3

function setup()
    keybow.use_mini()
    keybow.auto_lights(false)
    keybow.clear_lights()
    keybow.set_pixel(0, 255, 0, 0)
    keybow.set_pixel(1, 255, 0, 0)
    keybow.set_pixel(2, 255, 0, 0)
end

-- left key
function handle_minikey_02(pressed)
    if (pressed) then
        Kbsetup = (Kbsetup + 1) % TotKbSetups
    end
    if (Kbsetup == 0) then
        -- print("setup 1")
        keybow.set_pixel(0, 255, 0, 0)
        keybow.set_pixel(1, 255, 0, 0)
        keybow.set_pixel(2, 255, 0, 0)
    elseif (Kbsetup == 1) then
        -- print("setup 2")
        keybow.set_pixel(0, 0, 255, 0)
        keybow.set_pixel(1, 0, 255, 0)
        keybow.set_pixel(2, 0, 255, 0)
    elseif (Kbsetup == 2) then
        -- print("setup 3")
        keybow.set_pixel(0, 0, 0, 255)
        keybow.set_pixel(1, 0, 0, 255)
        keybow.set_pixel(2, 0, 0, 255)
    end
end

-- middle key
function handle_minikey_01(pressed)
    if Kbsetup == 0 then
        keybow.set_media_key(keybow.MEDIA_VOL_DOWN, pressed)
    elseif Kbsetup == 1 then
        keybow.set_key(keybow.F15, pressed)
    elseif Kbsetup == 2 then
        keybow.set_key(keybow.F17, pressed)
    end
end

-- right key
function handle_minikey_00(pressed)
    if Kbsetup == 0 then
        keybow.set_media_key(keybow.MEDIA_VOL_UP, pressed)
    elseif Kbsetup == 1 then
        keybow.set_key(keybow.F16, pressed)
    elseif Kbsetup == 2 then
        keybow.set_key(keybow.F17, pressed)
    end
end
```

## Final notes

The only annoying thing is that to reprogram the PiBow Mini, you've got to unplug it, remove the SD card, plug it into a laptop (in my case as only my laptop has an SD reader), copy the new Lua files over, unplug the SD card, plug it in, test the new code, and repeat if it doesn't work as intended.

That's why I opted to send function keys, which I can turn into hotkeys using AutoKey, then I only have to change a Python script, and not redo a whole device firmware.

But, it's pretty neat!
