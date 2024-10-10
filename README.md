# Odin Project - Where's Wally (Frontend)

![Where's Wally App In Action](/github/app-in-action.png)

A Where's Wally app featuring 7 levels, image magnifying glass, level hints and a level-filterable leaderboard.

## Features

- Seven levels where you try to find Wally, Wenda, Wizard Whitebeard and Odlaw as fast as possible
- Zoomer (image magnifying glass) for spotting hidden characters more easily
- Hints for getting even more help finding the characters
- Global and level-specific leaderboard

## How To Play

- Go to the Levels tab and choose a level to open the large-size image with hidden characters
- Hover over the image to see the zoomed-in preview of the main image
- Click the image to see buttons with characters to find if you're not familiar with how the hidden characters look
- Once you've found a character, click the image and then click its button
- Already found characters will be marked on the main image with a green circle
- Continue until you've found all four characters to submit your record

### Tech Stack

#### Frontend

- TypeScript
- React (Vite)
- React Router
- styled-components
- date-fns

#### Backend

- Node.js (Express)
- MongoDB (Mongoose)
