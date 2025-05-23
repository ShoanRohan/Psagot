-- הוספת שדה רכזת לטבלת Courses
ALTER TABLE Courses
ADD CoordinatorId INT NULL,
    StatusId INT NULL; -- שדה סטטוס לקורסים

-- הוספת מפתח זר לרכזת
ALTER TABLE Courses
ADD CONSTRAINT FK_Courses_Coordinator FOREIGN KEY (CoordinatorId) REFERENCES Users(UserId);

-- יצירת טבלת סטטוסים לקורסים
CREATE TABLE StatusCourses (
    StatusCourseId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL
);

-- הוספת מפתח זר לסטטוס קורסים
ALTER TABLE Courses
ADD CONSTRAINT FK_Courses_Status FOREIGN KEY (StatusId) REFERENCES StatusCourses(StatusCourseId);

-- הוספת שדה סטטוס לטבלת Topics
ALTER TABLE Topics
ADD StatusId INT NULL;

-- יצירת טבלת סטטוסים לנושאים
CREATE TABLE StatusTopics (
    StatusTopicId INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL
);

-- הוספת מפתח זר לסטטוס נושאים
ALTER TABLE Topics
ADD CONSTRAINT FK_Topics_Status FOREIGN KEY (StatusId) REFERENCES StatusTopics(StatusTopicId);

-- הוספת שדות חדשים לטבלת Meetings
ALTER TABLE Meetings
ADD CourseId INT NULL,
    TopicId INT NULL,
    TeacherId INT NULL,
    MeetingDate DATE NOT NULL; -- תאריך הפגישה חייב להיות חובה

-- הוספת מפתחות זרים לטבלת Meetings
ALTER TABLE Meetings
ADD CONSTRAINT FK_Meetings_Course FOREIGN KEY (CourseId) REFERENCES Courses(CourseId),
    CONSTRAINT FK_Meetings_Topic FOREIGN KEY (TopicId) REFERENCES Topics(TopicId),
    CONSTRAINT FK_Meetings_Teacher FOREIGN KEY (TeacherId) REFERENCES Users(UserId);

