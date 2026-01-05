---
title: automatically moving SSL certificates after LetsEncrypt renews them
date: 2026-01-05
tags:
- letsencrypt
- ssl
- mqtt
- scripting
---
Some things require SSL. Mostly websites, but other things use certificates for encrypted communication too.

One thing I recently set up was an MQTT broker (for a [box server](https://github.com/alifeee/box-server)), and I wanted it to be encrypted, so I had to provide SSL certificates. Specifically, my mosquitto configuration (`/etc/mosquitto/conf.d/alifeee.conf`) was:

```conf
allow_anonymous false
require_certificate false
password_file /etc/mosquitto/passwd

listener 1883

listener 8883
certfile /etc/mosquitto/certs/cert.pem
cafile   /etc/mosquitto/certs/chain.pem
keyfile  /etc/mosquitto/certs/privkey.pem

listener 8083
protocol websockets
certfile /etc/mosquitto/certs/cert.pem
cafile   /etc/mosquitto/certs/chain.pem
keyfile  /etc/mosquitto/certs/privkey.pem
```

so these were my certificate files:

- `/etc/mosquitto/certs/chain.pem
- `/etc/mosquitto/certs/privkey.pem`
- `/etc/mosquitto/certs/cert.pem`

I made some certificates with [LetsEncrypt](https://letsencrypt.org/), and tried creating a symlink from the above paths to the below certificates

- `/etc/letsencrypt/live/mqtt.alifeee.net/chain.pem`
- `/etc/letsencrypt/live/mqtt.alifeee.net/privkey.pem`
- `/etc/letsencrypt/live/mqtt.alifeee.net/cert.pem`

but that didn't work as the MQTT broker (`mosquitto`) ran as the `mosquitto` user, which didn't have access to read the `/etc/letsencrypt/live` directory.

Eventually, I found out I could run scripts after LetsEncrypt renewed certificates, by putting scripts in `/etc/letsencrypt/renewal-hooks/deploy/`. I spent a while not being able to trigger the script because I hadn't ended the name in `.sh`, which was annoying. Anyway, in the end the script is this, which copies the certificates, changes the permissions and ownership, and restarts `mosquitto`:

```bash
#!/bin/sh
# /etc/letsencrypt/renewal-hooks/deploy/mosquitto-copy.sh

# This is an example deploy renewal hook for certbot that copies newly updated
# certificates to the Mosquitto certificates directory and sets the ownership
# and permissions so only the mosquitto user can access them, then signals
# Mosquitto to reload certificates.

# RENEWED_DOMAINS will match the domains being renewed for that certificate, so
# may be just "example.com", or multiple domains "www.example.com example.com"
# depending on your certificate.

# Place this script in /etc/letsencrypt/renewal-hooks/deploy/ and make it
# executable after editing it to your needs.

# Set which domain this script will be run for
MY_DOMAIN=mqtt.alifeee.net
# Set the directory that the certificates will be copied to.
CERTIFICATE_DIR=/etc/mosquitto/certs

echo "doing"
echo "renewed domains: ${RENEWED_DOMAINS}"

for D in ${RENEWED_DOMAINS}; do
  if [ "${D}" = "${MY_DOMAIN}" ]; then
    echo "doing for domain !"
    # Copy new certificate to Mosquitto directory
    cp ${RENEWED_LINEAGE}/cert.pem ${CERTIFICATE_DIR}/cert.pem
    cp ${RENEWED_LINEAGE}/chain.pem ${CERTIFICATE_DIR}/chain.pem
    cp ${RENEWED_LINEAGE}/privkey.pem ${CERTIFICATE_DIR}/privkey.pem

    # Set ownership to Mosquitto
    chown mosquitto: ${CERTIFICATE_DIR}/*.pem

    # Ensure permissions are restrictive
    chmod 0600 ${CERTIFICATE_DIR}/*.pem

    # Tell Mosquitto to reload certificates and configuration
    pkill -HUP -x mosquitto
  fi
done
```

To test if it works, you can run LetsEncrypt's `certbot` in dry-run mode with deploy hooks, so it won't refresh the certificate, but will act normally with deploy hooks.

```bash
sudo certbot certonly -d mqtt.alifeee.net --dry-run --run-deploy-hooks
```
