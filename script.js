const courseTitleInput = document.getElementById('course-input');
const courseUnitsInput = document.getElementById('course-units-input');
const scoreInput = document.getElementById('score-input');
const addBtn = document.getElementById('add-button');
const submitBtn = document.getElementById('submit-button');
let infoArray = [];

addBtn.addEventListener('click', addCourseInfo)
submitBtn.addEventListener('click', submitCourses);

function addCourseInfo() {
    let courseTitle = courseTitleInput.value;
    let courseUnits = Number(courseUnitsInput.value);
    let score = Number(scoreInput.value);

    const titleColumn = document.querySelector('.input_course');
    const unitsColumn = document.querySelector('.input_course-units');
    const scoreColumn = document.querySelector('.input_score');

    if (courseTitle == "" || courseUnits == 0 || courseUnits > 5 || isNaN(score) == true || score > 100) {
        alert("Invalid value(s). Course cannot be blank, score must be a number betwen 0-100 and credit units cannot be less than 1 or geater than 5.")
    }
    else {
        //create object from input values
        let courseInfo = { Course: courseTitle, Units: courseUnits, Score: score };
        infoArray.push(courseInfo);

        //display new input values under input field by creating new elements.
        let newCourse = document.createElement('p');
        newCourse.classList.add('new-course');
        let newCourseContent = document.createTextNode(courseTitle);
        newCourse.appendChild(newCourseContent);
        titleColumn.appendChild(newCourse);

        let newUnits = document.createElement('p');
        newUnits.classList.add('new-units');
        let newUnitsContent = document.createTextNode(courseUnits);
        newUnits.appendChild(newUnitsContent);
        unitsColumn.appendChild(newUnits);

        let newScore = document.createElement('p');
        newScore.classList.add('new-score');
        let newScoreContent = document.createTextNode(score);
        newScore.appendChild(newScoreContent);
        scoreColumn.appendChild(newScore);

        //reset input values
        courseTitleInput.value = "";
        courseUnitsInput.value = "";
        scoreInput.value = "";
    }
}

function submitCourses() {
    calculateGradePoints(infoArray);
    calculateGPA(infoArray);
    displayResults();
}

function calculateGradePoints(arr) {
    for (i = 0; i < arr.length; i++) {
        function assignGrades() {
            //evaluate each score
            let val = arr[i].Score;
            let grade = "";
            switch (true) {
                case (val >= 70):
                    grade = "A";
                    break;
                case (val >= 60 && val < 70):
                    grade = "B";
                    break;
                case (val >= 50 && val < 60):
                    grade = "C";
                    break;
                case (val >= 40 && val < 50):
                    grade = "D";
                    break;
                case (val >= 35 && val < 40):
                    grade = "E";
                    break;
                default:
                    grade = "F";
            }
            //push value of grade to object
            arr[i].grade = grade;
            //create grade elements and append to output_grades
            const gradeColumn = document.querySelector('.output_grade');
            let newGrade = document.createElement('p');
            let newGradeContent = document.createTextNode(grade);
            newGrade.classList.add('new-grade');
            newGrade.appendChild(newGradeContent);
            gradeColumn.appendChild(newGrade);
        }
        assignGrades();

        let gradeValue;
        switch (arr[i].grade) {
            case "A":
                gradeValue = 5;
                break;
            case "B":
                gradeValue = 4;
                break;
            case "C":
                gradeValue = 3;
                break;
            case "D":
                gradeValue = 2;
                break;
            case "E":
                gradeValue = 1;
                break;
            default:
                gradeValue = 0;
        }

        let gradePoints = arr[i].Units * gradeValue;
        arr[i].gradePoint = gradePoints;

        //output course title
        const courseColumn = document.querySelector('.output_course');
        let theCourse = document.createElement('p');
        theCourse.classList.add('course-output');
        let theCourseContent = document.createTextNode(arr[i].Course);
        theCourse.appendChild(theCourseContent);
        courseColumn.appendChild(theCourse);

        //output grade points
        const gpColumn = document.querySelector('.output_gradepoints');
        let newGradePoint = document.createElement('p');
        let newGradePointContent = document.createTextNode(arr[i].gradePoint);
        newGradePoint.classList.add('new-grade-point');
        newGradePoint.appendChild(newGradePointContent);
        gpColumn.appendChild(newGradePoint);
    }
}

function calculateGPA(arr) {
    //get sum of grade points, sum of course units
    var GPsum = 0;
    var unitsSum = 0;
    for (let i = 0; i < arr.length; i++) {
        GPsum += arr[i].gradePoint;
        unitsSum += arr[i].Units;
    }
    //divide total GPs by total units
    var GPA = (GPsum / unitsSum).toFixed(2);
    //output result
    let showGPA = document.querySelector('.gpa');
    let showGPAcontent = document.createTextNode(GPA + "/" + "5.00");
    showGPA.appendChild(showGPAcontent);
}

function displayResults() {
    //show output container
    let outputContainer = document.querySelector('.output-container');
    outputContainer.classList.remove('hide');
}

//should be able to reset input: result disappears, created elements deleted
//should be able to delete added course info.
