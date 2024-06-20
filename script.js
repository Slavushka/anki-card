// Получаем ДОМ-элементы
const $back = document.querySelector('.back');
const $result = document.querySelector('.result');
const $resultWrapperFront = document.querySelector('.result__wrapper-front');
const $resultWrapperBack = document.querySelector('.result__wrapper-back');

// Создаём ДОМ-элементы
const resultSpan = (spanClass, spanText, spanWrapper) => {
  const $resultSpan = document.createElement('span');
  $resultSpan.classList.add('result__span');
  $resultSpan.classList.add(spanClass);
  $resultSpan.textContent = spanText;
  spanWrapper.append($resultSpan);
};

// Добавляем классы для ДОМ-элементов
// $resultSpan.classList.add('result__span');

// Получаем строку с правильными ответами
const backAnswerStr = document.querySelector('.back__answer')
.textContent
.toLowerCase();

// Получаем массив с правильными ответами.
const backAnswerArray = backAnswerStr.split(', ');
console.log(backAnswerArray);


// Получаем строку с введёнными ответами.
const frontAnswerStr = document.querySelector('.front__input');

// Событие при смене фокуса поля ввода ответа.
frontAnswerStr.addEventListener('blur', () => {
  // Получаем массив с введёнными ответами.
  const frontAnswerArray = frontAnswerStr
  .value
  .toLowerCase()
  .split(', ');
  console.log(frontAnswerArray);

  // Сравниваем ответы с правильными.
  // Проверка ответа и выделение по цвету.
  $result.classList.toggle('display-none');
  let count = 0;
  for (let i = 0; i < frontAnswerArray.length; i++) {
    if (backAnswerArray.indexOf(frontAnswerArray[i]) !== -1) {
      console.log(
        'Есть такое: ',
        frontAnswerArray[i]
      );
      count = count + 1;
      console.log('count', count);
      // $back.classList.toggle('display-none');
      resultSpan('result__span_green', frontAnswerArray[i], $resultWrapperFront);
    } else {
      console.log(
        'Нет такого: ',
        frontAnswerArray[i]
      );
      resultSpan('result__span_red', frontAnswerArray[i], $resultWrapperFront);
    };
  };

  // Проверка правильного ответа и выборка которых нет в ответе.
  if (count !== 0) {
    for (let i = 0; i < backAnswerArray.length; i++) {
      if (frontAnswerArray.indexOf(backAnswerArray[i]) === -1) {
        console.log(
          'Вы не ответили: ',
          backAnswerArray[i]
        );
        $resultWrapperBack.classList.remove('display-none');
        resultSpan('result__span_red', backAnswerArray[i], $resultWrapperBack);
      };
    };
  } else {
    console.log('Вы ничего не угадали!!!');
    const $upsss = document.createElement('div');
    $upsss.innerHTML = '<p>Вы ничего не угадали!!!<br>Попробуйте ещё раз.</p>'
    $resultWrapperFront.append($upsss)
  };
}, {once: true});
