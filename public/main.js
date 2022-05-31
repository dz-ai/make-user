let $inputName,
    $inputPass,
    $signButton,
    $logButton,
    $theSecret;

function onLoad() {
    $inputName = $('input#user-name')
    $inputPass = $('input#pass')
    $signButton = $('input#sign-in-button')
    $logButton = $('input#log-in-button')
    $theSecret = $('p#the-secret')
}

function onSignClicked() {
    $theSecret.empty()
    if ($inputName.val() && $inputPass.val() && /^[a-z]+$/i.test($inputName.val()) && /^\d+$/.test($inputPass.val())) {
        fetch('/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: $inputName.val(),
                pass: $inputPass.val()
            })
        })
            .then(res => res.json())
            .then(results => {
                $signButton.val(results.signed)
                $logButton.val(results.loge)
                $inputName.val('')
                $inputPass.val('')
            })
    } else {
        $inputName.val('This field required')
        $inputPass.val('This field required')
    }

}

function onLogClicked() {
    $theSecret.empty()

    if ($logButton.val() === 'Login' && $inputName.val() && $inputPass.val()) {

        fetch('/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: $inputName.val(),
                pass: $inputPass.val()
            })
        })
            .then(res => res.json())
            .then(results => {
                $logButton.val(results.loge)
            })

    } else {
        fetch('/logout', {
            method: 'get'
        })
            .then(res => res.json())
            .then(results => {
                $logButton.val(results.loge)
                $inputName.val('')
                $inputPass.val('')
            })
    }

}

function onSecretClicked() {
    $theSecret.empty()
    fetch('/secret', {
        method: 'get'
    })
        .then(res => res.json())
        .then(results => {
           $theSecret.append(results.answer)
        })
}

