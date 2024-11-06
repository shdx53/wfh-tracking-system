USE wfh_tracking_system;

DROP TABLE IF EXISTS Arrangement;

CREATE TABLE Arrangement 
(
	Arrangement_ID int NOT NULL AUTO_INCREMENT,
	Staff_ID	int	NOT NULL,
	Request_Status enum('pending','approved','rejected','withdrawn') NOT NULL DEFAULT 'pending',
	Applied_Datetime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	Start_Date date NOT NULL,
	Is_Recurring tinyint(1) NOT NULL,
	Recurring_Interval enum('weekly','monthly') DEFAULT NULL,
	End_Date date DEFAULT NULL,
	Apply_Reason varchar(50) DEFAULT NULL,
	Update_Reason varchar(50) DEFAULT NULL,
	Shift_Type enum('AM','PM','Full Day') NOT NULL,
	CONSTRAINT Arrangement_pk PRIMARY KEY (Arrangement_ID),
	CONSTRAINT Arrangement_fk FOREIGN KEY (Staff_ID) REFERENCES Employee(Staff_ID)
);

# Staff Data
-- Department: Sales
-- --> Sales Director: Derek Tan (140001)
-- -- --> Sales Manager: Sophia Toh (140103)
-- -- -- --> Account Manager 1: Bui Nguyen (140893)
-- -- -- --> Account Manager 2: Dewi Putri (140895)

-- Department: Engineering
-- --> Engineering Director: Philip Lee (151408)
-- -- --> Senior Engineer: John Lim (150143)
-- -- --> Junior Engineer: Samsul Saifullah (151495)

-- Department: IT
-- --> IT Team: Manni Devi (210018)

# Types of WFH requests
-- Pending (future)
-- Approved (past and future)
-- Rejected (past and future)
-- Withdrawn (past and future)



# 1.1 - As a Staff, I want to view my schedule
## Contains pending and approved arrangements of Account Manager StaffID: 140893 (Bui Nguyen)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Shift_Type)
VALUES 
(140893, "pending", CURRENT_DATE + INTERVAL 2 DAY, 0, "Full Day"), # own future pending arrangement
(140893, "pending", CURRENT_DATE + INTERVAL 3 DAY, 0, "Full Day"), # own future pending arrangement
(140893, "approved", CURRENT_DATE - INTERVAL 5 DAY, 0, "AM"), # own historical approved arrangement
(140893, "approved", CURRENT_DATE + INTERVAL 5 DAY, 0, "PM"); # own future approved arrangement




# 2.1 - As a Staff, I want to view my team’s schedule
## Contains approved arrangements of ANOTHER Account Manager StaffID: 140895 (Dewi Putri)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Shift_Type)
VALUES 
(140895, "approved", CURRENT_DATE - INTERVAL 5 DAY, 0, "AM"), # team member's historical approved arrangement
(140895, "approved", CURRENT_DATE + INTERVAL 5 DAY, 0, "PM"); # team member's future approved arrangement




# 3.1 - As a Manager and Director, I want to view my team’s schedule
## Contains approved arrangements of TEAM MEMBERS OF and UNDER Sales Manager StaffID: 140103 (Sophia Toh)

# USE ARRANGEMENTS FROM 1.1 and 2.1 for Account Managers (Bui Nguyen, Dewi Putri)

# Fellow Sales Manager Jaclyn Lee approved arrangement
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Shift_Type)
VALUES
(140008, "approved", CURRENT_DATE - INTERVAL 5 DAY, 0, "AM"), # Sales Manager team member's historical approved arrangement
(140008, "approved", CURRENT_DATE + INTERVAL 5 DAY, 0, "PM"); # Sales Manager team member's future approved arrangement




# 4.1 - As HR/Senior Management, I want to view work schedules of departments/teams
## Contains approved arrangements of TEAM MEMBERS from SALES and ENGINEERING

# FOR SALES DEP, USE ARRANGEMENTS FROM 1.1 (Bui Nguyen)

# FOR ENGINEERING DEP, approved arrangements of Senior Engineer StaffID: 150143 (John Lim)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type)
VALUES
(150143, "approved", CURRENT_DATE - INTERVAL 5 DAY, 0, NULL, NULL, NULL, NULL, "AM"), # historical approved arrangement
(150143, "approved", CURRENT_DATE + INTERVAL 5 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 12 DAY, NULL, NULL, "PM"), # future recurring approved arrangement
(150143, "approved", CURRENT_DATE + INTERVAL 12 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 12 DAY, NULL, NULL, "PM"); # future recurring approved arrangement




