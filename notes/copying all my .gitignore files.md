---
date: 2024-11-04
title: copying all the files that are ignored by .gitignore in multiple projects
tags:
- bash
- git
---
I clone all git projects into the same folder, (`~/git` on my personal linux computers, something like `Documents/GitHub` or `Documents/AGitFolder` on Windows).

I want to move my Windows laptop to Linux, but I don't want to keep the Windows hard drive. The laptop has only one drive slot, and I can't be bothered to take it apart and salvage the drive - I'd rather just wipe the whole drive. However, I'd like to keep some things to move to Linux, like my SSH keys, and any secrets or passwords I use in apps.

One source of secrets is the many files ignored by git, like `.env` or `secrets.py`. Thankfully, these are usually excluded from git tracking by writing them in `.gitignore` files. So... I should be able to find all the files by searching for `.gitignore` files in my git folder!

Here is a command I crafted to do that (I truncated the output to only show a few examples):

```bash
$ while read file; do folder=$(echo "${file}" | sed s'/[^\/]*$//'); cat "${file}" | awk '/^#/ {next} /^ *$/ {next} /\*/ {next} /.*\..+[^\/]$/ {print}' | awk '{sub(/^\//, ""); printf "'"${folder}"'%s\n", $0}' > /tmp/files13131.txt; while read f; do [ -f "${f}" ] && echo "${f}"; done < /tmp/files13131.txt; done <<< $(find . -maxdepth 4 -name ".gitignore")
./blog/.env
./gspread/tests/creds.json
./invoice_template/invoice.toml
./polycule-visualiser/polycule.json
./polycule-visualiser/_data/URIs.json
./summon2scale-scoreboard/scoreboard.sqlite
./website-differ/.env
./website-differ/sites.csv
```

(fyi those repositories are: [blog](https://github.com/alifeee/blog), [gspread](https://github.com/burnash/gspread), [invoice_template](https://github.com/alifeee/invoice_template/), [polycule-visualiser](https://github.com/alifeee/polycule-visualiser/), [summon2scale-scoreboard](https://github.com/alifeee/summon2scale-scoreboard), [website-differ](https://github.com/alifeee/website-differ))

For fun, I'll describe each bit of the command

```bash
while read file; do # this runs the loop for each input line of AA below
  folder=$(echo "${file}" | sed s'/[^\/]*$//'); # turn "./folder/.gitignore" into "./folder" by stripping all content after final "/"
  cat "${file}" # output contents of file
    # skip all lines of .gitignores which start with "#", are blank lines, or contain "*".
    #   then select only lines that end with ".something" (i.e., are files not directories) and print them
    | awk '/^#/ {next} /^ *$/ {next} /\*/ {next} /.*\..+[^\/]$/ {print}'
    # some files are "file.txt", some are "/file.txt", so first remove leading slashes, then print folder and file
    | awk '{sub(/^\//, ""); printf "'"${folder}"'%s\n", $0}'
    > /tmp/files13131.txt; # in order to check each file exists we need another loop, so put the list of files in a temporary file for now
  while read f; do # run the loop for each input line of BB below
      [ -f "${f}" ] && echo "${f}"; # before the && is a test to see if the file "${f}" exists, and it is echo'd only if the file does exist
    done < /tmp/files13131.txt; # this is BB, "<" sends the output of the next file to the loop
done <<< $( # this is AA, "<<< $(" sends the output of the following command to the loop
  find . -maxdepth 4 -name ".gitignore" # this finds all files named .gitignore in the current directory to a max depth of 4 directories
)
```

if we send the output of the command to `files.txt` (or copy and paste into there), then we can copy all these files to a folder `_git`, and preserve the structure of the folders, with:

```bash
rootf="_git"; while read file; do relfile=$(echo "${file}" | sed 's/^\.\///'); relfolder=$(echo "${relfile}" | sed 's/[^\/]*$//'); mkdir -p "${rootf}/${relfolder}"; cp "${file}" "${rootf}/${relfile}"; done < files.txt
```

and explained:

```bash
rootf="_git"; # set a variable to the folder to copy to so we can change it easily
while read file; do # loop over the file given in AA and name the loop variable "file"
  # turn "./folder/sub/file.txt" into "folder/sub/file.txt" by replacing an initial "./" with nothing
  relfile=$(echo "${file}" | sed 's/^\.\///');
  # turn "folder/sub/file.txt" into "folder/sub/" by replacing all content after the final "/" with nothing
  relfolder=$(echo "${relfile}" | sed 's/[^\/]*$//');
  # create directories for the relative folder e.g., "folder/sub", "-p" means create all required sub-directories
  mkdir -p "${rootf}/${relfolder}";
  # copy the file to the folder we just created
  cp "${file}" "${rootf}/${relfile}";
done < files.txt # use files.txt as the input to the loop
```

Now, I can put the files on a memory stick, and I have a very volatile memory stick that I shouldn't lose.

and I can put the memory stick into Linux when I boot it, so I don't lose any of my secrets.

To be honest, I don't think many of them were really important, and would probably just require me to go searching for API keys whenever I wanted to edit a project.

But, making these two commands was pretty fun.
