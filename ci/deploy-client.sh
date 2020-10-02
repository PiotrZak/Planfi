# #!/bin/bash

# # this script deploys a built Web application to AWS. arguments:
# # $1: the ARN of the role that's allowed to perform a deployment.
# # $2: the name of the S3 bucket to update.
# # $3: the ID of the CloudFront distribution.

# set -eu

# . ./ci/switch-role.sh $1

# aws s3 sync "`pwd`/build" "s3://$2" --delete --exclude "*manifest*" --exclude "*.txt" --exclude "service-worker.js" --exclude "*.map"

# aws cloudfront create-invalidation --distribution-id $3 --paths "/*"


cd /var/www/html/

zip -r myfiles.zip mydir

scp origin root@167.99.140.31:var/www/html/

npm install
npm run-script build








