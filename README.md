Paste this into **`README.md`**. Fill in your actual hours and recording tool, then add `walkthrough.gif` beside the README. Check the recording checkbox after your GIF demonstrates removing a ban.

```markdown
# Web Development Project 4 - Veni Vici

Submitted by: **Animesh Niraula**

This web app: **allows users to discover random Pokémon using PokéAPI. Each discovery displays an image, types, abilities, height, and weight. Users can ban types and abilities to personalize future discoveries and view previously discovered Pokémon in their session history.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - Clicking Discover makes an API fetch request.
  - Each Pokémon consistently displays types, abilities, height, weight, and an image.

- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - One current discovery is displayed in the main discovery card.
  - The displayed attributes and image come from the same Pokémon response.
  - Each successful discovery displays an image.
  - Earlier discoveries appear separately in the history section.

- [x] **API call response results should appear random to the user**
  - Candidates are shuffled to generate random discoveries.
  - The current Pokémon is excluded from the next discovery.
  - Recently discovered Pokémon are deprioritized to reduce frequent repeats.

- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - Pokémon types and abilities are clickable.
  - Clicking an attribute adds it to the visible ban list.
  - Clicking an entry in the ban list immediately removes it.

- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Future discoveries skip Pokémon with any banned type or ability.
  - Previously displayed discoveries remain in the session history.
  - Restrictive bans may produce a message asking the user to remove a ban, expand the collection, or try again.
  - [ ] _To ensure an accurate grade, the recording must show that clicking an attribute in the ban list immediately removes it from the list of banned attributes._

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list.
  - Users can ban both types and abilities.

- [x] Users can see a stored history of their previously displayed results from this session.
  - A dedicated history section displays previous Pokémon images and attributes.
  - Each successful discovery updates the history.
  - History resets when the page is refreshed.

The following **additional** features are implemented:

- [x] A collection selector lets users explore the original 151, first 386, or first 1,010 Pokémon.
- [x] A Clear all bans button removes every active ban.
- [x] Loading feedback appears while the app searches for a discovery.
- [x] Error messages explain failed requests and unsuccessful searches.
- [x] Previously fetched Pokémon details are cached in memory.
- [x] Images are loaded before a new discovery is displayed.
- [x] Responsive styling supports desktop and mobile screens.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src="./walkthrough.gif" title="Video Walkthrough" width="800" alt="Video Walkthrough" />

GIF created with **[Enter the recording tool you used]**.

## Notes

Connecting the React files correctly was a challenge. The app needed a single createRoot call in main.jsx, and the component name and export needed to match and begin with an uppercase letter.

Another challenge was checking the ban list before displaying a discovery. A Pokémon can have multiple types and abilities, so the app checks all of them and skips the result if any match a banned value. The app also waits for the image to load before updating the current discovery.

## License

    Copyright 2026 Animesh Niraula

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
```
