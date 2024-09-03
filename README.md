# Weather Dashboard Application

## Overview

This project is an Angular-based Weather Dashboard that allows users to search for weather information by city and view the current weather conditions along with a 6-day forecast. The application also supports automatic geolocation to fetch weather data based on the user's location.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Angular Features](#angular-features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)

## Features

- Search weather information by city
- Display current weather conditions (temperature, humidity, wind speed, etc.)
- Display a 6-day weather forecast
- Auto-fetch weather data based on user's geolocation
- Responsive design with Bootstrap and Angular Material
- Dynamic background images based on weather conditions

## Architecture

The application follows a modular structure typical of Angular projects, ensuring scalability and maintainability. The main components are:

- **HomeComponent**: The main component responsible for displaying the weather data.And handles API calls to the OpenWeatherMap API to fetch weather and forecast data.
- **Environment Configurations**: Different environment configurations for development and production are managed via Angular's environment files.

## Angular Features

- **Component-Based Architecture**: The project is organized using Angular components, promoting modularity and reusability.

- **Reactive Forms**: Implemented for managing the city search functionality.
- **HTTPClient**: Used for making API requests to the OpenWeatherMap API.
- **Environment Files**: Used to manage configuration settings for different environments (development and production).

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/chinm333/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Ensure that the `src/environment.ts` file contains your API key and other necessary configurations.

   ```typescript
   export const environment = {
     WEATHER_API_KEY: "your own api key",
     WEATHER_API_URL: "https://api.openweathermap.org/data/2.5/weather",
     FORECAST_API_URL: "https://api.openweathermap.org/data/2.5/forecast",
     CITY_LAT_LNG: "https://api.openweathermap.org/geo/1.0/direct",
   };
   ```

### Runing the application

```bash
npm start
```

### Building the Application

```bash
ng build
```
### Link of the live Application
https://weather-app-anglr.netlify.app
