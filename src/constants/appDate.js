let date=new Date()
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let year=date.getFullYear();
let month=months[date.getMonth()];
let numericMonth=date.getMonth()+1;

let todaydate=date.getDate()

let hours=date.getHours();
let minutes=date.getMinutes()
let seconds=date.getSeconds()

if(seconds <=9){
    seconds = `0${seconds}`
}

if (hours ==0){
    hours = `0${hours}`
}

if(minutes <=9){
    minutes =`0${minutes}`
}

let fullDate= todaydate + "-" + month + "-"+ year +" "+  hours + ":" + minutes + ":" + seconds
let orderId= todaydate +""+ numericMonth +""+ hours + "" + minutes + "" + seconds

//console.log(orderId)

export default {
    fullDate,
    orderId
}