---
title: how to manually encrypt and decrypt a file (or folder)
date: 2025-01-28
tags: encryption
---
I've wondered the answer to this question for a while.

Today, I figured I'd find out a nice way, as I wanted to store an SSH private key on a server (so I can access it from different computers in different locations). I could also store it on my phone, as I (mostly) have that on me.

The idea could be that you would have a local file, encrypt it, then store it on a server (or any file sharing service like Dropbox/Google Drive/etc). Then, from a different device, you could download it, and unencrypt it.

## set aliases

I found [this answer on the internet](https://unix.stackexchange.com/a/162985), and I set some aliases so I can easily arbitrarily password-encrypt/decrypt files. I set the aliases with [`atuin`](https://atuin.sh/), so they sync across all my devices, but you could also stick this in `~/.bashrc` or elsewhere. The aliases are:

```bashrc
alias decrypt='openssl enc -d -aes-256-cbc -pbkdf2 -in'
alias encrypt='openssl enc -aes-256-cbc -pbkdf2 -in'
```

## encrypt

Then, I can use them by supplying a file, and I get a bunch of jumbled characters, which *I* certainly couldn't crack.

```bash
$ echo 'this is totally an SSH key' > non_encrypted_file.txt

$ encrypt non_encrypted_file.txt | tee encrypted_file.txt
enter AES-256-CBC encryption password: ********
Verifying - enter AES-256-CBC encryption password: ********
=���?���C�9���_Z���>E
```

## decrypt

To decrypt, I put in the same password I used to encrypt:

```bash
$ decrypt encrypted_file.txt
enter AES-256-CBC decryption password: ********
this is totally an SSH key
```

## using pipes

I can also use pipes!

```bash
$ cat non_encrypted_file.txt | encrypt - > encrypted_file.txt
enter AES-256-CBC encryption password: ********
Verifying - enter AES-256-CBC encryption password: ********

$ cat encrypted_file.txt | decrypt -
enter AES-256-CBC decryption password: ********
this is totally an SSH key
```

## notes

### how good is the encryption

I'm not sure how "good" `aes-256-cbc` as an encryption protocol(?). I'll ignore this fact.

### how to expand aliases

in future, I may want to know what type of encryption I use. I could go and look at my aliases file, but I discovered that you can also type `ALT+CTRL+E` (or `ESC+CTRL+E`) to expand aliases inline, so turning line 1 into line 2

```bash
encrypt
openssl enc -aes-256-cbc -pbkdf2 -in
```

### how to encrypt a folder/multiple files

to encrypt a folder, you could use `tar` to turn the folder into a `.tar` file, which looks like a file. Then, use `tar` to stop making it into a file later. A bit like this.

```bash
# create archive
tar -cf non_encrypted_folder.tar non_encrypted_folder/
# encrypt
encrypt non_encrypted_folder.tar > encrypted_folder.tar
# remove original folder
rm -rf non_encrypted_folder/
# decrypt
decrypt encrypted_folder.tar > decrypted_folder.tar
# extract archive
tar -xf decrypted_folder.tar
# check exists
cat non_encrypted_folder/non_encrypted_file.txt 
```
