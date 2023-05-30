function save() {
  var id = document.getElementById('inputTaskId').value;
  var taskname = document.getElementById('inputTaskName').value;
  var taskdesc = document.getElementById('inputTaskDescription').value;
  var taskdiff = document.getElementById('inputTaskDifficulty').value;
  var expenses = document.getElementById('inputExpenses').value;
  var location = document.getElementById('inputLocation').value;
  var date = document.getElementById('inputDate').value;
  var deadline = document.getElementById('inputDeadline').value;

  var tasklist = JSON.parse(localStorage.getItem('tasklist')) || [];
 
  if (id) {
    // Update existing staff
    tasklist.forEach((task) => {
      if (task.id == id) {
        task.taskname = taskname;
        task.taskdesc = taskdesc;
        task.taskdiff = taskdiff;
        task.expenses = expenses;
        task.location = location;
        task.date = date;
        task.deadline = deadline;
      }
    });
    document.getElementById('inputTaskId').value = '';
  } else {
    // Add new task
    var task = {
      id: tasklist.length > 0 ? tasklist[tasklist.length - 1].id + 1 : 1,
      taskname: taskname,
      taskdesc: taskdesc,
      taskdiff: taskdiff,
      expenses: expenses,
      location: location,
      date: date,
      deadline: deadline,
    };
    tasklist.push(task);
  }

  localStorage.setItem('tasklist', JSON.stringify(tasklist));
  allData();
  clearData();
}

function allData() {
  var table = document.getElementById('table');
  table.innerHTML = '';

  var tasklist = JSON.parse(localStorage.getItem('tasklist')) || [];

  tasklist.forEach(function (task, index) {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${task.taskname}</td>
        <td>${task.taskdesc}</td>
        <td>${task.taskdiff}</td>
        <td>${task.expenses}</td>
        <td>${task.location}</td>
        <td>${task.date}</td>
        <td>${task.deadline}</td>
        <td>
          <button class="btn btn-sm btn-success" onclick="find(${task.id})">
            <i class="fa fa-edit"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeData(${task.id})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });
}

function removeData(id) {
  var tasklist = JSON.parse(localStorage.getItem('tasklist')) || [];
  tasklist = tasklist.filter(function (task) {
    return task.id != id;
  });
  localStorage.setItem('tasklist', JSON.stringify(tasklist));
  allData();
}

function find(id) {
  var tasklist = JSON.parse(localStorage.getItem('tasklist')) || [];
  tasklist.forEach(function (task) {
    if (task.id == id) {
      document.getElementById('inputTaskId').value = task.id;
      document.getElementById('inputTaskName').value = task.taskname;
      document.getElementById('inputTaskDescription').value = task.taskdesc;
      document.getElementById('inputTaskDifficulty').value = task.taskdiff;
      document.getElementById('inputExpenses').value = task.expenses;
      document.getElementById('inputLocation').value = task.location;
      document.getElementById('inputDate').value = task.date;
      document.getElementById('inputDeadline').value = task.deadline;
    }
  });
}

allData();
