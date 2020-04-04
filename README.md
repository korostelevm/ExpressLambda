```
npm run install-all
```

create a `.env.json` file with an object containing keys and values for each of the lambda environent variables in `template-api.yaml`

```yaml
...
Environment:
        Variables:
          CosmosDbConnectionString: !Ref CosmosDbConnectionString
...
```


start vue app and express backend on local
this will start a vue dev server on port 1111 and a dev express server on port 3000 and open a browser to the vue app
```
npm run start 
```


build app, this will build the vue spa module and move it to the lambda's public files dir along with index.html
```
npm run build
```

to depoloy, authenticate into aws and :
```
npm run deploy --bucket=YOUR-S3-BUCKET
```