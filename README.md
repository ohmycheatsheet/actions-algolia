# OhMyCheatsheet x Algolia - Github Actions
*sync github issues to algolia*

## usage

In default, it will sync github issues to algolia index named `cheatsheets_issues` and `cheatsheets_labels`

1. Create `.github/workflows/cronjob.yml` and `.github/workflows/issue.yml` file in your repo
2. Add the following code to the `cronjob.yml` or `issue.yml` file

### `cronjob.yml`
> sync all issues to algolia at special time

```yml
name: "cronjob"

on:
  schedule:
    - cron: "0 23 * * *"

jobs:
  # test action works running from the schedule
  cronjob:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: ohmycheatsheet/actions-algolia@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        ALGOLIA_APPID: ${{ secrets.ALGOLIA_APPID }}
        ALGOLIA_APP_KEY: ${{ secrets.ALGOLIA_APP_KEY }}
```

### `issue.yml`
> events type listed [here](https://docs.github.com/en/developers/webhooks-and-events/events/issue-event-types)

- `event: issue` will sync current(created/edited/deleted) issue to algolia
- `event: label` will sync all issue and labels to algolia

```yml
name: "issue"
on:
  issues
  label

jobs:
  # test action works running from the issue created/deleted etc...
  event:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: ohmycheatsheet/actions-algolia@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        ALGOLIA_APPID: ${{ secrets.ALGOLIA_APPID }}
        ALGOLIA_APP_KEY: ${{ secrets.ALGOLIA_APP_KEY }}

```


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
