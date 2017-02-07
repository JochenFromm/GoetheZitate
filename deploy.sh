
cd src
zip -r -X index.zip *
aws lambda update-function-code --function-name 'GoetheZitat' --zip-file 'fileb://index.zip'
rm index.zip
cd ..
