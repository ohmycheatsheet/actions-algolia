# OhMyCheatsheet x Algolia - Github Actions
*sync github issues to algolia*

## usage

1. Create `.github/workflows/algolia.yml` file in your repo
2. Add the following code to the `algolia.yml` file
## variables

|name|description|type|required|
|:---:|:---:|:---:|:---|
|GITHUB_TOKEN|fetch github issues|string|true|
|ALGOLIA_APPID|algolia required|string|true|
|ALGOLIA_APP_KEY|algolia required|string|true|

## development

Setup environment

1. copy `.env.sample` file
2. replace `GITHUB_TOKEN`, `ALGOLIA_APPID`, `ALGOLIA_APP_KEY`

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```yml
pnpm
pnpm run build
ga .
gpsup
```

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md), the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.
