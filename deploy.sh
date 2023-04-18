#!/bin/bash
 
if [[ $VERCEL_GIT_COMMIT_REF == "master"  ]] ; then 
  echo "Creating a production build..."
  npm run build:prod
elif [[ $VERCEL_GIT_COMMIT_REF == "staging"  ]] ; then
  echo "Creating a staging build..."
  npm run build:staging
elif [[ $VERCEL_GIT_COMMIT_REF == "develop"  ]] ; then
  echo "Creating a development build..."
  npm run build:dev
else 
  echo "Creating default build..."
  npm run build
fi