# quiz.io

Quiz generator

## Build

Having `quiz.io` and `quiz-io.github.io` in the same folder, go to the
`quiz.io` root and execute the following commands from a bash terminal:

```sh
npm run build
cd ../quiz-io.github.io/
rm -rf *
cp -r ../quiz.io/build/. .
```

Once the new build is in place, commit and push the changes to production.
