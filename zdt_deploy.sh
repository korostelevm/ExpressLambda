#! /usr/bin/env bash
set -ex

sha_8=$(git rev-parse HEAD | cut -c1-8)
stack_name=${PWD##*/}-${sha_8}
stack_name=${PWD##*/}-xxxxxx
template_file=${PWD##*/}
bucket=$1

./build_before

# launch/update init stack
aws cloudformation deploy --template-file ${PWD##*/}-init.yaml --stack-name ${PWD##*/}-init --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset
APIDomainName=$(aws cloudformation describe-stack-resources --stack-name ${PWD##*/}-init --logical-resource-id APIDomainName --query 'StackResources[].{name:PhysicalResourceId}' --output text)
echo $APIDomainName


# launch/update service stack with sha suffix
sam package --template-file template.yaml --use-json --s3-bucket ${bucket} --s3-prefix ${stack_name} --output-template-file ${template_file}.json
sam deploy --template-file ${template_file}.json --stack-name ${stack_name} --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset

# launch/update zdt switch stack wand point to api from service
RestApiId=$(aws cloudformation describe-stack-resources --stack-name ${stack_name} --logical-resource-id ServiceApi --query 'StackResources[].{name:PhysicalResourceId}' --output text)
echo $RestApiId
echo $APIDomainName
aws cloudformation deploy --template-file ${PWD##*/}-deployment.template --stack-name ${PWD##*/}-zdt --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset --parameter-overrides RestApiId=${RestApiId} APIDomainName=${APIDomainName} CreateMapping=true