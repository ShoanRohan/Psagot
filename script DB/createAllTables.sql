USE [psagot]
GO -- מחיקת טבלת UserType
DROP TABLE IF EXISTS UserType;

-- יצירת טבלת Days
CREATE TABLE Days (
    DayId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(10) NOT NULL,
    Descr NVARCHAR(10) NULL
);
-- יצירת טבלת Courses
CREATE TABLE Courses (
    CourseId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Year INT NOT NULL,
    Color NVARCHAR(20) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NULL,
    NumberOfMeetings INT NULL,
    NumberOfStudents INT NOT NULL,
    Notes NVARCHAR(MAX) NULL
);
-- יצירת טבלת DaysForCourse
CREATE TABLE DaysForCourse (
    DaysForCourseId INT IDENTITY PRIMARY KEY,
    DayId INT NOT NULL,
    CourseId INT NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    FOREIGN KEY (DayId) REFERENCES Days(DayId),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
);
-- יצירת טבלת UserTypes
CREATE TABLE UserTypes (
    UserTypeId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL
);
-- יצירת טבלת Users
CREATE TABLE Users (
    UserId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    Password NVARCHAR(100) NOT NULL,
    UserTypeId INT NOT NULL,
    IsActive BIT DEFAULT 1 NOT NULL,
    FOREIGN KEY (UserTypeId) REFERENCES UserTypes(UserTypeId)
);
-- יצירת טבלת Topics
CREATE TABLE Topics (
    TopicId INT IDENTITY PRIMARY KEY,
    CourseId INT NOT NULL,
    Name NVARCHAR(50) NOT NULL,
    TeacherId INT NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NULL,
    NumberOfMeetings INT NULL,
    Computers BIT DEFAULT 0 NOT NULL,
    Projector BIT DEFAULT 0 NOT NULL,
    Microphone BIT DEFAULT 0 NOT NULL,
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId),
    FOREIGN KEY (TeacherId) REFERENCES Users(UserId)
);
-- יצירת טבלת ScheduleForTopic
CREATE TABLE ScheduleForTopic (
    ScheduleForTopicId INT IDENTITY PRIMARY KEY,
    TopicId INT NOT NULL,
    DayId INT NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    FOREIGN KEY (TopicId) REFERENCES Topics(TopicId),
    FOREIGN KEY (DayId) REFERENCES Days(DayId)
);
-- יצירת טבלת Rooms
CREATE TABLE Rooms (
    RoomId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Projector BIT NOT NULL,
    Computers BIT NOT NULL,
    Speakers BIT NOT NULL,
    Capacity INT NOT NULL
);
-- יצירת טבלת Meetings
CREATE TABLE Meetings (
    MeetingId INT IDENTITY PRIMARY KEY,
    ScheduleForTopicId INT NULL,
    MeetingNumberForTopic INT NOT NULL,
    RoomId INT NOT NULL,
    IsValid BIT DEFAULT 1 NOT NULL,
    DayId INT NULL,
    StartTime TIME NULL,
    EndTime TIME NULL,
    IsPartOfSchedule BIT DEFAULT 0 NOT NULL,
    FOREIGN KEY (ScheduleForTopicId) REFERENCES ScheduleForTopic(ScheduleForTopicId),
    FOREIGN KEY (RoomId) REFERENCES Rooms(RoomId),
    FOREIGN KEY (DayId) REFERENCES Days(DayId)
);