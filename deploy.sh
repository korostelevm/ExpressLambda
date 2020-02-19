#!/usr/bin/env bash

account_id=$(aws sts get-caller-identity | jq -r .Account)
bucket='cold-lambda'
npm run config -- --account-id="$account_id" --bucket-name="$bucket" 
npm run setup