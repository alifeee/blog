---
title: installing Waydroid, an Android emulator, on Linux
date: 2025-03-19
tags:
- linux
- android
- installation
---
I wanted to use Android on Linux, so I searched the web and found <https://waydro.id/>.

Instead of running in some kind of virtual machine, it seems to run Android slightly more natively on Linux (I really don't know how any of this works).

Here is a small adventure at trying to install it:

## Official installation guide

Following steps from <https://docs.waydro.id/usage/install-on-desktops#ubuntu-debian-and-derivatives> (I'm on Pop!\_OS which I think is based on Debian).

```bash
$ sudo apt install curl ca-certificates
$ curl -s https://repo.waydro.id | sudo bash
$ sudo apt install waydroid
$ waydroid init
[11:27:05] Failed to load binder driver
[11:27:05] modprobe: FATAL: Module binder_linux not found in directory /lib/modules/6.13.0-061300-generic
[11:27:05] ERROR: Binder node "binder" for waydroid not found
[11:27:05] See also: https://github.com/waydroid
```

I don't really know what this error meant, but after searching, it seemed that Waydroid needed "wayland" and I was using X (which are both Desktop thingies which make pixels appear on the screen). I read things about Pop!\_OS not having something necessary installed in the kernel, but I could use "DKMS", meaning Dynamic Kernel Module Support. So I tried installing what I'd found links to with:

```bash
git clone https://github.com/choff/anbox-modules
cd anbox-modules && ./INSTALL.sh
```

now when I ran `waydroid init` it worked, but then I got nothing. I wasn't really sure what I was supposed to be doing to "open" it now that it was "init"'d. So I deleted all I could with

```bash
$ sudo apt remove waydroid
$ sudo find / -type d -name "waydroid"
/var/lib/waydroid
$ rm -rf /var/lib/waydroid
```

…and found a helper script to do stuff for me.

## Installation script

The script I found was <https://github.com/n1lby73/waydroid-installer>, which I ran with

```bash
git clone https://github.com/n1lby73/waydroid-installer
cd waydroid-installer
sudo bash install_script.sh
```

The script didn't complete, and complained about modules not installing, specifically that `lxd-client` could not be installed.

Looking at the script I saw it was trying to run `apt install lxd-client` but running that myself, it seemed that it didn't exist:

```bash
$ sudo apt install lxd-client
E: Unable to locate package lxd-client
```

After searching, it seems `lxd-client` provides a command `lxc`, so I looked for how to install `lxc`, and found it was possible via `snap`. I've not really used `snap` before and people have complained about it (about filesize and automatic updates), so I was wary to install it, but I did with:

```bash
$ sudo apt install snapd
$ sudo snap install lxd
$ lxc --version
5.21.3 LTS
```

I removed `lxd-client` from the install script and re-ran it, and it seemed to work OK. It said it installed a "Wayland" desktop option on my login page if I rebooted.

## Opening waydroid

So I rebooted, and on the login screen selected "Pop on Wayland" (I'm still not fully sure what this X/Wayland thing is), and tried starting Waydroid.

Running…

```bash
waydroid session start
```

…and…

```bash
waydroid show-full-ui
waydroid app install org.fedorahosted.freeotp_46.apk
waydroid app install Firefox Fast & Private Browser_136.0.2_APKPure.apk
```

…installed some apps and filled one of my screens with a big Android display.

I found the APKs on either [F-Droid](https://f-droid.org/en/), which just has them available for download (sweet) or by searching the web and downloading them from sketchy sites.

It seems to work well!

I suppose there's a lot you can do with Waydroid, if you want. I don't think I want.

In some ways, this is an example of the involved-nature of installing things on Linux.
