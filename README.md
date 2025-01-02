# Drinks Count Tracker

This is a simple React application that fetches and displays drink counts from an API. Each item is represented as a card with an image, name, and count that updates dynamically.

## Features
- Displays cards with images and counts.
- Dynamically fetches data from an API.
- Automatically updates data every 70 seconds.

## Requirements
- Node.js (v14 or above)
- npm or yarn

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Ahtashamkhanniazi/Drinks_count_tracker
   ```

2. Navigate to the project directory:
   ```bash
   cd Drinks_count_tracker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Environment Setup
1. Create a `.env` file in the root of the project.
2. Add the following environment variable:
   ```plaintext
   REACT_APP_API_URL=<your_api_url>
   ```
   Replace `<your_api_url>` with the actual API endpoint. For example:
   ```plaintext
   REACT_APP_API_URL=https://914ade287b6d.ngrok.app/latest-entry
   ```

## Running the Application
1. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Notes
- Ensure that the API URL in the `.env` file is accessible.
- The environment variables are loaded when the server starts. Restart the server if you make changes to the `.env` file.

