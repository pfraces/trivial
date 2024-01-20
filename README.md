# quiz.io

Quiz generator

## Build & Deploy to Github Pages

The deployment has been automated with Github Actions.

On every push to `github.com/quiz-io/quiz.io` master branch, the sources are
built and pushed to `github.com/quiz-io/quiz-io.github.io` master branch.

On every push to `github.com/quiz-io/quiz-io.github.io` master branch, Github
deploys the contents to the Github Pages at `quiz-io.github.io`.

## Release

```sh
npm version [major | minor | patch] -m "v%s"
git push && git push --tags
```
