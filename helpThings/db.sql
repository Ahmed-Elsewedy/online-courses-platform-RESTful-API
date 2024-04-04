-- CREATE TABLE onlinecourse_course (
--   id INT PRIMARY KEY,
--   noc_name VARCHAR(255) NOT NULL,
--   noc_description TEXT,
--   pub_date DATE,
--   image VARCHAR(255)
-- );
-- 
-- CREATE TABLE onlinecourse_enrollment (
--   id INT PRIMARY KEY,
--   course_id INT NOT NULL,
--   user_id INT NOT NULL,
--   date_enrolled DATE,
--   moc_mode VARCHAR(255),
--   total_enrollment INT,
--   rating INT,
--   FOREIGN KEY (course_id) REFERENCES onlinecourse_course(id),
--   FOREIGN KEY (user_id) REFERENCES auth_user(id)
-- );
-- 
-- CREATE TABLE onlinecourse_instructor (
--   id INT PRIMARY KEY,
--   user_id INT NOT NULL,
--   is_superuser BOOLEAN,
--   full_time BOOLEAN,
--   total_learners INT,
--   FOREIGN KEY (user_id) REFERENCES auth_user(id)
-- );
-- 
-- CREATE TABLE onlinecourse_submission (
--   id INT PRIMARY KEY,
--   course_id INT NOT NULL,
--   submission_text TEXT,
--   no_title BOOLEAN,
--   order_id INT,
--   FOREIGN KEY (course_id) REFERENCES onlinecourse_course(id)
-- );
-- 
-- CREATE TABLE onlinecourse_submission_choices (
--   id INT PRIMARY KEY,
--   question_id INT NOT NULL,
--   submission_id INT NOT NULL,
--   choice_id INT,
--   FOREIGN KEY (question_id) REFERENCES onlinecourse_question(id),
--   FOREIGN KEY (submission_id) REFERENCES onlinecourse_submission(id),
--   FOREIGN KEY (choice_id) REFERENCES onlinecourse_choice(id)
-- );
-- 
-- CREATE TABLE onlinecourse_choice (
--   id INT PRIMARY KEY,
--   lesson_id INT NOT NULL,
--   is_correct BOOLEAN,
--   choice_text TEXT,
--   FOREIGN KEY (lesson_id) REFERENCES onlinecourse_lesson(id)
-- );
-- 
-- CREATE TABLE onlinecourse_question (
--   id INT PRIMARY KEY,
--   question_text TEXT NOT NULL
-- );
-- 
-- CREATE TABLE onlinecourse_lesson (
--   id INT PRIMARY KEY,
--   course_id INT NOT NULL,
--   HC_content TEXT,
--   FOREIGN KEY (course_id) REFERENCES onlinecourse_course(id)
-- );
-- 
-- CREATE TABLE auth_user (
--   id INT PRIMARY KEY,
--   username VARCHAR(255) NOT NULL,
--   last_name VARCHAR(255),
--   email VARCHAR(255) NOT NULL,
--   is_staff BOOLEAN,
--   is_active BOOLEAN,
--   password VARCHAR(255) NOT NULL
-- );
-- 
-- CREATE TABLE Learner (
--   user_id INT PRIMARY KEY,
--   occupation VARCHAR(255),
--   noc_social_link VARCHAR(255),
--   FOREIGN KEY (user_id) REFERENCES auth_user(id)
-- );
-- 

CREATE TABLE onlinecourse_course (
  id INT PRIMARY KEY,
  noc_name VARCHAR(255) NOT NULL,
  noc_description TEXT,
  pub_date DATE,
  image VARCHAR(255)
);

CREATE TABLE onlinecourse_enrollment (
  id INT PRIMARY KEY,
  course_id INT NOT NULL,
  user_id INT NOT NULL,
  date_enrolled DATE,
  moc_mode VARCHAR(255),
  total_enrollment INT,
  rating INT,
  FOREIGN KEY (course_id) REFERENCES onlinecourse_course(id),
  FOREIGN KEY (user_id) REFERENCES auth_user(id)
);

CREATE TABLE onlinecourse_instructor (
  id INT PRIMARY KEY,
  user_id INT NOT NULL,
  is_superuser BOOLEAN,
  full_time BOOLEAN,
  total_learners INT,
  FOREIGN KEY (user_id) REFERENCES auth_user(id)
);

CREATE TABLE onlinecourse_submission (
  id INT PRIMARY KEY,
  course_id INT NOT NULL,
  submission_text TEXT,
  no_title BOOLEAN,
  order_id INT,
  FOREIGN KEY (course_id) REFERENCES onlinecourse_course(id)
);

CREATE TABLE onlinecourse_submission_choices (
  id INT PRIMARY KEY,
  question_id INT NOT NULL,
  submission_id INT NOT NULL,
  choice_id INT,
  FOREIGN KEY (question_id) REFERENCES onlinecourse_question(id),
  FOREIGN KEY (submission_id) REFERENCES onlinecourse_submission(id),
  FOREIGN KEY (choice_id) REFERENCES onlinecourse_choice(id)
);

CREATE TABLE onlinecourse_choice (
  id INT PRIMARY KEY,
  lesson_id INT NOT NULL,
  is_correct BOOLEAN,
  choice_text TEXT,
  FOREIGN KEY (lesson_id) REFERENCES onlinecourse_lesson(id)
);

CREATE TABLE onlinecourse_question (
  id INT PRIMARY KEY,
  question_text TEXT NOT NULL
);

CREATE TABLE onlinecourse_lesson (
  id INT PRIMARY KEY,
  course_id INT NOT NULL,
  HC_content TEXT,
  FOREIGN KEY (course_id) REFERENCES onlinecourse_course(id)
);

CREATE TABLE auth_user (
  id INT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  is_staff BOOLEAN,
  is_active BOOLEAN,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE Learner (
  user_id INT PRIMARY KEY,
  occupation VARCHAR(255),
  noc_social_link VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES auth_user(id)
);
