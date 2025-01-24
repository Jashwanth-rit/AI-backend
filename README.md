
# Medicare Project

The **Medicare Project** is a healthcare services platform designed to connect people with essential services like ambulances, healthcare providers, fire extinguishers, police services, and more. The project includes both a **backend** and **frontend**, with a clean and responsive user interface and reliable server-side handling.

## Features

- **Ambulance Services**: Provides a list of nearby ambulances with availability status and contact details.
- **Healthcare Takers**: Displays a list of healthcare professionals along with their specialties, phone numbers, and availability.
- **Fire Extinguishers**: Shows the location, capacity, maintenance, and expiry date of fire extinguishers.
- **Police Services**: Lists available police officers with contact information and jurisdiction details.
- **Interactive Call and Email Options**: Ability to directly call or send an email to the respective service providers.

## Backend

The backend of this project is built with **Node.js** and **MongoDB** using **Express** for API handling. The backend manages data related to ambulances, healthcare providers, fire extinguishers, and police services, and serves it to the frontend. You can explore the backend repository [here](https://github.com/Jashwanth-rit/medicare-backend).

## Frontend

The frontend is developed using **Angular**, which consumes the backend API to display the data dynamically. The frontend provides a user-friendly interface to interact with the available services. You can explore the frontend repository [here](https://github.com/Jashwanth-rit/medicare-frontend).

## Technologies Used

- **Frontend**: Angular, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js, MongoDB
- **API**: RESTful API
- **Hosting**: Can be deployed on any cloud platform (Heroku, AWS, etc.)

## Installation Instructions

### Backend Setup

1. Clone the backend repository:
   ```bash
   git clone https://github.com/Jashwanth-rit/medicare-backend.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd medicare-backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the backend server:
   ```bash
   npm start
   ```

5. The server will be running at `http://localhost:3000`.

### Frontend Setup

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/Jashwanth-rit/medicare-frontend.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd medicare-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the frontend development server:
   ```bash
   ng serve
   ```

5. The application will be running at `http://localhost:4200`.

## Usage

Once both the backend and frontend are running:

- The frontend interface allows users to interact with the available services, check availability, and contact service providers directly.
- Users can search for ambulances, healthcare professionals, fire extinguishers, and police services in their vicinity.
- Call or email service providers directly from the UI.

## Contributing

If you want to contribute to this project, feel free to fork the repositories, make your changes, and submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License.
