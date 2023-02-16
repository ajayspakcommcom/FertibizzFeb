

function loadMonthYear() {
    const date = new Date();
    let dt = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    $('#cmbMonth').val(dt.getMonth() + 1); // our combo box starts with 1
    $('#cmbYear').val(dt.getFullYear());
    $('#cmbMonth').prop('disabled', true);
    $('#cmbYear').prop('disabled', true);
  }

  loadMonthYear();


  function validateMe() {

    console.log('Market Insight Saved');

    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data"));
    console.log(userData);

    let insightId = new URLSearchParams(window.location.search).get('insightId'),
    empId = userData.empId,
    centreId = new URLSearchParams(window.location.search).get('centreId'),
    month = parseInt($('#cmbMonth').val()),
    year = parseInt($('#cmbYear').val()),
    answerOne = $('input[name="obstetricsRadio"]:checked').val(), 
    AnswerTwo = $('#AnswerTwo').val(),
    answerThreeRFSH = $('#answerThreeRFSH').val(),
    answerThreeHMG = $('#answerThreeHMG').val(),
    answerFourRHCG = $('#answerFourRHCG').val(),
    answerFourAgonistL = $('#answerFourAgonistL').val(),
    answerFourAgonistT = $('#answerFourAgonistT').val(),
    answerFourRHCGTriptorelin = $('#answerFourRHCGTriptorelin').val(),
    answerFourRHCGLeuprolide = $('#answerFourRHCGLeuprolide').val(),
    answerProgesterone = $('#answerProgesterone').val(),
    answerFiveDydrogesterone = $('#answerFiveDydrogesterone').val(),
    answerFiveCombination = $('#answerFiveCombination').val();

    param = {
        insightId : insightId == 'null' ? 0 : insightId,
        empId : empId,
        centreId : centreId,
        month : month ,   
        year : year , 
        answerOne : answerOne == 'yes' ? true : false,
        AnswerTwo : AnswerTwo,
        answerThreeRFSH : answerThreeRFSH,
        answerThreeHMG : answerThreeHMG,
        answerFourRHCG : answerFourRHCG,
        answerFourAgonistL : answerFourAgonistL,
        answerFourAgonistT : answerFourAgonistT,
        answerFourRHCGTriptorelin : answerFourRHCGTriptorelin,
        answerFourRHCGLeuprolide : answerFourRHCGLeuprolide,
        answerProgesterone : answerProgesterone,
        answerFiveDydrogesterone : answerFiveDydrogesterone,
        answerFiveCombination : answerFiveCombination  
    }

    console.log(param);

    axios
        .post('/center-market-insight-add/', param).then((response) => {            
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });

}

showDrNameCentreName();

function getMarketInsightDetails() {

    let insightId = new URLSearchParams(window.location.search).get('insightId');
    console.log(insightId);

    axios
        .get('/market-insight-detail/' + insightId).then((response) => {
            console.log(response.data);  
            let data = response.data;
            data.answerOne == true ? $("[name=obstetricsRadio]")[0].setAttribute("checked", "checked") : $("[name=obstetricsRadio]")[1].setAttribute("checked", "checked");
            $('#AnswerTwo').val(data.AnswerTwo);
            $('#answerThreeRFSH').val(data.answerThreeRFSH);
            $('#answerThreeHMG').val(data.answerThreeHMG);
            $('#answerFourRHCG').val(data.answerFourRHCG);
            $('#answerFourAgonistL').val(data.answerFourAgonistL);
            $('#answerFourAgonistT').val(data.answerFourAgonistT);
            $('#answerFourRHCGTriptorelin').val(data.answerFourRHCGTriptorelin);
            $('#answerFourRHCGLeuprolide').val(data.answerFourRHCGLeuprolide);
            $('#answerProgesterone').val(data.answerProgesterone);
            $('#answerFiveDydrogesterone').val(data.answerFiveDydrogesterone);
            $('#answerFiveCombination').val(data.answerFiveCombination);
                      
        }).catch((err) => {
            console.log(err);
        });
}
