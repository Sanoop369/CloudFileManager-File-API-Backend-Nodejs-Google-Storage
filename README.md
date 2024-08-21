# CloudFileManager File API Backend

## Project Overview

This project is a Node.js backend application that manages file uploads and downloads using Google Cloud Storage. The application allows users to upload files, view, and delete them from a Google Cloud Storage bucket. The backend API is designed to handle these operations efficiently with robust error handling and user feedback.

### [Watch the Project Overview Video]
![Application Video](demo.mkv)

## How to Get the `key.json` File

To interact with Google Cloud Storage, you need to create a service account and obtain a `key.json` file. Follow these steps:

1. **Go to Google Cloud Console**: Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. **Open API & Services**: From the left-hand menu, go to **"API & Services"**.
3. **Navigate to Credentials**: Click on **"Credentials"**.
4. **Create Credentials**: Click the **"Create Credentials"** button and select **"Service Account"**.
5. **Provide Information**: Fill in the required information such as Service Account Name, Service Account ID, and Description.
6. **Grant Permissions**: Assign the necessary roles to the service account.
7. **Create and Download the Key**: After creating the service account, you will have the option to generate a key. Choose **"JSON"** format and download the file. Save this `key.json` file securely.

## How to Create a Bucket

To store your files in Google Cloud Storage, you need to create a bucket. Follow these steps:

1. **Go to Google Cloud Storage**: Navigate to the [Cloud Storage section](https://console.cloud.google.com/storage/browser) in Google Cloud Console.
2. **Create a Bucket**: Click on the **"Create Bucket"** button.
3. **Configure Bucket Settings**: Provide a unique name for your bucket and configure other settings as needed.
4. **Create the Bucket**: Complete the creation process.

**Note**: In your `index.js` file, ensure that you update the `bucketName` variable to match the name of the bucket you just created.
