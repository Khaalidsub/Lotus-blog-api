#!/bin/bash -xe
# 1 ==> file area to store the key
# 2 ==> the server user
# 3 ==> the ip address of the server

ssh-keygen -b 2048 -t rsa -f $1 -q   && ssh-copy-id -i $1 $2@$3
eval `ssh-agent -s`
ssh-add $1