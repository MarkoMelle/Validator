/* eslint-disable max-len */
export default function getCardType(value, isSubmit) {
  let arrValue = Array.from(value);
  arrValue = arrValue.map((e) => +e);
  let response;

  if (arrValue[0] === 2) {
    if (arrValue.length === 16 && isSubmit) {
      response = { success: true, type: 'mir' };
    } else if (arrValue.length !== 16 && isSubmit) {
      response = { success: false, type: 'mir', message: 'Ошибка: ожидаемая длинна 16 символов' };
    } else {
      response = 'mir';
    }
  } else if (arrValue[0] === 4) {
    if (arrValue.length === 16 && isSubmit) {
      response = { success: true, type: 'visa' };
    } else if (arrValue.length !== 16 && isSubmit) {
      response = { success: false, type: 'visa', message: 'Ошибка: ожидаемая длинна 16 символов' };
    } else {
      response = 'visa';
    }
  } else if (arrValue[0] === 3) {
    if (arrValue[1] === 7 || arrValue[1] === 4) {
      if (arrValue.length === 15 && isSubmit) {
        response = { success: true, type: 'amex' };
      } else if (arrValue.length !== 15 && isSubmit) {
        response = { success: false, type: 'amex', message: 'Ошибка: ожидаемая длинна 15 символов' };
      } else {
        response = 'amex';
      }
    } else if ((arrValue[1] === 0 && arrValue[2] >= 8) || arrValue[1] === 1 || arrValue[1] === 3 || arrValue[1] === 5) {
      if (arrValue.length === 15 && isSubmit) {
        response = { success: true, type: 'jcb' };
      } else if (arrValue.length !== 16 && isSubmit) {
        response = { success: false, type: 'jcb', message: 'Ошибка: ожидаемая длинна 15 символов' };
      } else {
        response = 'jcb';
      }
    } else if (arrValue[1] === 0 || arrValue[1] === 6 || arrValue[1] === 8) {
      if (arrValue.length === 15 && isSubmit) {
        response = { success: true, type: 'diners_club' };
      } else if (arrValue.length !== 14 && isSubmit) {
        response = { success: false, type: 'diners_club', message: 'Ошибка: ожидаемая длинна 14 символов' };
      } else {
        response = 'diners_club';
      }
    }
  } else if (arrValue[0] === 5) {
    if (arrValue.length === 16 && isSubmit) {
      response = { success: true, type: 'master' };
    } else if (arrValue.length !== 16 && isSubmit) {
      response = { success: false, type: 'master', message: 'Ошибка: ожидаемая длинна 16 символов' };
    } else {
      response = 'master';
    }
  } else if (value.match(/^6011/)) {
    if (arrValue.length === 16 && isSubmit) {
      response = { success: true, type: 'discover' };
    } else if (arrValue.length !== 16 && isSubmit) {
      response = { success: false, type: 'discover', message: 'Ошибка: ожидаемая длинна 16 символов' };
    } else {
      response = 'discover';
    }
  } else if (!response && arrValue.length >= 4 && isSubmit) {
    response = { success: false, message: 'Ошибка ввода' };
  }
  if (!response) {
    response = 'card';
  }
  return response;
}
