# Cosmic File Launcher

Cosmic File Explorer is an interactive web application that simulates launching files into space. It combines file uploading functionality with NASA's image API to create an engaging, space-themed user experience.

![Webpage](https://github.com/ttuhina/cosmic-file-launcher/blob/main/screenshots/pic%20(2).png)

![Webpage](https://github.com/ttuhina/cosmic-file-launcher/blob/main/screenshots/pic%20(3).png)

## Features

- File upload with space launch simulation
- Integration with NASA's image API for celestial body information
- Animated countdown and takeoff sequence
- File management system with delete functionality
- Responsive and visually appealing user interface

## Installation

1. Clone the repository: `git clone https://github.com/ttuhina/cosmic-file-launcher.git`

`cd cosmic-file-launcher`

2. Install dependencies: `npm install`

## Running the Application

1. Start the server: `node server.js`

2. Open a web browser and navigate to `http://localhost:3000`

## How It Works

1. **File Upload**: Users can upload files through a form on the main page.

2. **Launch Simulation**: Upon upload, an animated countdown and takeoff sequence is displayed.

3. **Celestial Destination**: The application randomly assigns a celestial body as the file's destination.

4. **NASA API Integration**: Using the NASA Image and Video Library API, the app fetches and displays information about the assigned celestial body.

5. **File Management**: Uploaded files are listed with their "celestial destinations". Users can delete files from this list.

## Advanced Features

### File Upload

- Utilizes `multer` middleware for handling file uploads in Express.js.
- Files are stored in a designated `uploads/` directory on the server.

### Error Handling

- Space- themed Client-side error handling messages for failed uploads or API requests.
- Server-side error handling for file operations and API interactions.

### Third-Party API Integration

- Integrates with NASA's Image and Video Library API.
- Fetches relevant images and information about celestial bodies.

### Animated User Interface

- Implements CSS animations for the countdown and takeoff sequence.
- Provides a dynamic and engaging user experience.

## Technology stack

- Backend: Node.js, Express.js
- Frontend: HTML, CSS, JavaScript
- File Handling: Multer
- API Requests: Axios
