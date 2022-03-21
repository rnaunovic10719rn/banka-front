# Banka Frontend

## Prerequisites

- [Docker](https://www.docker.com/)

## Usage

Clone repository to your local environment and run the commands below.

### Via Docker (recommended)

```shell
cd banka-front
docker compose up --build
```

### NPM

```shell
cd banka-front
npm install
npm start # starts UI
npm run storybook # starts Storybook
```

Once the containers have been created and are up and running the apps can be accessed at:

- UI `localhost:3000`
- Storybook `localhost:6006`

## Technologies

- [Node 16](https://nodejs.org/en/)
- [React](https://nodejs.org/en/)
- [Storybook](https://storybook.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
