// exports.emailTemplate = (firstName, cardName, expDate, email, type) => {
//   return `
//   <!DOCTYPE html>
//   <html>
//       <head>
//          <style>
//              html, body {
//       margin: 0 auto;
//       padding: 0;
//   }
//   .layout {
//       background-color: #EEEEEE;
//       font-family: "Roboto";
//       width: 100%;
//       color: #484b5b;
//       padding: 20px 0;
//   }
//   .content {
//       text-align: center;
//       background-color: white;
//       width: 75%;
//       margin: 0 auto;
//       padding: 25px;
//   }
//   .name {
//       line-height: 20px;
//       font-size: 24px;

//   }
//          </style>
//       </head>

//       <body>
//           <div class="layout">
//           <div class="content">

//               <h1 class="name">Kloud Engineering</h1>

//                 <hr>
//                 <div>
//                    <p>${
//                      type === "Warning"
//                        ? `Warning ${firstName}'s ${cardName} will expire after ${expDate}-month and it's email : ${email} `
//                        : `Staff inactivation we set ${firstName}'s status to -InActive- because
//                        it's ${cardName} expired before ${expDate}-month ago and it's email : ${email} `
//                    }</p> Fleet Management
//           </div>
//       </div>
//       </div>
//       </body>
//   </html>`;
// };
// exports.emailTemplate2 = (firstName, cardName, expDate, email, type, count) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//         <head>
//            <style>
//                html, body {
//         margin: 0 auto;
//         padding: 0;
//     }
//     .layout {
//         background-color: #EEEEEE;
//         font-family: "Roboto";
//         width: 100%;
//         color: #484b5b;
//         padding: 20px 0;
//     }
//     .content {
//         text-align: center;
//         background-color: white;
//         width: 75%;
//         margin: 0 auto;
//         padding: 25px;
//     }
//     .name {
//         line-height: 20px;
//         font-size: 24px;

//     }
//            </style>
//         </head>

//         <body>
//             <div class="layout">
//             <div class="content">

//                 <h1 class="name">Kloud Engineering</h1>

//                   <hr>
//                   <div>
//                      <p>${
//                        count == 3
//                          ? type === "Warning"
//                            ? `Warning ${firstName}'s ${cardName} will expire after ${expDate}-month and it's email : ${email}\n
//                             this is the last notification about this event because you reached the limit`
//                            : `Warning ${firstName}'s status is inactive and he cann't drive because it's ${cardName} expired
//                             before ${expDate}-month ago and it's email : ${email} \n
//                             and this is the last notification about this event because you reached the limit`
//                          : type === "Warning"
//                          ? `Warning ${firstName}'s ${cardName} will expire after ${expDate}-month and it's email : ${email}\n`
//                          : `Warning for inactivation we set ${firstName}'s status to -InActive- because
//                             it's ${cardName} expired before ${expDate}-month ago and it's email : ${email} `
//                      }</p> Fleet Management
//             </div>
//         </div>
//         </div>
//         </body>
//     </html>`;
// };
exports.emailTemplate = (firstName, cardName, expDate, email, type) => {
  return type === "Warning"
    ? `Warning ${firstName}'s ${cardName} will expire after ${expDate}-month and it's email : ${email} `
    : `Staff inactivation we set ${firstName}'s status to -InActive- because 
      it's ${cardName} expired before ${expDate}-month ago and it's email : ${email} `;
};
exports.emailTemplate2 = (firstName, cardName, expDate, email, type, count) => {
  return count == 3
    ? type === "Warning"
      ? `Warning ${firstName}'s ${cardName} will expire after ${expDate}-month and it's email : ${email}\n
   this is the last notification about this event because you reached the limit`
      : `Warning ${firstName}'s status is inactive and he cann't drive because it's ${cardName} expired 
   before ${expDate}-month ago and it's email : ${email} \n 
   and this is the last notification about this event because you reached the limit`
    : type === "Warning"
    ? `Warning ${firstName}'s ${cardName} will expire after ${expDate}-month and it's email : ${email}\n`
    : `Warning for inactivation we set ${firstName}'s status to -InActive- because 
   it's ${cardName} expired before ${expDate}-month ago and it's email : ${email} `;
};
