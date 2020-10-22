let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let phoneformat = "[0-9]{10}";
let phoneformat2 = "[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}";
let textformat= /^[a-zA-Z]*$/;

function confirmForm() {
    let firstname       = document.infoForms.firstName.value;
    let lastname        = document.infoForms.lastName.value;
    let mail            = document.infoForms.email.value;
    let phone           = document.infoForms.phone.value;
    let message         = document.infoForms.message.value;

    if ( (!infoForms.mr.checked) && (!infoForms.mme.checked) )
    {
        alert("You must choose a title");
        return false;
    }
    if ( (infoForms.mr.checked) && (infoForms.mme.checked) )
    {
        alert("You can't choose both title");
        return false;
    }
    if ( (firstname.length < 1) || (!firstname.match(textformat)) ){
        alert("please enter a valid first name");
        return false;
    }
    if ( (lastname.length < 1) || (!lastname.match(textformat)) ) {
        alert("please enter a valid last name");
        return false;
    }
    if (!mail.match(mailformat)) {
        alert("please enter a valid email address");
        return false;
    }
    if ( (!phone.match(phoneformat)) || (!phone.match(phoneformat2)) ) {
        alert("please enter a valid phone number");
        return false;
    }
    if  (message.length > 10) {
        alert("Please, write 10 caracters maximum.");
        return false;
    }
    if (!infoForms.terms.checked)
    {
        alert("You must choose accept terms");
        return false;
    }
    if (!infoForms.read.checked)
    {
        alert("You must read the terms");
        return false;
    }

}