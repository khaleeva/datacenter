
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const form_result = document.querySelector('.form__result');
    if (form) {
        form.addEventListener('submit', formSend);
    }

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('sending');

            let response = await fetch('send.php', {
                method: 'POST',
                body: formData
            })


            if (response.ok) {
                let result = await response.json();
                form.classList.add('form_hidden');
                form_result.classList.add('form__result_active');
            } else {
                alert('Что-то пошло не так...')
                form.reset();
            }

        } else alert('Заполните обязательные поля')

    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req')

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }

        }

        return error;

    }

    function formAddError(input) {
        input.parentElement.classList.add('error-form');
        input.classList.add('error-form');
    }


    function formRemoveError(input) {
        input.parentElement.classList.remove('error-form');
        input.classList.remove('error-form');
    }


    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

})


