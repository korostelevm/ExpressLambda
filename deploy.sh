#! /usr/bin/env bash
set -ex
sha_8=$(git rev-parse HEAD | cut -c1-8)
app_name=${PWD##*/}-xxxxxx
bucket=$1

npm run build:microfrontend

aws cloudformation deploy --template-file template-static-infra.yaml --stack-name ${app_name}-static-infra --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset
APIDomainName=$(aws cloudformation describe-stack-resources --stack-name ${app_name}-static-infra --logical-resource-id APIDomainName --query 'StackResources[].{name:PhysicalResourceId}' --output text)


sam package --template-file template-api.yaml --s3-bucket ${bucket} --s3-prefix ${app_name}-api --output-template-file template-api-built.yaml
sam deploy --template-file template-api-built.yaml --stack-name ${stack_name} --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset

# launch/update zdt switch stack wand point to api from service
RestApiId=$(aws cloudformation describe-stack-resources --stack-name ${app_name}-api --logical-resource-id ServiceApi --query 'StackResources[].{name:PhysicalResourceId}' --output text)
aws cloudformation deploy --template-file ${app_name}-version-pointer.template --stack-name ${app_name}-version-pointer --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset --parameter-overrides RestApiId=${RestApiId} APIDomainName=${APIDomainName} CreateMapping=true