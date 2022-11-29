function enableValidation ({formSelector, fieldClass, errorTextClass, buttonClass}) {
  const form = document.querySelector(formSelector);
  const submitButton = form.querySelector(buttonClass);

  function setError (key, errorMessage) {
    const inputElement = form.querySelector(`${fieldClass}[name=${key}]`);
    let errorElement = form.querySelector(`${errorTextClass}[data-key=${key}]`);

    if (!errorElement) {
      errorElement = document.createElement('p');
      inputElement.after(errorElement);
    }
  
    inputElement.classList.add('popup__error-text_invalid');
    errorElement.classList.add('popup__error-text');
    errorElement.dataset.key = key;
    errorElement.textContent = errorMessage;
  }

  function clearError(key) {
    const inputElement = form.querySelector(`${fieldClass}[name=${key}]`);
    let errorElement = form.querySelector(`${errorTextClass}[data-key=${key}]`);

    inputElement.classList.remove('popup__error-text_invalid');

    if (errorElement) {
      errorElement.remove()
    }
  }

  form.addEventListener('input', (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;
    const formData = new FormData(evt.currentTarget);
    const values = Object.fromEntries(formData)

    const errorMessage = validate(key, value, values);

    let isFormValid = true;

    formData.forEach((value, key) => {
      const errorMessage = validate(key, value, values);
      if (errorMessage) {
        isFormValid = false;
      }  
    })

    if (!isFormValid) {
      submitButton.classList.add('popup__save-button_disabled');
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove('popup__save-button_disabled');
      submitButton.disabled = false;
    }

    if (!errorMessage) {
      evt.target.onblur = () => {
        evt.target.dataset.dirty = 'true';
      };
      clearError(key);
      return
    }
    
    if (evt.target.dataset.dirty === 'true') {
      setError(key, errorMessage);
      return;
    }

    evt.target.onblur = () => {
      evt.target.dataset.dirty = 'true';
      setError(key, errorMessage);
    };

    
  });

  form.addEventListener('submit', (evt) => {
    const formData = new FormData(evt.currentTarget);
    const values = Object.fromEntries(formData);

    let isFormValid = true;
    
    formData.forEach((value, key) => {
      const errorMessage = validate(key, value, values);
      const inputElement = form.querySelector(`${fieldClass}[name=${key}]`)

      if (!errorMessage) {
        return;
      }

      setError(key, errorMessage);
      inputElement.dataset.dirty = 'true';

      isFormValid = false; 
    });

    if (!isFormValid) {
      evt.preventDefault();
      return;
    }
    
  });

}

enableValidation({
  formSelector: '#profile-form',
  fieldClass: '.popup__field',
  errorTextClass: '.popup__error-text',
  buttonClass: '.popup__save-button'
});

enableValidation({
  formSelector: '#card-form',
  fieldClass: '.popup__field',
  errorTextClass: '.popup__error-text',
  buttonClass: '.popup__save-button'
});

const validators = {
  profileName: validateProfileName,
  profileAbout: validateProfileAbout,
  cardName: validateCardName,
  cardLink: validateCardLink,
};

function validate(key, value) {
  const validator = validators[key];
  return validator(value);
}

function validateProfileName(value) {
  if (!value) {
    return "Вы пропустили это поле.";
  }

  if (value.length < 2) {
    return "Минимальное количество символов: 2.Длина текста сейчас: 1 символ";
  }

  if (value.length > 40) {
    return "Вы превысили количество символов";
  }

  return null;
}

function validateProfileAbout(value) {
  if (!value) {
    return "Вы пропустили это поле.";
  }

  if (value.length < 2) {
    return "Минимальное количество символов: 2.Длина текста сейчас: 1 символ";
  }

  if (value.length > 200) {
    return "Вы превысили количество символов";
  }

  return null;
}

function validateCardName(value) {
  if (!value) {
    return "Вы пропустили это поле.";
  }

  if (value.length < 2) {
    return "Минимальное количество символов: 2.Длина текста сейчас: 1 символ";
  }

  if (value.length > 30) {
    return "Вы превысили количество символов";
  }

  return null;
}

function validateCardLink(value) {
  const linkError = !(/(www|http:|https:)+[^\s]+[\w]/.test(value));

  if (linkError) {
    return "Введите адрес сайта"
  }

  if (!value) {
    return "Вы пропустили это поле.";
  }
}
