// US12, 13 - approve, reject, withdraw arrangements - testing of manageArrangement function

import { manageArrangement } from '../app/actions/arrangements/requests/manage-arrangement';
import connection from '../app/lib/db';
import { sendNotification } from '../app/lib/notificationService';

jest.mock('../app/lib/db');
jest.mock('../app/lib/notificationService');

describe('manageArrangement', () => {
    let mockConnection;
    let mockGetConnection;

    beforeEach(() => {
        // Set up a mock connection before each test
        mockConnection = { // there are 2 mock functions set up for mockConnection
            query: jest.fn(),
            release: jest.fn(),
        };

        mockGetConnection = jest.fn().mockResolvedValue(mockConnection); // mockGetConnection is a mock function that resolves to mockConnection, simulates getConnection from manage-arrangement.js
        connection.mockResolvedValue({ getConnection: mockGetConnection });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should approve an arrangement successfully', async () => {
        const formData = {
            '144Action': 'Approve',
        };

        // First query for updating should look like
        mockConnection.query.mockResolvedValueOnce([]);

        // Second query for Start_Date should look like
        mockConnection.query.mockResolvedValueOnce([[{ Start_Date: '2024-10-10' }]]); // will run this in the manageArrangement logic
        /* troubleshooting notes: 
        - when test runs the function, console.log(startDate_query) returns { Start_date: '2024-10-10' }, 
        - but when function is run on test, console.log(startDate_query) returns [ { Start_Date: 2024-10-18T16:00:00.000Z } ]
        - so need to add additional bracket in the test to align so that the startDate_query can run properly through the manageArrangement logic 
        - console.log for the test will return the mockResolvedValueOnce values */

        // Third query for Staff_ID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Staff_ID: '123456' }]]);

        // Fourth query for Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }]]);

        const result_approve = await manageArrangement(formData);

        expect(sendNotification).toHaveBeenCalledTimes(1);
        expect(sendNotification).toHaveBeenCalledWith(
            'staff@example.com',
            'WFH Request approved',
            expect.stringContaining('Staff ID: 123456') && 
            expect.stringContaining('Start Date: 2024-10-10')
        );

        expect(result_approve).toEqual({ message: "Arrangement(s) updated successfully" });
    });

    it('should reject an arrangement with a reason', async () => {
        const formData = {
            '145Action': 'Reject',
            '145Reason': 'Shortage of manpower'
        };

        // First query for updating should look like
        mockConnection.query.mockResolvedValueOnce([]);

        // Second query for Start_Date should look like
        mockConnection.query.mockResolvedValueOnce([[{ Start_Date: '2024-10-10' }]]);

        // Third query for Staff_ID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Staff_ID: '123456' }]]);

        // Fourth query for Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }]]);

        const result_reject = await manageArrangement(formData);

        expect(sendNotification).toHaveBeenCalledTimes(1);
        expect(sendNotification).toHaveBeenCalledWith(
            'staff@example.com',
            'WFH Request rejected',
            expect.stringContaining('Staff ID: 123456') && 
            expect.stringContaining('Start Date: 2024-10-10') && 
            expect.stringContaining('Reason: Shortage of manpower')
        );

        expect(result_reject).toEqual({ message: "Arrangement(s) updated successfully" });

    });

    it('should approve and reject a recurring arrangement with a reason', async () => {
        const formData = {
            '144Action': 'Approve',
            '145Action': 'Reject',
            '145Reason': 'Shortage of manpower'
        };

        // First query for updating of first recurring arrangement should look like
        mockConnection.query.mockResolvedValueOnce([]);

        // Second query for Start_Date of first recurring arrangement should look like
        mockConnection.query.mockResolvedValueOnce([[{ Start_Date: '2024-10-10' }]]);

        // First query for updating of second recurring arrangement should look like
        mockConnection.query.mockResolvedValueOnce([]);

        // Second query for Start_Date of second recurring arrangement should look like
        mockConnection.query.mockResolvedValueOnce([[{ Start_Date: '2024-10-17' }]]);

        // Third query for Staff_ID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Staff_ID: '123456' }]]);

        // Fourth query for Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }]]);

        const result_approve_reject = await manageArrangement(formData);

        expect(sendNotification).toHaveBeenCalledTimes(1);
        expect(sendNotification).toHaveBeenCalledWith(
            'staff@example.com',
            'WFH Request outcome',
            expect.stringContaining('Staff ID: 123456') && 
            expect.stringContaining('Start Date: 2024-10-10') && 
            expect.stringContaining('Outcome: approved') && 
            expect.stringContaining('Start Date: 2024-10-17') && 
            expect.stringContaining('Outcome: rejected') && 
            expect.stringContaining('Reason: Shortage of manpower')
        );

        expect(result_approve_reject).toEqual({ message: "Arrangement(s) updated successfully" });

    });

    it('should withdraw a specific arrangement with a reason', async () => {
        const formData = {
            '145Action': 'Withdraw this specific arrangement only',
            '145Reason': 'Team building'
        };

        // First query for updating should look like
        mockConnection.query.mockResolvedValueOnce([]);

        // Second query for Start_Date should look like
        mockConnection.query.mockResolvedValueOnce([[{ Start_Date: '2024-10-10' }]]);

        // Third query for Staff_ID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Staff_ID: '123456' }]]);

        // Fourth query for Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }]]);

        const result_withdraw = await manageArrangement(formData);

        expect(sendNotification).toHaveBeenCalledTimes(1);
        expect(sendNotification).toHaveBeenCalledWith(
            'staff@example.com',
            'WFH Request withdrawn',
            expect.stringContaining('Staff ID: 123456') && 
            expect.stringContaining('Start Date: 2024-10-10') && 
            expect.stringContaining('Reason: Team building')
        );

        expect(result_withdraw).toEqual({ message: "Arrangement(s) updated successfully" });

    });

    it('should withdraw an entire arrangement with a reason', async () => {
        const formData = {
            '146Action': 'Withdraw entire arrangement',
            '146Reason': 'Office party'
        };

        // First query for applied datetime should look like
        mockConnection.query.mockResolvedValueOnce([[{ Applied_Datetime: '2024-09-10 11:00:00' }]]);

        // Second query for updating arrangement should look like
        mockConnection.query.mockResolvedValueOnce([]);
        
        // Third query for Staff_ID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Staff_ID: '123456' }]]);

        // Fourth query for Start_Date should look like
        mockConnection.query.mockResolvedValueOnce([[{ Start_Date: '2024-10-10' }, { Start_Date: '2024-10-17' }]]);

        // Fifth query for Staff_ID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Staff_ID: '123456' }]]);

        // Sixth query for Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }]]);

        const result_withdraw_entire = await manageArrangement(formData);

        expect(sendNotification).toHaveBeenCalledTimes(1);
        expect(sendNotification).toHaveBeenCalledWith(
            'staff@example.com',
            'WFH Request withdrawn',
            expect.stringContaining('Staff ID: 123456') && 
            expect.stringContaining('Start Dates: 2024-10-10, 2024-10-17') && 
            expect.stringContaining('Reason: Office party')
        );

        expect(result_withdraw_entire).toEqual({ message: "Arrangement(s) updated successfully" });

        
    });

    it('should handle the error', async () => {
        const formData = {
            '144Action': 'Approve',
        };

        mockConnection.query.mockRejectedValue(new Error('Database error'));

        const result_error = await manageArrangement(formData);

        expect(result_error).toEqual({ message: "Failed to update arrangement(s)" });
    });

    // it('should handle failure when releasing the connection', async () => {
    //     const formData = {
    //         '144Action': 'Approve',
    //     };

    //     // Simulate successful database operations
    //     mockConnection.query.mockResolvedValueOnce([]);
    //     mockConnection.query.mockResolvedValueOnce([[{ Start_Date: '2024-10-10' }]]);
    //     mockConnection.query.mockResolvedValueOnce([[{ Staff_ID: '123456' }]]);
    //     mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }]]);

    //     const result_error_2 = await manageArrangement(formData);

    //     expect(sendNotification).toHaveBeenCalledTimes(1);
    //     expect(sendNotification).toHaveBeenCalledWith(
    //         'staff@example.com',
    //         'WFH Request approved',
    //         expect.stringContaining('Staff ID: 123456') && 
    //         expect.stringContaining('Start Date: 2024-10-10')
    //     );

    //     // Simulate failure when releasing the connection
    //     mockConnection.release.mockRejectedValue(new Error('Failed to release connection'));

    //     let errorCaught = false;
    //     try {
    //         await manageArrangement(formData);
    //     } catch (error) {
    //         expect(error.message).toBe('Failed to release connection');
    //         errorCaught = true;
    //     }

    //     expect(errorCaught).toBe(true);

    //     expect(result_error_2).toEqual({ message: "Failed to update arrangement(s)" });
    
        
    
    //     // // Verify that the connection release attempt was made
    //     // expect(mockConnection.release).toHaveBeenCalled();
    // });
});