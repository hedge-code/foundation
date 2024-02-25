# Contributing

## Before getting started

### Thank you for considering contributing to our project

First of all, we want to extend our heartfelt thanks to all members of the community who have contributed their time, expertise, and support to this project. Whether you've reported a bug, suggested a feature, or submitted code, your contributions have made a significant impact, and we are truly grateful for your efforts.

If you need to talk about the project, you have any questions, ideas, or concerns, don't hesitate to reach out to us. We're here to support you and ensure that your contributions are acknowledged and appreciated.

## How to contribute

### Introduce into dev environment

The repository uses monorepo, so all commands can be executed from root of the project.

First make a new fork of the project.

Then do a `git clone` of the fork:

```bash
git clone https://github.com/<fork_path>.git
```

The project uses pnpm workspaces and you need to execute following command in the root of the repository.

```bash
pnpm i
```

To see your changes in live, it is best to use a storybook stories, because there are some issues with the live preview in the documentation page.

```bash
pnpm storybook
```

In the packages directory you have catalogs ends with `foundation` keyword. There is a core of the packages. For example `react-foundation`

If you have working storybook, then you can see all changes done in packages at storybook pages.

### Docs improvements

If you wish to improve our documentation without changes in the packages, then you need to execute following command:

```bash
pnpm dev
```

The local documentation will be available at [http://localhost:3001/](http://localhost:3001/)

Unfortunately, due to the error described in issues, to see component changes, you have to rebuild the packages each time with following command:

```bash
pnpm build
```

If you need further guidance, you can find our team on the following:

* [our discord](https://discord.gg/A57b4Rycbt)
* [email](contact.hedgecode@gmail.com)

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Getting started

For further guidance about getting started, please refer to the related links:

* [Pull Request](PULL_REQUEST_TEMPLATE.md)
* [Issues Guidelines](ISSUE_TEMPLATE.md)

## Coding conventions

In order to sanitize coding standards, please follow our eslint recommendations.
