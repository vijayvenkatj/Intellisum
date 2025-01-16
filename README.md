
# Next.js Gmail API Application

This is a Next.js application that integrates with the Gmail API, allowing users to manage their emails effectively. The app is currently in the testing phase, and your participation is crucial for improving the application.

## Features

- **Authenticate with Gmail**: Users can log in using their Google account to access their Gmail data.
- **View Emails**: Fetch and display emails from the user's inbox.
- **User-friendly Interface**: Designed for ease of use and navigation.

## Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Google Cloud Platform account with the Gmail API enabled.

## Setup Instructions

### Step 1: Clone the Repository

Open your terminal and run the following command to clone this repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### Step 3: Configure Gmail API

1. **Create a Google Cloud Project**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Enable the Gmail API for your project.

2. **Create OAuth 2.0 Credentials**:
   - Navigate to "APIs & Services" > "Credentials".
   - Click "Create Credentials" and select "OAuth client ID".
   - Configure the consent screen and create an OAuth 2.0 Client ID.
   - Set the redirect URI (e.g., `http://localhost:3000/api/auth/callback`).

3. **Add Credentials to .env.local**:
   Create a `.env.local` file in the root directory of your project and add your Gmail API credentials:

   ```plaintext
   GMAIL_CLIENT_ID=your-client-id
   GMAIL_CLIENT_SECRET=your-client-secret
   GMAIL_REDIRECT_URI=http://localhost:3000/api/auth/callback
   NODE_ENV = "development"
   NEXT_APP_API_URL = "http://localhost:3000"
   GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/callback/google"
   GEMINI_APIKEY=yourkey
   MONGODB_URI = yourmongourl
   AUTH_SECRET = ursecret
   ```

### Step 4: Start the Application

Run the following command to start the development server:

```bash
npm run dev
```

Now, open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## User Consent

This application requires user consent to access Gmail data. Upon launching the app, users will be prompted to log in and authorize the application to access their Gmail account.

## Testing Phase

This application is currently in the testing phase. To help us improve the app, please email me at [contact.vijayvenkatj@gmail.com](mailto:contact.vijayvenkatj@gmail.com) to have your email address added to the testing list. Your feedback is invaluable!

## Usage

1. Visit [http://localhost:3000](http://localhost:3000) in your web browser.
2. Log in with your Google account when prompted.
3. Use the application to view and manage your emails.

## Contributing

Contributions are welcome! If you have suggestions, feature requests, or find bugs, please create an issue or submit a pull request. 

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.


## Contact

For questions, feedback, or to report issues, please reach out via email: [contact.vijayvenkatj@gmail.com](mailto:contact.vijayvenkatj@gmail.com).

Thank you for your interest in the Next.js Gmail API Application!
