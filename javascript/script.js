$(document).ready(function () {
  var num_correct = 0, num_wrong=0, clicked_opt=0;
  for (var i = 0; i < questions.length; i++) {
    var temp = `<div class="question" id="question_${i + 1}">
                  <p>${questions[i].numb}. ${questions[i].question}</p>
                  <div class="option_div">
                    <label for="option1_${i + 1}" class="container">
                      ${questions[i].options[0]}
                      <input type="radio" class="opt" value="${
                        questions[i].options[0]
                      }" name="question${i + 1}" id="option1_${i + 1}" />
                      <span class="checkmark"></span>
                    </label>
                    <label for="option2_${i + 1}" class="container">
                      ${questions[i].options[1]}
                      <input type="radio" class="opt" value="${
                        questions[i].options[1]
                      }" name="question${i + 1}" id="option2_${i + 1}" />
                      <span class="checkmark"></span>
                    </label>
                    <label for="option3_${i + 1}" class="container">
                      ${questions[i].options[2]}
                      <input type="radio" class="opt" value="${
                        questions[i].options[2]
                      }" name="question${i + 1}" id="option3_${i + 1}" />
                      <span class="checkmark"></span>
                    </label>
                    <label for="option4_${i + 1}" class="container">
                      ${questions[i].options[3]}
                      <input type="radio" class="opt" value="${
                        questions[i].options[3]
                      }" name="question${i + 1}" id="option4_${i + 1}" />
                      <span class="checkmark"></span>
                    </label>
                    <!-- this is the answer -->
                    <input type="hidden" id="answer" value="${
                      questions[i].ans
                    }" />
                    </div>
                  </div>`;
    $(".total_question").append(temp);

    var temp_2 = `<a href="#" data-id="question_${i + 1}" class="page-link">${
      i + 1
    }</a>`;
    $(".num_tabs").append(temp_2);
    $(".page-link").first().addClass("select");

    var temp_3 = `<div>
                    ${questions[i].numb}. ${questions[i].question}
                    <span class="question_${
                      i + 1
                    }"> Answers selected: </span>
                    <span>Answer: ${questions[i].ans}</span>
                  </div>`;
    $(".result_div").append(temp_3);
  }
  // for loops ends here
  // to add class to correct and wrong answer
  $(".opt").on("click", function () {
    var ans_chosen = "";
    if ($(this).is(":checked")) {
      ans_chosen = $(this).val(); // this stores the answer chosen
      clicked_opt += 1;
      if (clicked_opt == 3) {
        // let result_2 = `<h3>You Scored ${num_correct} out of ${
        //   questions.length
        // } questions</h3>`;
        // $(".text").append(result_2);
        $(".submit").show();
      }
    }
  // this stores the correct answer, the input type hidden we have created
   var correct_ans = $(this).parent("label").siblings("#answer").val();
    
    var q = $(this).parent("label").parent(".option_div").parent(".question");
    q = q.attr("id");
    q = "." + q;
    $(q).text($(q).text() + ans_chosen); // its class becomes that of the class under temp_3

    // comparing the correct_and the chosen_ans
    if (ans_chosen == correct_ans) {
      $(this).siblings(".checkmark").removeClass("wrong");
      $(this).siblings(".checkmark").addClass("correct");
      num_correct += 1;
      swal("Correct!", `You got ${num_correct} answer correct`, "success");
    }
    if (ans_chosen != correct_ans) {
      $(this).siblings(".checkmark").removeClass("correct");
      $(this).siblings(".checkmark").addClass("wrong");
      num_wrong += 1;
      swal(
        "Wrong!",
        `The correct answer is ${correct_ans} </br> You got ${num_wrong} answer wrong`,
        "error"
      );
    }
    // to choose one option only in a question
    $(this)
      .parent("label")
      .parent(".option_div")
      .find(".opt")
      .attr("disabled", true);
  });
  // option_click function ends here
  $(".question").hide(); // hide all the questions with this class
  $("#question_1").show(); // show only question1
  $(".submit").hide();
  $(".result_div").hide();
  $(".reload").hide();

  $(".submit").click(function () {
    $("#loading_container").css("display", "flex");
    $("#content").css("display", "none");
    $("body").css("background-color", "initial");
    setTimeout(show_content, 1000);
    $(".submit").attr("disabed", true);
    $(".submit").hide();
    // if (clicked_opt != questions.length) {
      let result_2 = `<h3>You Scored ${num_correct} out of ${questions.length} questions</h3>`;
      $(".text").append(result_2);
    // }
    // sessionStorage.updated_time = 1;
  });
  function show_content() {
    $("#loading_container").css("display", "none");
    $("#content").css("display", "block");
    $("body").css("background-color", "#f3d4d4");
    $(".pop_up").addClass("open_popup");
  }

  $(".answers").click(function () {
    $("#loading_container").css("display", "flex");
    $("#content").css("display", "none");
    $("body").css("background-color", "initial");
    setTimeout(show_answers, 1000);
    $(".total_question").hide();
    $(".pagination").hide();
    $(".pop_up").hide();
    $(".reload").show();
    $("#timer").hide();
  });
  function show_answers() {
    $("#loading_container").css("display", "none");
    $("#content").css("display", "block");
    $("body").css("background-color", "#f3d4d4");
    $(".pop_up").addClass("open_popup");
    $(".result_div").show();
  }
  $(".page-link").click(function (e) {
    e.preventDefault();
    $(this).siblings(".page-link").removeClass("select"); //remove the class "select" from others
    $(this).addClass("select"); // add class "select" to this one clicked
    var que = $(this).data("id");
    var que_id = `#${que}`; // same as var que_id = "#" + que;
    $(".question").hide();
    $(que_id).show();
  });
  // quiz_time();
});

