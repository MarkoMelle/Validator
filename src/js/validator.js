/* eslint-disable max-len */
import luhnAlgorithmValidation from './luhnAlgorithmValidation';

export default function getCardType(str, isSubmit) {
  const value = str.replace(/ /g, '');
  let arrValue = Array.from(value);
  arrValue = arrValue.map((e) => +e);
  let response;
  let isLuhnValid;

  if (isSubmit) {
    isLuhnValid = luhnAlgorithmValidation(arrValue);
  }

  const cardData = {
    mir: { type: 'mir', length: 16 },
    visa: { type: 'visa', length: 16 },
    amex: { type: 'amex', length: 15 },
    jcb: { type: 'jcb', length: 15 },
    diners_club: { type: 'diners_club', length: 14 },
    master: { type: 'master', length: 16 },
    discover: { type: 'discover', length: 16 },

  };

  const getResponse = (type, length) => {
    if (arrValue.length === length && isSubmit) {
      if (!isLuhnValid) {
        response = { success: false, type, message: 'Ошибка: Проверьте корректность данных' };
      } else {
        response = { success: true, type };
      }
    } else if (arrValue.length !== length && isSubmit) {
      response = { success: false, type, message: `Ошибка: ожидаемая длинна ${length} символов` };
    } else {
      response = type;
    }
  };
  if (arrValue[0] === 2) {
    getResponse(cardData.mir.type, cardData.mir.length);
  } else if (arrValue[0] === 4) {
    getResponse(cardData.visa.type, cardData.visa.length);
  } else if (arrValue[0] === 3) {
    if (arrValue[1] === 7 || arrValue[1] === 4) {
      getResponse(cardData.amex.type, cardData.amex.length);
    } else if ((arrValue[1] === 0 && arrValue[2] >= 8) || arrValue[1] === 1 || arrValue[1] === 3 || arrValue[1] === 5) {
      getResponse(cardData.jcb.type, cardData.jcb.length);
    } else if (arrValue[1] === 0 || arrValue[1] === 6 || arrValue[1] === 8) {
      getResponse(cardData.diners_club.type, cardData.diners_club.length);
    }
  } else if (arrValue[0] === 5) {
    getResponse(cardData.master.type, cardData.master.length);
  } else if (value.match(/^6011/)) {
    getResponse(cardData.discover.type, cardData.discover.length);
  } else if (!response && arrValue.length >= 4 && isSubmit) {
    response = { success: false, message: 'Ошибка ввода' };
  }
  if (!response) {
    response = 'card';
  }
  return response;
}
