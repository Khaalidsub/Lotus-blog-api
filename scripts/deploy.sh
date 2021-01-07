#!/bin/bash -x
# set -e
# ssh-keyscan -H $IP >>~/.ssh/known_hosts

# scp ./docker-compose.prod.yml $USER@$IP:.

# ssh $USER@$IP echo "docker-compose -f ./docker-compose.prod.yml up -d --build; docker network inspect lotus-blogs_default_default"

# 1 ==> file for docker to compose
# 2 ==> domain name

## install softwares
function installSoftware() {
    sudo apt install $1
}
function checkFirewallStatus() {
    echo "Checking if ufw is enabled..."
    case "$(systemctl is-active ufw)" in
    active) echo "ufw is active" ;;
    inactive) sudo systemctl enable ufw ;; echo "ufw is active now" ;;
    *) echo "unkown status" ;;
esac
}
function installDocker(){
    sudo apt-get update -y
    sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo apt-key fingerprint 0EBFCD88
    sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) \
    stable"
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io -y
}
function checkDockerStatus(){
    echo "Checking if docker exists..."
    case "$(systemctl is-active docker)" in
    active) echo "docker already exists" ;;
    inactive) installDocker ; systemctl start docker; systemctl enable docker; docker --version  ;;
    *) echo "unkown status" ;;
esac
}

function composeImages(){
     echo "Composing your amazing images..."
    if [[ -e $1]]
    then
        docker-compose -f $1 up -d
        return 0
    else
        echo "file $1 for docker to compose does not exist"
        return 1
    fi
}
function checkCertBot(){
    echo "Checking for any certificates..."
    CERTBOT="certbot run -n --nginx --agree-tos -d $1 ,www.$1  -m  khaalidsubaan@gmail.com  --redirect"

    if [[ -e ~/ect/letsencrypt/live/$1/cert.pem ]]
    then
        echo "the website has already been certified"
    else
        docker exec -it nginx sh -c "$CERTBOT; exit;"
    fi
}

checkFirewallStatus
checkDockerStatus
composeImages $1
checkCertBot $2 
# TASKS
# create scripts that generates the ssh and stores to the server - done
# create scripts that enables firewall and the initial software i.e docker -done
# script that deploys the project -done
# script that creates ssl certificate from certbot -done
# script that imports the data from the previous db
# script that backups the database