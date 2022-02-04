# Yodlr

Yodlr lets users create shoutout cards for Twitters users.

## How it works
- **Step 1** - Find a Twitter user
- **Step 2** - Select card style
- **Step 3** - Edit colors
- **Step 4** - Download shoutout

## Screenshot
![yodlr](https://user-images.githubusercontent.com/79528133/152577897-e4473daf-373b-48ba-b7b4-7f762ff25c47.png)

## Packages

- [Next.js](https://nextjs.org/docs)
- [Tailwindcss](https://tailwindcss.com/docs)
- [Twitter-lite](https://github.com/draftbit/twitter-lite)

## Getting Started
#### Create environmental variables
Create `.env.local` file in the project root and add the following content in it

```
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_KEY_SECRET=
TWITTER_BEARER_TOKEN=
```

To get the Twitter keys, visit https://developer.twitter.com/en/portal/dashboard and create a standalone app. Fetch the consumer key, secret and bearer token and add it to the `.env.local` file.

#### Install dependencies

```bash
npm install
```

#### Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)

## Credits
- Thank you to [Dinesh](https://twitter.com/SDinesh91) for the [NextJS Twitter starter kit](https://github.com/Dineshs91/nextjs-twitter-starter) that this project was originally built on.
- Icons provided by [heroicons](https://heroicons.dev/).

