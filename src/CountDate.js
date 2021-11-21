function GetDateForNotification(not){
    /* 8 февраля 2021 */
    /* Сегодня, 19 февраля 2021 */
    var today = new Date();
    var yesterday = new Date(Date.now()-86400000);
    var timeString = '';
    var date = not['date'];
    if (date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()){
            timeString += 'Сегодня';
        }
    else if (date.getDate() == yesterday.getDate() &&
                date.getMonth() == yesterday.getMonth() &&
                date.getFullYear() == yesterday.getFullYear()){
                timeString += 'Вчера';
        }
    else {
        if (date.getDay() == 0)
            timeString += 'Воскресенье'
        else if (date.getDay() == 1)
            timeString += 'Понедельник'
        else if (date.getDay() == 2)
            timeString += 'Вторник'
        else if (date.getDay() == 3)
            timeString += 'Среда'
        else if (date.getDay() == 4)
            timeString += 'Четверг'
        else if (date.getDay() == 5)
            timeString += 'Пятница'
        else if (date.getDay() == 6)
            timeString += 'Суббота'
    }
    timeString += ', ' + date.getDate() + ' ';
    if (date.getMonth() == 0)
        timeString += 'января'
    else if (date.getMonth() == 1)
        timeString += 'февраля'
    else if (date.getMonth() == 2)
        timeString += 'марта'
    else if (date.getMonth() == 3)
        timeString += 'апреля'
    else if (date.getMonth() == 4)
        timeString += 'мая'
    else if (date.getMonth() == 5)
        timeString += 'июня'
    else if (date.getMonth() == 6)
        timeString += 'июля'
    else if (date.getMonth() == 7)
        timeString += 'августа'
    else if (date.getMonth() == 8)
        timeString += 'сентября'
    else if (date.getMonth() == 9)
        timeString += 'октября'
    else if (date.getMonth() == 10)
        timeString += 'ноября'
    else if (date.getMonth() == 11)
        timeString += 'декабря'
    timeString += ' ' + date.getFullYear()
    return timeString;
}

function GetDateForMessage(item){
    /* Сегодня в 14:25 */
    /* 4 марта 2021 в 14:25 */
    var today = new Date();
    var yesterday = new Date(Date.now()-86400000);
    var timeString = '';
    var date = item['date'];
    if (date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()){
            timeString += 'Сегодня';
        }
    else if (date.getDate() == yesterday.getDate() &&
                date.getMonth() == yesterday.getMonth() &&
                date.getFullYear() == yesterday.getFullYear()){
                timeString += 'Вчера';
        }
    else {
      timeString += date.getDate() + ' ';
      if (date.getMonth() == 0)
          timeString += 'января'
      else if (date.getMonth() == 1)
          timeString += 'февраля'
      else if (date.getMonth() == 2)
          timeString += 'марта'
      else if (date.getMonth() == 3)
          timeString += 'апреля'
      else if (date.getMonth() == 4)
          timeString += 'мая'
      else if (date.getMonth() == 5)
          timeString += 'июня'
      else if (date.getMonth() == 6)
          timeString += 'июля'
      else if (date.getMonth() == 7)
          timeString += 'августа'
      else if (date.getMonth() == 8)
          timeString += 'сентября'
      else if (date.getMonth() == 9)
          timeString += 'октября'
      else if (date.getMonth() == 10)
          timeString += 'ноября'
      else if (date.getMonth() == 11)
          timeString += 'декабря'
        timeString += ' ' + date.getFullYear();
    }
    var min = date.getMinutes();
    if (min < 10)
        min = '0'+min;
    var hours = date.getHours();
    if (hours < 10)
        hours = '0'+hours;
    timeString += ' в ' + hours + ':' + min;
    return timeString;
}

function GetDateForHistory(item){
    /* Март 2021 */
    var timeString = '';
    var date = item['date'];
    
      if (date.getMonth() == 0)
          timeString += 'Январь'
      else if (date.getMonth() == 1)
          timeString += 'Февраль'
      else if (date.getMonth() == 2)
          timeString += 'Март'
      else if (date.getMonth() == 3)
          timeString += 'Апрель'
      else if (date.getMonth() == 4)
          timeString += 'Май'
      else if (date.getMonth() == 5)
          timeString += 'Июнь'
      else if (date.getMonth() == 6)
          timeString += 'Июль'
      else if (date.getMonth() == 7)
          timeString += 'Август'
      else if (date.getMonth() == 8)
          timeString += 'Сентябрь'
      else if (date.getMonth() == 9)
          timeString += 'Октябрь'
      else if (date.getMonth() == 10)
          timeString += 'Ноябрь'
      else if (date.getMonth() == 11)
          timeString += 'Декабрь'
        timeString += ' ' + date.getFullYear();
    return timeString;
}

export { GetDateForMessage, GetDateForNotification, GetDateForHistory}