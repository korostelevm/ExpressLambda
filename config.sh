#!/usr/bin/env bash

# pss bucket name as argument
if [ ! -z "$1" ];then
    account_id=$(aws sts get-caller-identity | jq -r .Account)
    bucket=$1
    npm run config -- --account-id="$account_id" --bucket-name="$bucket" 
fi
npm run setup