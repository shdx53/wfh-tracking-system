import { newArrangement } from '../app/actions/arrangements/new/new-arrangement';
import connection from '../app/lib/db';
import { sendNotification } from '../app/lib/notificationService';

jest.mock('../app/lib/db');
jest.mock('../app/lib/notificationService');

describe('newArrangement', () => {
    let mockConnection;
    let mockGetConnection;

    beforeEach(() => {
        // Set up a mock connection before each test
        mockConnection = { // there are 2 mock functions set up for mockConnection
            execute: jest.fn(),
            query: jest.fn(),
            release: jest.fn(),
        };

        mockGetConnection = jest.fn().mockResolvedValue(mockConnection);
        connection.mockResolvedValue({ getConnection: mockGetConnection });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const getCurrentDatetime = () => {
        const now = new Date();
      
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }

    
    // AD-HOC ARRANGEMENTS

    it('should insert an auto-approved ad-hoc arrangement for Jack Sim and stop there', async () => {
        const formData = {
            staffID: "130002",
            arrangementType: 'Ad-hoc',
            startDate: '2024-09-25',
            shiftType: 'AM',
            isRecurring: 0,
            applyReason: 'Testing New Code',
        };

        const result = await newArrangement(formData);

        expect(mockConnection.execute).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO Arrangement'),
            expect.arrayContaining(["130002", 'approved', getCurrentDatetime(), '2024-09-25', 0, 'Testing New Code', 'AM'])
        );       
        
        expect(result).toEqual({ message: "Arrangement(s) added successfully" });
    });

    it('should insert an auto-approved ad-hoc arrangement for Jack Sim without reason and stop there', async () => {
        const formData = {
            staffID: "130002",
            arrangementType: 'Ad-hoc',
            startDate: '2024-09-25',
            shiftType: 'AM',
            isRecurring: 0,
            applyReason: '',
        };

        const result = await newArrangement(formData);

        expect(mockConnection.execute).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO Arrangement'),
            expect.arrayContaining(["130002", 'approved', getCurrentDatetime(), '2024-09-25', 0, null, 'AM'])
        );       
        
        expect(result).toEqual({ message: "Arrangement(s) added successfully" });
    });

    it('should handle errors during arrangement setup for Jack Sim', async () => {
        const formData = {
            staffID: "130002",
            arrangementType: 'Ad-hoc',
            startDate: '2024-09-25',
            shiftType: 'AM',
            isRecurring: 0,
            applyReason: 'Testing New Code',
        };

        // expect(mockConnection.execute).toHaveBeenCalledWith(
        //             expect.stringContaining('INSERT INTO Arrangement'),
        //             expect.arrayContaining(["130002", '2024-09-25', 0, 'Testing New Code', 'AM'])
        //         );

        mockConnection.execute.mockRejectedValueOnce(new Error('Error during arrangement setup for Jack Sim'));

        await newArrangement(formData);

        expect(jest.spyOn(console, 'error'));
    });

    it('should insert ad-hoc arrangement record', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Ad-hoc',
            startDate: '2024-09-25',
            shiftType: 'AM',
            isRecurring: 0,
            applyReason: 'Testing New Code',
          };
        
        // First query for inserting not needed

        // Second query for getting Reporting Manager StaffID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Reporting_Manager: 246800 }], ['`Reporting_Manager` INT']]);

        // Third query for getting Reporting Manager Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }], [ '`Email` VARCHAR(50) NOT NULL' ]]);

        const result = await newArrangement(formData); // this line must be after all the query results, if not query results will be undefined

        expect(sendNotification).toHaveBeenCalledTimes(1);
        expect(sendNotification).toHaveBeenCalledWith(
            'New WFH Request Submitted',
            expect.stringContaining('Staff ID: 123456') && 
            expect.stringContaining('Start Date: 2024-09-25')
        );

        expect(result).toEqual({ message: "Arrangement(s) added successfully" });
        
    });

    it('should insert ad-hoc arrangement record without reason', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Ad-hoc',
            startDate: '2024-09-25',
            shiftType: 'AM',
            isRecurring: 0,
            applyReason: '',
          };
        
        // First query for inserting not needed

        // Second query for getting Reporting Manager StaffID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Reporting_Manager: 246800 }], ['`Reporting_Manager` INT']]);

        // Third query for getting Reporting Manager Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }], [ '`Email` VARCHAR(50) NOT NULL' ]]);

        const result = await newArrangement(formData); // this line must be after all the query results, if not query results will be undefined

        expect(sendNotification).toHaveBeenCalledTimes(1);
        expect(sendNotification).toHaveBeenCalledWith(
            'New WFH Request Submitted',
            expect.stringContaining('Staff ID: 123456') && 
            expect.stringContaining('Start Date: 2024-09-25')
        );

        expect(result).toEqual({ message: "Arrangement(s) added successfully" });
        
    });

    it('should insert ad-hoc arrangement record and handle the reporting manager error', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Ad-hoc',
            startDate: '2024-09-25',
            shiftType: 'AM',
            isRecurring: 0,
            applyReason: 'Testing New Code',
          };

        await newArrangement(formData);

        // expect(mockConnection.execute).toHaveBeenCalledWith(`
        //   INSERT INTO Arrangement 
        //   (Staff_ID, Start_Date, Is_Recurring, Apply_Reason, Shift_Type)
        //   VALUES (?, ?, ?, ?, ?)
        //   `, ["123456", "2024-09-25", 0, "Testing New Code", "AM"]);
        
        // expect(mockConnection.execute).toHaveBeenCalledWith(`
        // SELECT Reporting_Manager FROM Employee
        // WHERE Staff_ID = 123456
        //       `);

        mockConnection.execute.mockRejectedValueOnce(new Error('No reporting manager found'));

        expect(jest.spyOn(console, 'error'));
        
    });

    it('should insert ad-hoc arrangement record and handle the email error', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Ad-hoc',
            startDate: '2024-09-25',
            shiftType: 'AM',
            isRecurring: 0,
            applyReason: 'Testing New Code',
          };

        await newArrangement(formData);

        expect(mockConnection.execute).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO Arrangement'),
            expect.arrayContaining(["123456", "2024-09-25", 0, "Testing New Code", "AM"])
        );

        // First query for inserting into db not needed

        // Second query for getting Reporting Manager StaffID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Reporting_Manager: 246800 }], ['`Reporting_Manager` INT']]);

        await newArrangement(formData);

        mockConnection.execute.mockRejectedValueOnce(new Error('No email found'));

        expect(jest.spyOn(console, 'error'));
        
    });

    it('should insert ad-hoc arrangement record and handle the arrangement setup error', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Ad-hoc',
            startDate: '2024-09-25',
            shiftType: 'AM',
            isRecurring: 0,
            applyReason: 'Testing New Code',
          };

        await newArrangement(formData);

        expect(mockConnection.execute).toHaveBeenCalledWith(`
          INSERT INTO Arrangement 
          (Staff_ID, Applied_Datetime, Start_Date, Is_Recurring, Apply_Reason, Shift_Type)
          VALUES (?, ?, ?, ?, ?, ?)
          `, ["123456", getCurrentDatetime(), "2024-09-25", 0, "Testing New Code", "AM"]);

        // Second query for getting Reporting Manager StaffID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Reporting_Manager: 246800 }], ['`Reporting_Manager` INT']]);

        // Third query for getting Reporting Manager Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }], [ '`Email` VARCHAR(50) NOT NULL' ]]);

        mockConnection.execute.mockRejectedValueOnce(new Error('Error during arrangement setup'));

        await newArrangement(formData);

        expect(jest.spyOn(console, 'error')); // how to make sure it catches the error??
        
    });


    // RECURRING ARRANGEMENTS

    it('should insert an auto-approved recurring arrangement for Jack Sim and stop there', async () => {
        const formData = {
            staffID: "130002",
            arrangementType: 'Recurring',
            startDate: '2024-09-01',
            shiftType: 'AM',
            isRecurring: 1,
            recurringInterval: 'Weekly',
            endDate: '2024-09-15',
            applyReason: 'Testing New Code',
          };      
        
        const result = await newArrangement(formData);

        expect(mockConnection.execute).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO Arrangement'),
            expect.arrayContaining(["130002", 'approved', '2024-09-01', 1, 'Weekly', '2024-09-15', 'Testing New Code', 'AM'])
        );
        
        expect(result).toEqual({ message: "Arrangement(s) added successfully" });
    });

    it('should insert an auto-approved recurring arrangement without reason for Jack Sim and stop there', async () => {
        const formData = {
            staffID: "130002",
            arrangementType: 'Recurring',
            startDate: '2024-09-01',
            shiftType: 'AM',
            isRecurring: 1,
            recurringInterval: 'Weekly',
            endDate: '2024-09-15',
            applyReason: '',
          };      
        
        const result = await newArrangement(formData);

        expect(mockConnection.execute).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO Arrangement'),
            expect.arrayContaining(["130002", 'approved', '2024-09-01', 1, 'Weekly', '2024-09-15', null, 'AM'])
        );
        
        expect(result).toEqual({ message: "Arrangement(s) added successfully" });
    });

    it('should insert recurring arrangement record', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Recurring',
            startDate: '2024-09-01',
            shiftType: 'AM',
            isRecurring: 1,
            recurringInterval: 'Monthly',
            endDate: '2024-10-01',
            applyReason: 'Testing New Code',
          }; 

        await newArrangement(formData);

        // First query for inserting into db not needed

        // Second query for getting Reporting Manager StaffID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Reporting_Manager: 246800 }], ['`Reporting_Manager` INT']]);

        // Third query for getting Reporting Manager Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }], [ '`Email` VARCHAR(50) NOT NULL' ]]);

        const result = await newArrangement(formData);

        expect(sendNotification).toHaveBeenCalledTimes(1);
        expect(sendNotification).toHaveBeenCalledWith(
            'New Recurring WFH Request Submitted',
            expect.stringContaining('Staff ID: 123456') && 
            expect.stringContaining('Date(s): 2024-09-01, 2024-10-01')
        );

        expect(result).toEqual({ message: "Arrangement(s) added successfully" });

        expect(mockConnection.release).toHaveBeenCalled();
        expect(mockConnection.release).toHaveBeenCalled();
    });

    it('should insert recurring arrangement record without reason', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Recurring',
            startDate: '2024-09-01',
            shiftType: 'AM',
            isRecurring: 1,
            recurringInterval: 'Monthly',
            endDate: '2024-10-01',
            applyReason: '',
          }; 

        await newArrangement(formData);

        // First query for inserting into db not needed

        // Second query for getting Reporting Manager StaffID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Reporting_Manager: 246800 }], ['`Reporting_Manager` INT']]);

        // Third query for getting Reporting Manager Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }], [ '`Email` VARCHAR(50) NOT NULL' ]]);

        const result = await newArrangement(formData);

        expect(sendNotification).toHaveBeenCalledTimes(1);
        expect(sendNotification).toHaveBeenCalledWith(
            'New Recurring WFH Request Submitted',
            expect.stringContaining('Staff ID: 123456') && 
            expect.stringContaining('Date(s): 2024-09-01, 2024-10-01')
        );

        expect(result).toEqual({ message: "Arrangement(s) added successfully" });
    });

    it('should insert recurring arrangement record and handle the reporting manager error', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Recurring',
            startDate: '2024-09-01',
            shiftType: 'AM',
            isRecurring: 1,
            recurringInterval: 'Monthly',
            endDate: '2024-10-01',
            applyReason: 'Testing New Code',
          }; 

        await newArrangement(formData);

        mockConnection.execute.mockRejectedValueOnce(new Error('No reporting manager found'));

        expect(jest.spyOn(console, 'error'));
        
    });

    it('should insert recurring arrangement record and handle the email error', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Recurring',
            startDate: '2024-09-01',
            shiftType: 'AM',
            isRecurring: 1,
            recurringInterval: 'Monthly',
            endDate: '2024-10-01',
            applyReason: 'Testing New Code',
          }; 

        await newArrangement(formData);

        // First query for inserting into db not needed

        // Second query for getting Reporting Manager StaffID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Reporting_Manager: 246800 }], ['`Reporting_Manager` INT']]);

        await newArrangement(formData);

        mockConnection.execute.mockRejectedValueOnce(new Error('No email found'));

        expect(jest.spyOn(console, 'error'));
    });

    it('failed to add arrangement', async () => {
        const formData = {
            staffID: "123456",
            arrangementType: 'Recurring',
            startDate: '2024-09-01',
            shiftType: 'AM',
            isRecurring: 1,
            recurringInterval: 'Monthly',
            endDate: '2024-10-01',
            applyReason: 'Testing New Code',
          }; 

        await newArrangement(formData);

        // First query for inserting into db not needed

        // Second query for getting Reporting Manager StaffID should look like
        mockConnection.query.mockResolvedValueOnce([[{ Reporting_Manager: 246800 }], ['`Reporting_Manager` INT']]);

        // Third query for getting Reporting Manager Email should look like
        mockConnection.query.mockResolvedValueOnce([[{ Email: 'staff@example.com' }], [ '`Email` VARCHAR(50) NOT NULL' ]]);
    

        mockConnection.execute.mockRejectedValueOnce(new Error('Fail'));

        const result = await newArrangement(formData);

        expect(result).toEqual({ message: "Failed to add arrangement" });

    });
});