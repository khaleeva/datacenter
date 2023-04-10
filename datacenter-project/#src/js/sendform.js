
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
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
                form.classList.add('display-none');
                document.querySelector('#form-title').style.display = 'none';
                document.querySelector('.form-send').classList.add('active');
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
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }


    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }


    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

})


