

function validateMe() {

    if ($('#iuiTxt').val() === "") {
        alert('Total no. of IUI cycles is empty');
        return false;
    }

    if ($('#ivfTxt').val() === "") {
        alert('Total no. of IVF cycles is empty');
        return false;
    }

    if ($('#freshTxt').val() === "") {
        alert('Fresh pick-ups is empty');
        return false;
    }

    if ($('#frozenTxt').val() === "") {
        alert('Frozen Transfers is empty');
        return false;
    }

    if ($('#patientTxt').val() === "") {
        alert('Self (Patient) cycles is empty');
        return false;
    }

    if ($('#donotTxt').val() === "") {
        alert('Donor cycles is empty');
        return false;
    }

    if ($('#agonistTxt').val() === "") {
        alert('Agonist cycles is empty');
        return false;
    }

    if ($('#antagonistTxt').val() === "") {
        alert('Antagonist cycles is empty');
        return false;
    }

    let pId = new URLSearchParams(window.location.search).get('pid'), 
    iuiTxt = $('#iuiTxt').val(), 
    ivfTxt = $('#ivfTxt').val(),
    freshTxt = $('#freshTxt').val(),
    frozenTxt = $('#frozenTxt').val(),
    patientTxt = $('#patientTxt').val(),
    donotTxt = $('#donotTxt').val(),
    agonistTxt = $('#agonistTxt').val(),
    antagonistTxt = $('#antagonistTxt').val();
    
}