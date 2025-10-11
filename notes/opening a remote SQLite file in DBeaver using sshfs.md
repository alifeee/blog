---
title: opening a remote SQLite file in DBeaver using sshfs
date: 2025-10-11
tags:
- sqlite
- dbeaver
- sshfs
- ssh
- linux
---
[DBeaver](https://dbeaver.io/) is a database management program. [SQLite](https://sqlite.org/) is a database format which uses a single file (e.g., `database.sqlite`). You can open `.sqlite` files in DBeaver, but only on your local computer.

I wanted to open an `.sqlite` file on a remote server, without downloading it every time. I found out about `sshfs` ("SSH FileSystem") which mounts a remote filesystem on your local filesystem, so you can pretend the remote `.mysql` file is a file on your computer.

I set up `sshfs` like so:

```bash
sudo apt install sshfs
sudo mkdir -p /media/alifeee/remotefiles
sudo chown alifeee:alifeee /media/alifeee/remotefiles
sshfs server:/usr/alifeee/ /media/alifeee/remotefiles
```

Now `/media/alifeee/remotefiles` appears in my file browser just like any other drive I would plug into my computer. Neat. Who needs FTP… ;]
