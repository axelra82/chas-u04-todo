/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
import axios from 'axios';

export default async (
	endpoint = null,
	data = {},
) => {

	// Init let vars
	let endpointLocation,
		response,
		endpointUrl;

	// Endpoint case switch
	switch (endpoint) {
		case 'configure':
			endpointLocation = 'Configure/Init.php';
			// Endpoint has unknown variables at this point
			// Use data object to build endpoint during configure
			endpointUrl = `http://${data.host}:${data.port}/backend/API/Endpoint/${endpointLocation}`
			break;

		case 'read':
			endpointLocation = 'Read.php';
			break;

		case 'create':
			endpointLocation = 'Create.php';
			break;

		case 'update':
			endpointLocation = 'Update.php';
			break;

		case 'delete':
			endpointLocation = 'Delete.php';
			break;

		case 'signup':
			data.case = endpoint;
			endpointLocation = 'User/index.php';
			break;

		case 'login':
			data.case = endpoint;
			endpointLocation = 'User/index.php';
			break;
	}

	// Configured endpoint URL
	if (endpoint !== 'configure') {
		const getConfigured = await axios('/configured.json');
		const configureData = getConfigured.data;
		const { host, port } = configureData;
		endpointUrl = `http://${host}:${port}/backend/API/Endpoint/${endpointLocation}`
	}

	try {

		// Set up API request
		const options = {
			url: endpointUrl,
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json; charset=UTF-8',
			},
			data: data
		}

		// Await api response from request
		const request = await axios(options);
		// Success object
		request.data.data = JSON.parse(request.data.data);
		response = request.data

	} catch (error) {

		// Error object
		response = {
			success: false,
			message: `in call: ${error}`
		}
	}

	// Return response object
	return response;
}