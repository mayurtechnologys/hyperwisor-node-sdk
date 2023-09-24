const axios = require('axios'); // For making HTTP requests
const { parse } = require('querystring');

class HyperwisorIOT {
    constructor() {
        this.initialized = false;
        this.apiKey = '';
    }

    /**
     * Initialize the HyperwisorIOT SDK with an API key.
     * @param {string} apiKey - The API key for accessing HyperwisorIOT.
     */
    init(apiKey) {
        this.apiKey = apiKey;
        this.initialized = true;
    }

    /**
     * Send data to HyperwisorIOT.
     * @param {string} data - The data to be sent to HyperwisorIOT.
     * @returns {Promise<string>} - A promise that resolves with the response data from the server.
     * @throws {Error} - Throws an error if the SDK is not initialized or if the request fails.
     */
    async sendData(data) {
        if (!this.initialized) {
            throw new Error('HyperwisorIOT not initialized. Call init() first.');
        }

        const url = `https://nikolaindustry.wixsite.com/hyperwisor/_functions/updstesensordata?apikey=${this.apiKey}`;
        
        try {
            const response = await axios.post(url, parse(data));
            return response.data;
        } catch (error) {
            throw new Error(`Failed to send data: ${error.message}`);
        }
    }

    /**
     * Get sensor data from HyperwisorIOT.
     * @returns {Promise<string>} - A promise that resolves with the sensor data from the server.
     * @throws {Error} - Throws an error if the SDK is not initialized or if the request fails.
     */
    async getSensordata() {
        if (!this.initialized) {
            throw new Error('HyperwisorIOT not initialized. Call init() first.');
        }

        const url = `https://nikolaindustry.wixsite.com/hyperwisor/_functions/readsensordata?apikey=${this.apiKey}`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get sensor data: ${error.message}`);
        }
    }

    /**
     * Update the schema in HyperwisorIOT.
     * @param {string} data - The data to be sent to update the schema.
     * @returns {Promise<string>} - A promise that resolves with the response data from the server.
     * @throws {Error} - Throws an error if the SDK is not initialized or if the request fails.
     */
    async updateSchema(data) {
        if (!this.initialized) {
            throw new Error('HyperwisorIOT not initialized. Call init() first.');
        }

        const url = `https://nikolaindustry.wixsite.com/hyperwisor/_functions/updateschema?apikey=${this.apiKey}`;

        try {
            const response = await axios.post(url, parse(data));
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update schema: ${error.message}`);
        }
    }

    /**
     * Get the schema from HyperwisorIOT.
     * @returns {Promise<string>} - A promise that resolves with the schema data from the server.
     * @throws {Error} - Throws an error if the SDK is not initialized or if the request fails.
     */
    async getSchema() {
        if (!this.initialized) {
            throw new Error('HyperwisorIOT not initialized. Call init() first.');
        }

        const url = `https://nikolaindustry.wixsite.com/hyperwisor/_functions/getschema?apikey=${this.apiKey}`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get schema: ${error.message}`);
        }
    }

    /**
     * Extract data from a JSON response.
     * @param {string} data - The JSON data to extract from.
     * @param {string} key - The key to extract from the JSON.
     * @returns {string} - The extracted value or '0' if not found.
     */
    extractor(data, key) {
        try {
            const json = JSON.parse(data);
            const value = json[key];
            return value === null ? '0' : value;
        } catch (error) {
            console.error(`Failed to extract data: ${error.message}`);
            return '0';
        }
    }
}

module.exports = HyperwisorIOT;
