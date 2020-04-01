install and build lambda 
```
npm run install-all
```

start local dev
```
npm run start --env=local
```

to deploy into an account
```
npm run deploy --bucket=s3-bucket-name --env=acceptance
```
or
```
npm run deploy --bucket=s3-bucket-name --env=production
```


## note

in `template.yaml`
```
                    DelegateAuthUrl: 
                        Fn::If: [ Acceptance,
                                "https://61325bf2-76ff-4e97-af56-f9632b5ba0c0.mock.pstmn.io/latest/verify",
                                false
                        ]
```
specifies the url that authentication will be delegated to, this endppont should return `Allow` or `Deny`, the mock returns `Allow` for all requests

remove this variable if you do not have a delegation url


be sure to build the code locally and git add the mixin-common-auth lambda code before pushing to builder to make sure the build checks have access to the lambda source code before verifying template