# README: mc-web

## Quickstart Guide

First, install npm packages:

```other
npm install
```

Next, run the dev server:

```other
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Contribution Guidelines

If you would like to contribute to the project by adding new features, fixing bugs, adding documentation, or cleaning up code, please use the following guidelines:

1. Branch off of the `develop` branch by creating a feature branch where you can make your changes. Make sure to prefix your branch name with `feature/` like so `feature/cool-new-feature`.
2. Make any changes you want on your feature branch and commit your code. A feature branch can have any number of commits.
3. Once your feature branch is complete and ready for review, push your feature branch up to the BitBucket repo.
4. Next, open a pull request on BitBucket from your feature branch to the `develop` branch. When creating your pull request, make sure to describe your changes and what is included in your feature branch.
5. In our monthly frontend/backend development meeting, we will review any proposed pull requests.
6. Accepted pull requests will be merged into the `develop` branch and rejected pull requests will be sent back to the pull request owner with feedback.

## Helpful VS Code Extensions

- Better Comments
- ESLint
- GitLens
- Prettier
- Github Copilot (optional, but super fun)

## Config

### Environment Variables

### Plop Templates

## Typescript

## Pages

## API

### Moreland API Standard

#### Filter Opperands

- begins
- between
- contains
- ends
- equals
- greater
- greater_or_equal
- in
- less
- less_or_equal
- notbegins
- notcontains
- notequals
- notin

## Providers

### SessionProvider

## React Hooks

### useRequest

### useRevalidateCache

### useAuthorization

## Components

### Forms

### Lists

## Styling

## Constants & Enums

## Utils

## Deployment

### Azure

To deploy a Next.js application on Azure:

1. In Azure, create a Web App
   1. Select Linux for Operating System
   2. Select your required Node LTS or the latest Node LTS for Runtime Stack
   3. Configure your Web App
      1. In Deployment Slots, create additional slots for dev, staging, and master (master will be used to swap into production)
      2. In General Settings for each slot, set the Startup Command as: `pm2 --no-daemon start /home/site/wwwroot/ecosystem.config.js`
      3. In Application Settings, add the required environment variables for each deployment slot
      4. In Deployment Center, select a source repository and branch to deploy your code from. For a production deployment slot, it is not recommended to setup CI/CD. Instead, use the Swap action in the deployment slots menu to perform a deployment, typically from the master slot to the production slot.
2. Confirm your Next.js solution has an `ecosystem.config.js` file with the following:

```other
module.exports = {
  apps: [
    {
      name: "application-name",
      script: "./node_modules/next/dist/bin/next",
      args: "start -p " + (process.env.PORT || 3000),
      watch: false,
      autorestart: true,
    },
  ],
};
```

3. Confirm your `package.json` scripts contain the following commands:

```other
"build": "next build"
"start": "next start"
```

1. For the deployment slot you wish to deploy to, push your code to the branch you set up in the Deployment Center.
2. Your code will be deployed shortly! 😎 (Usually takes 3-15min)

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
