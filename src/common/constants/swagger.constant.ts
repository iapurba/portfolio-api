export const swaggerDocsConstants = {
  TITLE: 'Software Engineer Portfolio APIs',
  DESCRIPTION: `This app provides RESTFul APIs for software developer portfolio. 
    \nWhen submitting a POST/PUT call, kindly refer to the Example values. To know more about required fields please refer to the Schemas Below
    \n<b>*** Authorization required for POST/PUT/DELETE requests ***</b> To Authenticate follow the instructions below. 
    \n1. Submit a login request with valid credentials. 
    \n2. Copy the <i><b>access_token</b></i> from the response body. 
    \n3. Click <b>Authorize</b> option and paste the <i><b>access_token</b></i> value.`,

  AUTH: {
    SIGN_UP: {
      SUMMARY: 'Sign up User',
      DESC: 'Required valid payalod to register an user.',
    },
    LOGIN: {
      SUMMARY: 'Login User',
      DESC: 'Login Requires valid credentials',
    },
  },
  PROFILE: {
    GET: {
      SUMMARY: 'Get Profile',
      DESC: 'Required a valid profile ID to get the expected data.',
    },
    CREATE: {
      SUMMARY: 'Create Profile',
      DESC: 'Create a new profile. All required fields must be provided in the request body.',
    },
    UPDATE: {
      SUMMARY: 'Update Profile',
      DESC: 'Required a valid profile ID to update profile fields as needed',
    },
    DELETE: {
      SUMMARY: 'Delete Profile',
      DESC: 'Required a valid profile ID to to delete the profile.',
    },
  },
  RESUME: {
    GET: {
      SUMMARY: 'Get Resume',
      DESC: 'Required a valid profile ID to get the resume for the profile.',
    },
    CREATE: {
      SUMMARY: 'Create Resume',
      DESC: 'Create a new resume for an existing profile. All required fields must be provided in the request body.',
    },
    UPDATE: {
      SUMMARY: 'Update Resume',
      DESC: 'Required a valid profile ID and data to update the resume for the profile.',
    },
    DELETE: {
      SUMMARY: 'Delete Resume',
      DESC: 'Required a valid profile ID to delete the resume.',
    },
  },
  PROJECT: {
    GET: {
      SUMMARY: 'Get Project',
      DESC: 'Required a valid profile ID and Project ID to get a particular project for the profile.',
    },
    GET_ALL: {
      SUMMARY: 'Get All Projects',
      DESC: 'Required a valid profile ID to get all the projects for the for the profile.',
    },
    CREATE: {
      SUMMARY: 'Create Project',
      DESC: 'Required a valid profile ID to create one or multiple projects for a particular profile.',
    },
    UPDATE: {
      SUMMARY: 'Update Project',
      DESC: 'Required a valid profile ID and a project ID and data to update the project for the profile.',
    },
    DELETE: {
      SUMMARY: 'Delete Project',
      DESC: 'Required a valid profile ID and a project ID to delete the project.',
    },
  },
  CONTACT: {
    MESSAGE: {
      SUMMARY: 'Send Contact Message',
      DESC: 'Required a valid email, name, subject, messgage and a profileId (recipient)',
    },
  },
};
