# Weather Wonder Frontend (React, MUI)

This React application serves as the frontend interface for accessing the Weather Backend Service. It offers functionalities like fetching weather details, maintaining a history of weather searches, deleting weather records and user management features such as login, registration, and logout.

<a href="https://youtu.be/df1Wx9Bwt10"><img src="https://github.com/Vasanth-Korada/weather-app-frontend/assets/50695446/25452a4a-bd0f-461b-9563-8725e99ab7cd" width="50%"></a>

## Features

- **User Management**: Provides registration, login, and logout capabilities.

- **Weather Search**: Allows users to search for weather details based on city names.
- **Weather History**: Users can view and manage their past weather search records.
- **Update Weather**: Users can update either temperature, latitude or longitude with ease in the Weather Search History Data Table.
- **Delete Weather**: Users can delete a particular weather record in the weather search history table.
- **Protect Routes**: Added route protection to the Weather Search Route. Users cannot access important routes without authentication.
- **Open Weather Map API**: Utilized OpenWeather API to fetch current weather with user-entered city name
- **CRUD Operations**: Enables creating, reading, updating, and deleting weather records via the backend API.

## Prerequisites

- Node.js 
- npm or yarn
- Weather Wonder Backend (GoLang, Postgres) (Make sure it's up and running)

## Setup & Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Vasanth-Korada/weather-app-frontend.git
    cd weather-app-frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the Application**:
    ```bash
    npm start
    # or
    yarn start
    ```

The application will start and by default run on `http://localhost:3000/`.

## Application Structure

- **API Calls**: All the backend service calls are structured and managed in the `services/AuthService.js` and `services/WeatherService.js` file.
- **Constants**: Variables like API base URL, API keys, and other constant data are managed in the `/src/utils`.
- (Mention any other significant directories or files if required)


# Screenshots

<img width="1470" alt="login" src="https://github.com/Vasanth-Korada/weather-app-frontend/assets/50695446/2952367f-4b9c-476e-8d21-30fcb8c6021c">
<img width="1470" alt="weather_search" src="https://github.com/Vasanth-Korada/weather-app-frontend/assets/50695446/4b0fc2cb-f8b5-4a92-8cb5-60bf12cd8745">
<img width="1470" alt="search_history" src="https://github.com/Vasanth-Korada/weather-app-frontend/assets/50695446/3fa166dd-16af-4fca-a220-fb06a002549a">

