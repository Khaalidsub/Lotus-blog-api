#!/bin/bash -xe
# 1 ==> file to check for the ssh key
# 2 ==> user type
# 3 ==> ip address of the server
# 4 ==> project  to copy and paste to the server
# 5 ==> destination project  to copy and paste to the server
# 6 ==> file that runs several scripts
# 6 ==> destination file in the server
scp -i $1 $4 $2@$3:$5
scp -i $1 $6    $2@$3:$6 && ssh -i $1 $2@$3  "$6 $5"
