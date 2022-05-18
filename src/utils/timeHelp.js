export const formatDate = (date) => {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
}

export const formatTime = (time) => {

    let second = time%60;
  
    let minute = ((time%3600)/60).toFixed(0);
  
    let hour = (time/3600).toFixed(0);
    console.log(hour);
    if (hour === 0) {
        return `${minute}m.${second}s`;
    } else {
        return `${hour}h.${minute}m.${second}s`;
    }
}