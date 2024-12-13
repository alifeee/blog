---
title: installing my own VPN on my server was much easier than I thought
date: 2024-12-13
tags:
- vpn
- server
- open-access
---
I've thought about installing a VPN on my server for a few months. It wouldn't allow the perhaps-more-common VPN use of getting past region-locked content (as I can't change the region of my server), but as an academic exercise, and for other reasons, I gave it a try installing a VPN on my server.

It was super easy! All I ran was:

```bash
wget https://git.io/vpn -O openvpn-install.sh
sudo bash openvpn-install.sh
```

I accepted all the default settings (IP / UDP / port / DNS servers) apart from username (alifeee), allowed the port through my firewall (which uses Uncomplicated FireWall (`ufw`)) with `sudo ufw allow 1194` (the default port), and a file `alifeee.ovpn` was created. That file was pretty simple, and basically just a few keys, and looked a bit like this:

```ovpn
client
dev tun
proto udp
remote xxx.xx.xxx.xxx 1194
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
auth SHA512
ignore-unknown-option block-outside-dns
verb 3
<ca>
-----BEGIN CERTIFICATE-----
awiohi3hrt7832h8whefiuhy372wjofeijhiu324htwefpjh32ihefjvhguiy238
28y3tfhunh3278yhiugj3y2iuejgvi32t7uojqwevg7t2ui3egv7i3tu2wegvuit
...
...
3289qewfu8it3j28geu428uhewgimnio23uewgnvdiuw482hj3iegdv98b7suywh
3qw8fu3it2niop9wq8fuvegjny32klqoewiu8bhgjnq3==
-----END CERTIFICATE-----
</ca>
<cert>
-----BEGIN CERTIFICATE-----
awiohi3hrt7832h8whefiuhy372wjofeijhiu324htwefpjh32ihefjvhguiy238
28y3tfhunh3278yhiugj3y2iuejgvi32t7uojqwevg7t2ui3egv7i3tu2wegvuit
...
...
3289qewfu8it3j28geu428uhewgimnio23uewgnvdiuw482hj3iegdv98b7suywh
3qw8fu3it2niop9wq8fuvegjny32klqoewiu8bhgjnq3==
-----END CERTIFICATE-----
</cert>
<key>
-----BEGIN PRIVATE KEY-----
awiohi3hrt7832h8whefiuhy372wjofeijhiu324htwefpjh32ihefjvhguiy238
28y3tfhunh3278yhiugj3y2iuejgvi32t7uojqwevg7t2ui3egv7i3tu2wegvuit
...
...
3289qewfu8it3j28geu428uhewgimnio23uewgnvdiuw482hj3iegdv98b7suywh
3qw8fu3it2niop9wq8fuvegjny32klqoewiu8bhgjnq3==
-----END PRIVATE KEY-----
</key>
<tls-crypt>
-----BEGIN OpenVPN Static key V1-----
8rq328r8ij3fwy73uiwtoeg8u3hiweg3
38efuiot328yguwhgjovi8u32qwaghhj
...
...
ot3iu7wsaopkijguwthji3qwokijnegh
tiu3eyvjieg93nwjsgkobjhunt3etuhf
-----END OpenVPN Static key V1-----
</tls-crypt>
```

This file was small enough that I was able to copy it in only two screens through ConnectBot on my phone. To install it, I:

- opened the VPN settings on Linux, where I could import a `.ovpn` file by default
- installed the OpenVPN app on Android which let me import the file
- I haven't installed it on Windows but I'm presuming it's as easy as installing some OpenVPN app

Since I've installed it, it's actually been pretty useful. I've used it:

- on trains or in cafés to hide my traffic (I think)
- to download PlatformIO libraries as my ISP blocked the library hosting website inexplicably
- to access <https://sci-hub.se/>, which my ISP also blocks (this post brought to you by: my ISP being super annoying)

So, if you want to get round blocks, hide your traffic, or other VPN shenanigans, you could create a VPS (Virtual Private Server) and install OpenVPN to it pretty easily. Perhaps you could even get around region locks if you picked a server location in a region you wanted.