# 5 - As a Staff, I want to apply for a WFH arrangement
# 5.3 - WFH Request with Overlapping Dates
## Contains an existing arrangement for Samsul Saifullah StaffID: 151495
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type)
VALUES
(151495, "pending", CURRENT_DATE + INTERVAL 5 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 12 DAY, NULL, NULL, "Full Day"), # future pending recurring arrangement
(151495, "pending", CURRENT_DATE + INTERVAL 12 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 12 DAY, NULL, NULL, "Full Day"); # future pending recurring arrangement




# 9.1 - View Pending WFH Requests for Team Members
## Contains pending requests of Senior Engineer: John Lim (150143), Junior Engineer: Samsul Saifullah (151495)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type)
VALUES
(150143, "pending", CURRENT_DATE + INTERVAL 2 DAY, 0, NULL, NULL, NULL, NULL, "Full Day"), # future pending arrangement
(151495, "pending", CURRENT_DATE + INTERVAL 2 DAY, 0, NULL, NULL, NULL, NULL, "AM"); # future pending arrangement




# 9.2 - View Approved, Rejected, and Withdrawn WFH Requests for Team Members
## Contains approved, rejected, withdrawn requests of Senior Engineer: John Lim (150143), Junior Engineer: Samsul Saifullah (151495)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Shift_Type)
VALUES
# John Lim (150143)
(150143, "approved", CURRENT_DATE - INTERVAL 3 DAY, 0, "Full Day"), # historical
(150143, "rejected", CURRENT_DATE - INTERVAL 4 DAY, 0, "Full Day"), # historical
(150143, "withdrawn", CURRENT_DATE - INTERVAL 6 DAY, 0, "Full Day"), # historical

# Samsul Saifullah (151495)
(151495, "approved", CURRENT_DATE + INTERVAL 3 DAY, 0, "AM"), # future
(151495, "rejected", CURRENT_DATE + INTERVAL 4 DAY, 0, "AM"), # future
(151495, "withdrawn", CURRENT_DATE + INTERVAL 6 DAY, 0, "AM"); # future




# 9.4 - View Requests Outside of Manager’s Department
## Contains Account Manager requests

# USE ARRANGEMENTS FROM 1.1




# 10.1 - View Application History as a Staff
## Contains requests of Junior Engineer: Samsul Saifullah (151495)

# USE ARRANGEMENTS FROM 9.2




# 10.2 - Filter by Start Date
## Contains requests of Junior Engineer: Samsul Saifullah (151495)

# USE ARRANGEMENTS FROM 9.2




# 11.1 - Approve Pending WFH Requests as Manager/Director
## Contains pending requests of Junior Engineer: Samsul Saifullah (151495)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Shift_Type)
VALUES
# Samsul Saifullah (151495)
(151495, "pending", CURRENT_DATE + INTERVAL 10 DAY, 0, "Full Day");




# 11.2 - Reject Pending WFH Requests as Manager/Director
## Contains pending requests of Junior Engineer: Samsul Saifullah (151495)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Shift_Type)
VALUES
# Samsul Saifullah (151495)
(151495, "pending", CURRENT_DATE + INTERVAL 11 DAY, 0, "Full Day");



-- IGNORE
-- # 11.3 - Edge Case - Approving a Request with Less than 24 Hours Before the WFH Day as Manager/Director
-- ## Contains pending request of Junior Engineer: Samsul Saifullah (151495) for CURRENT DATE (should not reflect in app)
-- INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Shift_Type)
-- VALUES
-- (151495, "pending", CURRENT_DATE, 0, "Full Day");



# 12.1 - Withdraw Entire Recurring WFH Arrangement of a Staff Member as Manager/Director
## Contains approved recurring request of Senior Engineer: John Lim (150143)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(150143, "approved", CURRENT_DATE + INTERVAL 4 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 11 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 1 SECOND), # future recurring approved arrangement
(150143, "approved", CURRENT_DATE + INTERVAL 11 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 11 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 1 SECOND); # future recurring approved arrangement



