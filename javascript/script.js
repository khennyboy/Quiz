$(document).ready(function () {
  var num_correct = 0;
  var num_wrong = 0;
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
                    ${questions[i].numb}. ${questions[i].question}<br>
                    Answers selected: <span class="question_${
                      i + 1
                    }"></span><br>
                    Answer: ${questions[i].ans}
                  </div>`;
    $(".result_div").append(temp_3);
  }
  // for loops ends here
  // to add class to correct and wrong answer
  $(".opt").on("click", function () {
    var ans_chosen = "";
    if ($(this).is(":checked")) {
      ans_chosen = $(this).val(); // this stores the answer chosen
      all_questions += 1;
      if (all_questions == questions.length) {
        $(".submit").show();
        let result_2 = `<h3>You Scored ${num_correct} out of ${questions.length} questions</h3>`;
        $(".text").append(result_2);
      } else {
        $(".submit").hide();
      }
    }
    // console.log(ans_chosen);
    correct_ans = $(this).parent("label").siblings("#answer").val(); // this stores the correct answer
    // console.log(correct_ans);

    var q = $(this).parent("label").parent(".option_div").parent(".question");
    q = q.attr("id");
    q = "." + q;
    $(q).text(ans_chosen); // its class becomes that of the class under temp_3

    //alert(q);

    // comparing the correct_and the chosen_ans
    if (ans_chosen == correct_ans) {
      $(this).siblings(".checkmark").removeClass("wrong");
      $(this).siblings(".checkmark").addClass("correct");
      num_correct += 1;
      $(function () {
        Swal.fire(`Correct Answer! You got ${num_correct} answer correct`);
      });
    }
    if (ans_chosen != correct_ans) {
      $(this).siblings(".checkmark").removeClass("correct");
      $(this).siblings(".checkmark").addClass("wrong");

      num_wrong += 1;
      $(function () {
        Swal.fire(
          `Wrong! The correct answer is ${correct_ans}<br>You got ${num_wrong} answer wrong`
        );
      });
      // var correct_opt = $(this)
      //   .parent("label")
      //   .parent(".option_div")
      //   .find(".opt");
      // for (var i = 0; i < correct_opt.length; i++) {
      //   // console.log(correct_opt[i].value);
      //   if (correct_opt[i].value == correct_ans) {
      //     num_wrong += 1;
      //     $(function () {
      //       Swal.fire(
      //         `Wrong! The correct answer is ${correct_ans}<br>You got ${num_wrong} answer wrong`
      //       );
      //     });
      //   }
      // }
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
  var all_questions = 0;
  $(".submit").hide();
  $(".result_div").hide();
  $(".reload").hide();

  $(".submit").click(function () {
    console.log("hello");
    $(this).siblings(".pop_up").addClass("open_popup");
    $(".submit").hide();
  });

  $(".answers").click(function () {
    $(".result_div").show();
    $(".total_question").hide();
    $(".pagination").hide();
    $(".pop_up").hide();
    $(".reload").show();
  });
  $(".page-link").click(function (e) {
    e.preventDefault();
    $(this).siblings(".page-link").removeClass("select"); //remove the class "select" from others
    $(this).addClass("select"); // add class "select" to this one clicked
    var que = $(this).data("id");
    var que_id = `#${que}`; // same as var que_id = "#" + que;
    $(".question").hide();
    $(que_id).show();
  });
});

$(".next").click(function () {
  var active_tab = $(".page-link.select");
  var next_tab = active_tab.next(); //use of next() function here
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
