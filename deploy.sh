#! /usr/bin/env bash
set -e
version=$(git rev-parse HEAD | cut -c1-8)
version=xxxxxxx
app_name=${PWD##*/}
bucket=$1


echo "
Deploying - 
    bucket: ${bucket}
    version: ${version}
    app_name: ${app_name}

    "
# echo -n "you down with that? (y/n)? "
# read answer
# if [ "$answer" != "${answer#[Yy]}" ] ;then
#     echo Deploying ${app_name}-${version}
# else
#     echo Aborted
#     exit 0
# fi

set -x
npm run build:microfrontend

aws cloudformation deploy --template-file template-static-infra.yaml --stack-name ${app_name}-static-infra --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset
APIDomainName=$(aws cloudformation describe-stack-resources --stack-name ${app_name}-static-infra --logical-resource-id APIDomainName --query 'StackResources[].{name:PhysicalResourceId}' --output text)


sam package --template-file template-api.yaml --s3-bucket ${bucket} --s3-prefix ${app_name}-${version} --output-template-file template-api-built.yaml
sam deploy --template-file template-api-built.yaml --stack-name ${app_name}-${version}-api --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset

# launch/update zdt switch stack wand point to api from service
RestApiId=$(aws cloudformation describe-stack-resources --stack-name ${app_name}-${version}-api --logical-resource-id ServiceApi --query 'StackResources[].{name:PhysicalResourceId}' --output text)
aws cloudformation deploy --template-file template-version-pointer.yaml --stack-name ${app_name}-version-pointer --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset --parameter-overrides RestApiId=${RestApiId} APIDomainName=${APIDomainName} CreateMapping=true
rm template-api-built.yaml