# 12.2 - Withdraw Specific Recurring WFH Arrangement of a Staff Member as Manager/Director
## Contains approved recurring request of Senior Engineer: John Lim (150143)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(150143, "approved", CURRENT_DATE + INTERVAL 3 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 10 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 2 SECOND), # future recurring approved arrangement
(150143, "approved", CURRENT_DATE + INTERVAL 10 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 10 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 2 SECOND); # future recurring approved arrangement




# 12.3 - Withdraw Ad-Hoc WFH Arrangement of a Staff Member as Manager/Director
## Contains approved ad-hoc request of Senior Engineer: John Lim (150143)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Shift_Type, Applied_Datetime)
VALUES
(150143, "approved", CURRENT_DATE + INTERVAL 6 DAY, 0, "AM", CURRENT_TIMESTAMP + INTERVAL 3 SECOND);




# 12.4 - Edge Case - Withdrawal Less Than 24 Hours Before WFH Day
## Contains approved request of Senior Engineer: John Lim (150143) for current date
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Shift_Type)
VALUES
(150143, "approved", CURRENT_DATE, 0, "Full Day");




# 13.1 - Staff Withdraw Own ENTIRE Approved Recurring WFH Arrangement
## Contains approved recurring request of IT Team: Manni Devi (210018)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(210018, "approved", CURRENT_DATE + INTERVAL 4 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 11 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 4 SECOND),
(210018, "approved", CURRENT_DATE + INTERVAL 11 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 11 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 4 SECOND);




# 13.2 - Staff Withdraw Own SPECIFIC Approved Recurring WFH Arrangement
## Contains approved recurring request of IT Team: Manni Devi (210018)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(210018, "approved", CURRENT_DATE + INTERVAL 5 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 12 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 5 SECOND),
(210018, "approved", CURRENT_DATE + INTERVAL 12 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 12 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 5 SECOND);




# 13.3 - Staff Withdraw an Approved Ad-Hoc WFH Arrangement
## Contains approved ad-hoc request of IT Team: Manni Devi (210018)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(210018, "approved", CURRENT_DATE + INTERVAL 3 DAY, 0, NULL, NULL, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 6 SECOND);




# 13.4 - Staff Withdraw an Approved WFH Arrangement Less Than 24 Hours Before WFH Day
## Contains approved ad-hoc request of IT Team: Manni Devi (210018) for the current date
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(210018, "approved", CURRENT_DATE, 0, NULL, NULL, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 7 SECOND);




# 14.1 - Staff Cancel Pending Ad-hoc WFH Request
## Contains pending ad-hoc request of IT Team: Manni Devi (210018)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(210018, "pending", CURRENT_DATE + INTERVAL 2 DAY, 0, NULL, NULL, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 8 SECOND);




# 14.2 - Staff Cancel Pending Recurring WFH Request
## Contains pending recurring request of IT Team: Manni Devi (210018)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(210018, "pending", CURRENT_DATE + INTERVAL 6 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 13 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 9 SECOND),
(210018, "pending", CURRENT_DATE + INTERVAL 13 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 13 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 9 SECOND);




# 14.3 - Staff Attempt to Cancel Approved WFH Request
## Contains approved ad-hoc request of IT Team: Manni Devi (210018)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(210018, "approved", CURRENT_DATE + INTERVAL 7 DAY, 0, NULL, NULL, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 10 SECOND);




# 14.4 - Staff View Details of Pending Ad-hoc WFH Request Before Canceling
## Contains pending ad-hoc request of IT Team: Manni Devi (210018)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(210018, "pending", CURRENT_DATE + INTERVAL 8 DAY, 0, NULL, NULL, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 11 SECOND);




# 14.5 - Staff View Details of Pending Recurring WFH Request Before Canceling
## Contains pending recurring request of IT Team: Manni Devi (210018)
INSERT INTO Arrangement (Staff_ID, Request_Status, Start_Date, Is_Recurring, Recurring_Interval, End_Date, Apply_Reason, Update_Reason, Shift_Type, Applied_Datetime)
VALUES
(210018, "pending", CURRENT_DATE + INTERVAL 9 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 16 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 12 SECOND),
(210018, "pending", CURRENT_DATE + INTERVAL 16 DAY, 1, "Weekly", CURRENT_DATE + INTERVAL 16 DAY, NULL, NULL, "Full Day", CURRENT_TIMESTAMP + INTERVAL 12 SECOND);