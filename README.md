# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org) <-- NOT BEING USED
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com) <-- NOT BEING USED
- [tRPC](https://trpc.io)

### Customizations

Some packages in the standard t3 stack have been replaced for this project, and some additional packages included. Also some tools configured for easy deployment with show up in platform configuration and aren't really in the code/this repo, but can serve as a fast road to deployment, so mentioned here for reference.

- [Chakra UI](https://chakra-ui.com/)

A UI component library with a great react component feel. Simple and extensible. Probably less configurable than tailwind, but can get to decent looking styles fast with little to no css

- [Husky](https://typicode.github.io/husky/#/)

Git hooks for automating certain actions. Currently set to automatically lint git staged files before a git commit is executed, ensuring cross team code conformity. Can be used to ensure automated tests are run and passing before committing too.

- [Zod](https://zod.dev)

Typed object validation. Used particularly on input data from forms, or data retrieved from the database. The combination of this and tRPC allows for consistently typed data across all stages of the application, traversing backend and frontend interactions.

- [SWR](https://swr.vercel.app)

With SWR, components will get a stream of data updates constantly and automatically. And the UI will be always fast and reactive. The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by HTTP RFC 5861(opens in a new tab). SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

- [Vercel](https://vercel.com)

Serverless hosting and CI/CD. Provides integrations to many of the other 3rd party serverless hosted solutions mentioned below.

- [Clerk](https://clerk.dev)

A 3rd party authentication provider, enabling multiple authentication methods. From socials (twitter, github, facebook), to email, to metamask. Currently configured use a wide array of socials and metamask, but no email or sign up based authentication (wan't to avoid ever storing passwords if at all possible).

- [PlanetScale](https://planetscale.com/)

3rd party hosted serverless database. Integrates nicely with prisma and vercel. Treats it pretty much as MySql, but technically slightly different under the hood? Apparently shouldn't need to worry about that?

- [Axiom](https://axiom.co/)

3rd party hosted serverless logging. Better searchability and other features than the standard logging provided by Vercel.

- [Upstash](https://upstash.com/)

Serverless solution for Redis and Kafka. Add if required.

Also configured to use Prettier along with ESLint for linting. Makefile not yet working, but will be set up to provide convenience alternatives to package.json scripts which are abstracted away from the specific tool invocations.

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

# Author Awesome App

Author Awesome App is a web application designed to connect authors, curators, and readers in a decentralized environment. The platform aims to enable users to create, share, and collect books while leveraging Web3 technology for authentication and verifiable authorship.

## History and Function

The project started as a clone of the Chirp repository, but with substantial modifications to fit the unique requirements of the Author Awesome App. The application serves as a scaffold for another project, focusing on achieving specific functionality to provide a solid foundation for future development.

## Features

Author Awesome App provides a variety of features to facilitate interaction and engagement among authors, curators, and readers:

#### Profile:

The application uses a dual-layer authentication system that maps a Web3 address to OAuth profiles generated by Clerk. This provides a secure and decentralized way of managing user identities.

#### Shelf:

Shelves represent a user's book collection, including books they've authored, curated, or added to their personal library.

#### Feed:

The feed displays posts, newly added books, and recently collected books, keeping users updated on the latest activities within the community.

## Post Book Form

The Post Book Form allows users to submit their works. To claim authorship, users need to sign a transaction mapping their wallet address to their user ID.

## My Profile Edit Form

Users can edit their profiles with the following information:
Web2 info: Email, first & last name, city, bio, and link.
Web3 info: Wallet address, ENS name, OpenSea profile, and created NFT contract addresses.

## Additional Functionality

Follow other users to stay updated on their activities
Comment on posts to engage in discussions
Post books to share with the community
Claim authorship through on-chain transactions

## Verifiable Authorship

To ensure the authenticity of authorship claims, the application requires users to sign a transaction on-chain. This transaction certifies their authorship, and the signature is stored in their user profile with a reference to the on-chain transaction. This process helps maintain the integrity of the platform while giving authors rightful recognition for their work.

## Getting Started

To set up the Author Awesome App locally, follow these steps:
Clone the repository to your local machine.
Install dependencies using npm install or yarn.
Configure environment variables as required.
Run the development server using npm run dev or yarn dev.
Open your browser and navigate to http://localhost:3000.

## Contributing

We welcome contributions to the Author Awesome App project. To contribute, please:
Fork the repository.
Create a new branch for your feature or bugfix.
Commit your changes and push to your forked repository.
Open a pull request for review and merging.

## License

Author Awesome App is released under the MIT License.

## Acknowledgements

This project is based on the Chirp repository and has been modified to fit the unique requirements of the Author Awesome App.
Thank you to Chirp: https://github.com/t3dotgg/chirp/tree/main
And to Lord-Luvat: https://github.com/Lord-Luvat/t3-serverless-template