$(".next").click(function () {
  var active_tab = $(".page-link.select");
  var next_tab = active_tab.next();
  //use of next() function here
  next_tab.siblings(".page-link").removeClass("select");
  next_tab.addClass("select");
  var active_num = $(".page-link.select").data("id");
  active_id = "#" + active_num;
  $(".question").hide();
  $(active_id).show();
});

$(".previous").click(function () {
  var active_tab = $(".page-link.select");
  prev_tab = active_tab.prev(); // use of prev() function  here
  prev_tab.siblings(".page-link").removeClass("select");
  prev_tab.addClass("select");
  var active_num = $(".page-link.select").data("id");
  active_id = "#" + active_num;
  $(".question").hide();
  $(active_id).show();
});



function hideLoader() {
  $("#loading_container").css("display", "none");
  $("#content").css("display", "block");
  $("body").css("background-color", "#f3d4d4");
}
// this is added to delay the execusion of the function
setTimeout(hideLoader, 1000);

// this should remove the previous time if the user finises on time
$(".reload").click(function () {
  // sessionStorage.removeItem("updated_time");
  location.reload();
});
$(".retake").click(function () {
  location.reload();
});

// time code start here
// var total_time = 62;
// var minutes, seconds;
// function quiz_time() {
//   if (sessionStorage != "undefined") {
//     if (sessionStorage.updated_time) {
//       sessionStorage.updated_time = Number(sessionStorage.updated_time) - 1;
//     } else {
//       sessionStorage.updated_time = total_time;
//     }
//     minutes = Math.floor(Number(sessionStorage.updated_time) / 60);
//     seconds = Number(sessionStorage.updated_time) % 60;
//     time = `${minutes < 10 ? "0" : ""}${minutes}:${
//       seconds < 10 ? "0" : ""
//     }${seconds}`;
//     document.getElementById("timer").innerHTML =
//       `<i class="fas fa-clock"></i>` + time;
//   }
//   //outer if statemenet ends here
//   else {
//     alert("local storage is not supported");
//   }
//   if (sessionStorage.updated_time == 0) {
//     document.getElementById("timer").innerHTML =
//       `<i class="fas fa-clock"></i>` + " 00:00";

//     if (!$(".submit").prop("clicked")) {
//       $(".submit").click();
//     }
//     sessionStorage.removeItem("updated_time");
//   }

//   if (Number(sessionStorage.updated_time) >= 0) {
//     setTimeout(quiz_time, 1000);
//   }
// }
sessionStorage.clear();