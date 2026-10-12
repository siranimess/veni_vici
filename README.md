# Web Development Project 4 - Veni Vici

Submitted by: **Animesh Niraula**

This web app: **Veni Vici is a React discovery application that helps users explore Pokémon using PokéAPI. Users can discover random Pokémon, view their images, types, abilities, height, and weight, ban attributes they do not want to see in future discoveries, and browse their discovery history from the current session.**

Time spent: **6 hours** spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - [x] A Discover button creates a new API fetch request when clicked
  - [x] Each discovery displays the Pokémon's image, types, abilities, height, and weight
  - [x] The same attribute categories are displayed consistently across discoveries

- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - [x] A single current Pokémon is displayed in the main discovery section
  - [x] Displayed attributes match the displayed Pokémon image
  - [x] Each successful discovery displays at least one image

- [x] **API call response results should appear random to the user**
  - [x] Clicking Discover selects a random Pokémon from the selected collection
  - [x] The current Pokémon is excluded from the next discovery
  - [x] Recently viewed Pokémon are deprioritized to reduce frequent repeats

- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - [x] Types and abilities are clickable attributes
  - [x] Clicking an attribute immediately adds it to the ban list
  - [x] Clicking an attribute in the ban list immediately removes it

- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - [x] Pokémon with banned types are excluded from future discoveries
  - [x] Pokémon with banned abilities are excluded from future discoveries
  - [x] All types and abilities are checked before displaying a new Pokémon
  - [ ] The walkthrough recording shows that clicking a banned attribute immediately removes it from the ban list

## Optional Features

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
  - [x] Users can ban Pokémon types
  - [x] Users can ban Pokémon abilities
  - [x] Multiple bans can be active at the same time

- [x] Users can see a stored history of their previously displayed results from this session
  - [x] A dedicated section displays previously discovered Pokémon
  - [x] History entries include images, types, abilities, height, and weight
  - [x] Each successful discovery updates the history
  - [x] The current discovery is displayed separately from previous discoveries

## Additional Features

The following **additional** features are implemented:

- [x] A collection selector lets users choose the original 151, first 386, or first 1,010 Pokémon
- [x] Changing the collection updates the API request's limit query parameter
- [x] A Clear all bans button removes all active bans
- [x] A counter displays the total number of successful discoveries
- [x] A counter displays the number of active bans
- [x] Loading feedback appears while searching for a new Pokémon
- [x] Controls are disabled during loading to prevent conflicting actions
- [x] Error messages provide feedback when requests fail
- [x] A message appears when a search cannot find a matching Pokémon
- [x] Previously fetched Pokémon details are cached during the session
- [x] Images finish loading before a new discovery is displayed
- [x] The application has a responsive layout for desktop and mobile screens

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<div>
    <a href="https://www.loom.com/share/a2917084740a4e448cc8ff7a00d66477">
    </a>
    <a href="https://www.loom.com/share/a2917084740a4e448cc8ff7a00d66477">
      <img style="max-width:300px;" src="https://www.loom.com/v1/videos/a2917084740a4e448cc8ff7a00d66477/thumbnail.gif">
    </a>
  </div>

<!-- Replace YOUR_PROJECT_4_VIDEO_ID with your new Loom video ID. -->
<!-- Check the recording checkbox after your video demonstrates removing a ban. -->

## Notes

Connecting the React files correctly was a challenge while building this application. I initially placed the rendering code in App.jsx, even though main.jsx already handled rendering the app. The component name and export also had different spellings. The fix was to keep the rendering code in main.jsx and use a consistent component name beginning with an uppercase letter.

The ban list needed to check every type and ability before displaying a new Pokémon. Some Pokémon have more than one type, so checking only the first type would allow unwanted results to appear. The filtering function checks all the types and abilities and skips a Pokémon if any value matches the ban list.

The application also keeps the current discovery separate from previously viewed Pokémon. React state stores the current result, ban list, and history, while a cache stores previously fetched details. Waiting for the image to load before updating the result helps keep the displayed image and attributes together.

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
