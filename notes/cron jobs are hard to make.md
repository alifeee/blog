---
title: cron jobs are hard to make
date: 2024-11-03
tags:
  - cron
---
cron jobs are a great tool, but it's very difficult to test them. a lot of the time, I create a cron job, and simply check back a day later to see if it did anything.

I've now developed a process (when making something work that's super annoying, you stick to your solution, even if it's hacky), which is:

- make a bash script that does what I want the cron to do, e.g., `collect.sh`
- `cd` out of the folder and test the script works in a "sub-job" (brackets), i.e., 
    ```bash
    cd /
    (cd /usr/alifeee/cool-thing/; ./collect.sh >> cron.log)
    ```
- put that exact command (with brackets) in the cron job

before I did this, I was making sure that the scripts I made worked when called from any directory (i.e., by making each call to a file use `"${root_directory}/${file}"`). This was kind of annoying and I much prefer the "just `cd` into the directory before running the script" method.

Here are all of my current cron jobs on my [server](https://server.alifeee.co.uk) currently:

```crontab
0 10 * * * /home/alifeee/scripts/combine_treehouse.sh >> /home/alifeee/scripts/cron.log 2>&1

0 11 * * * /var/www/ringram/next.sh >> /var/www/ringram/cron.log 2>&1
0 23 * * * /var/www/ringram/update.sh >> /var/www/ringram/cron.log 2>&1

# clean up old calendar events
0 23 * * * /var/www/simple-calendar/hoover.py >> /var/www/simple-calendar/cron.log 2>&1

# new weather map every 15 mins
*/15 * * * * (cd /usr/alifeee/weather_landscape; /usr/alifeee/weather_landscape/.venv/bin/python /usr/alifeee/weather_landscape/make_image.py >> /usr/alifeee/weather_landscape/cron.log 2>&1)

# get latest sheffield events
0 3 * * * (cd /usr/alifeee/sheffield-events/; echo "" > cron.log)
0 4 * * * (cd /usr/alifeee/sheffield-events/; ./get_all.sh >> cron.log 2>&1)
```

some of the commands could really be simpler, but as I said: "if it works: I will leave it until it breaks"

they are related to these projects (match them up yourself):

- <https://gist.github.com/alifeee/2eb9ac2296a698dc8a05d4ed531d8d36>
- <https://github.com/alifeee/ringram>
- <https://github.com/alifeee/simple-calendar>
- <https://github.com/alifeee/weather_landscape/tree/image_gen>
- <https://github.com/alifeee/sheffield-events/>
