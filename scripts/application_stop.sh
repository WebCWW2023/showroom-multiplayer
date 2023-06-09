#!/bin/bash
#Stopping existing node servers
echo "Stopping showroom Multiplayer"

# pm2 stop --silent office-mp 
# pm2 delete --silent office-mp 

pm2 describe showroom-mp > /dev/null
RUNNING=$?

if [ "${RUNNING}" == 0 ]; then
  pm2 delete --silent showroom-mp
fi;