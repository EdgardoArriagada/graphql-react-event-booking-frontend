(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{126:function(e,t,n){},5448:function(e,t,n){e.exports=n(5636)},5474:function(e,t,n){},5600:function(e,t,n){},5622:function(e,t,n){},5628:function(e,t,n){},5633:function(e,t,n){},5634:function(e,t,n){},5635:function(e,t,n){},5636:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(20),i=n.n(c),o=(n(126),n(56)),l=n(47),s=n(19),u=n.n(s),E=n(32),m=n(12),d=n(29),p=n.n(d),f=n(54),b=n.n(f),O=n(28),h=n.n(O),_=(n(5474),{isSideDrawOpen:!1}),v=function(e,t){switch(t.type){case"UI_TOGGLE_SIDE_NAV":return{isSideDrawOpen:!e.isSideDrawOpen};default:return e||_}},N={token:null,userId:null,tokenExpiration:null},g=function(e,t){switch(t.type){case"AUTH_LOG_IN":return{token:t.token,userId:t.userId,tokenExpiration:t.tokenExpiration};case"AUTH_LOG_OUT":return N;default:return e||N}},S=n(21),y=n(37),I={events:[],status:"PRISTINE"},T=function(e,t){switch(t.type){case"FETCH_EVENTS_PENDING":case"CREATE_EVENT_PENDING":case"MODIFY_EVENT_PENDING":return{events:Object(y.a)(e.events),status:"PENDING"};case"FETCH_EVENTS_FULFILLED":return{events:Object(y.a)(t.events),status:"FULFILLED"};case"CREATE_EVENT_FULFILLED":return{events:[].concat(Object(y.a)(e.events),[Object(S.a)({},t.event)]),status:"FULFILLED"};case"MODIFY_EVENT_FULFILLED":var n=e.events.filter(function(e){return t.event._id!==e._id});return{events:[].concat(Object(y.a)(n),[Object(S.a)({},t.event)]),status:"FULFILLED"};case"FETCH_EVENTS_REJECTED":case"CREATE_EVENT_REJECTED":case"MODIFY_EVENT_REJECTED":return{events:Object(y.a)(e.events),status:"REJECTED"};default:return e||I}},C={bookings:[],status:"PRISTINE"},j=function(e,t){switch(t.type){case"FETCH_BOOKINGS_PENDING":case"CANCEL_BOOKINGS_PENDING":return{bookings:Object(y.a)(e.bookings),status:"PENDING"};case"FETCH_BOOKINGS_FULFILLED":return{bookings:Object(y.a)(t.bookings),status:"FULFILLED"};case"CANCEL_BOOKINGS_FULFILLED":return{bookings:e.bookings.filter(function(e){return t.bookingId!==e._id}),status:"FULFILLED"};case"FETCH_BOOKINGS_REJECTED":case"CANCEL_BOOKINGS_REJECTED":return{bookings:Object(y.a)(e.bookings),status:"REJECTED"};default:return e||C}},k=Object(a.createContext)({}),D=function(){return Object(a.useContext)(k)},w=n(25),L={primaryButton:{margin:"0.25rem 0.1rem"},modalCentered:{top:"50%",left:"50%",transform:"translate(-50%, -50%)"},card:{width:"30rem",margin:"0.5rem auto",maxWidth:"95%",display:"flex",flexDirection:"column",alignItems:"center"}},x=Object(w.createMuiTheme)({palette:{primary:{main:"#800080"}},typography:{useNextVariants:!0}}),R={production:{BACKEND_URL:"https://easy-event-0.herokuapp.com"},development:{BACKEND_URL:"http://localhost:3000"}},F=Object(S.a)({},R["production"],{getGraphqlUrl:function(){return this.BACKEND_URL+"/graphql"}}),U=n(36),G=n(7),A=Object(w.withStyles)(function(e){return{close:{padding:e.spacing.unit/2}}})(function(e){var t=e.classes,n=Object(U.a)(e,["classes"]),c=Object(a.useState)(!0),i=Object(m.a)(c,2),o=i[0],l=i[1],s=n.message,u=n.duration,E=n.centered;function d(){l(!1)}return Object(a.useEffect)(function(){null!==u&&void 0!==u&&setTimeout(function(){l(!1)},u)},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(G.k,{anchorOrigin:{vertical:"bottom",horizontal:E?"center":"left"},open:o,autoHideDuration:6e3,onClose:d,ContentProps:{"aria-describedby":"message-id"},message:r.a.createElement("span",{id:"message-id"},s),action:[r.a.createElement(G.a,{color:"secondary","aria-label":"Close",onClick:d,className:t.close,key:"close"},"DISMISS")]}))}),P=function(){var e=!0,t=D().AuthDispatch,n=Object(a.useState)(!0),c=Object(m.a)(n,2),i=c[0],o=c[1],l=Object(a.useState)("PRISTINE"),s=Object(m.a)(l,2),d=s[0],f=s[1],O=Object(a.useState)(0),_=Object(m.a)(O,2),v=_[0],N=_[1],g=Object(a.useRef)({}),S=Object(a.useRef)({}),y=function(){var n=Object(E.a)(u.a.mark(function n(a){var r,c,o,l;return u.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(a.preventDefault(),!e){n.next=4;break}return n.next=4,f("PRISTINE");case 4:if(r=g.current.value.trim(),c=S.current.value.trim(),r&&c){n.next=11;break}if(!e){n.next=10;break}return n.next=10,f("ATTEMPT_WITH_EMPTY_fORM");case 10:return n.abrupt("return");case 11:e&&N(10),o={query:'\n            mutation {\n                createUser(userInput: {email:"'.concat(r,'", password:"').concat(c,'"}) {\n                  _id\n                  email\n                }\n              }\n            ')},l={query:'\n            query {\n                login(email:"'.concat(r,'", password:"').concat(c,'") {\n                  userId\n                  token\n                  tokenExpiration\n                }\n              }\n            ')},h()({url:F.getGraphqlUrl(),method:"POST",data:i?l:o,headers:{"Content-Type":"application/json"}}).then(function(t){return 200!==t.status&&201!==t.status&&e?f("ERROR"):t.data?t.data.data:void 0}).then(function(n){switch(N(100),i){case!0:if(!n.login&&e)return f("LOGIN_WRONG_CREDENTIALS");if(e){var a=n.login,r=a.token,c=a.userId,o=a.tokenExpiration;return void t({type:"AUTH_LOG_IN",token:r,userId:c,tokenExpiration:o})}case!1:if(!n.createUser&&e)return f("SIGNUP_USER_EXISTS");if(e)return f("SIGNUP_SUCCESS")}}).catch(function(t){if(e)return f("ERROR")}).finally(function(){setTimeout(function(){e&&N(0)},300)});case 15:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}();return Object(a.useEffect)(function(){return function(){e=!1}},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{variant:"determinate",value:v,style:{opacity:v?1:0}}),r.a.createElement("form",{className:"auth-page",onSubmit:y},r.a.createElement("div",{className:"form-control"},r.a.createElement("label",{htmlFor:"email"},"E-mail"),r.a.createElement("input",{type:"email",id:"email",ref:g})),r.a.createElement("div",{className:"form-control"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",ref:S})),r.a.createElement(p.a,{disabled:0<v&&v<100,variant:"contained",color:"primary",type:"submit",style:L.primaryButton},i?"Login":"Signup"),r.a.createElement(p.a,{variant:"text",color:"primary",type:"button",style:L.primaryButton,onClick:function(e){return o(!i)}},"Switch to ",i?"Signup":"Login")),function(){switch(d){case"LOGIN_WRONG_CREDENTIALS":return r.a.createElement(A,{message:"Wrong credentials",centered:!0});case"SIGNUP_USER_EXISTS":return r.a.createElement(A,{message:"User already exists",centered:!0});case"SIGNUP_SUCCESS":return r.a.createElement(A,{message:"User Creation have been successful!",centered:!0});case"ERROR":return r.a.createElement(A,{message:"Error!: Check connection or call administrator",centered:!0});case"ATTEMPT_WITH_EMPTY_fORM":return r.a.createElement(A,{message:"Please provide both Email and Password",centered:!0});default:return r.a.createElement("div",null)}}())},B=Object(w.withStyles)(function(e){return{paper:{position:"absolute",width:50*e.spacing.unit,maxWidth:"80%",backgroundColor:e.palette.background.paper,boxShadow:e.shadows[5],outline:"none"}}})(function(e){var t=e.classes,n=Object(U.a)(e,["classes"]);return r.a.createElement("div",{className:t.paper,style:L.modalCentered},n.children)}),M=n(46),H=n(70),V=n(123),K=n(5638),q=n(5640),Y=n(172),J=n(171),W=n(173),z=n(5639),X=n(9),Q=n.n(X),Z=(n(5600),Object(w.withStyles)(function(e){return{header:{backgroundColor:e.palette.primary.main,color:"white",padding:"0.3rem 1.5rem"},content:{margin:"1.5rem"},actions:{}}})(function(e){var t=e.classes,n=Object(U.a)(e,["classes"]),c=D(),i=c.AuthState,o=c.EventsDispatch,l=Object(a.useState)(new Date),s=Object(m.a)(l,2),u=s[0],E=s[1],d=Object(a.useState)(new Date),p=Object(m.a)(d,2),f=p[0],b=p[1],O=n.eventToModify||{},_=Object(a.useState)(O.title),v=Object(m.a)(_,2),N=v[0],g=v[1],S=Object(a.useState)(O.description),y=Object(m.a)(S,2),I=y[0],T=y[1],C=Object(a.useState)(O.price),j=Object(m.a)(C,2),k=j[0],w=j[1];function x(e,t){e(t.currentTarget.value)}return Object(a.useEffect)(function(){var e;O.date&&(e=new Date(O.date),E(e),b(e))},[]),r.a.createElement(B,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(G.n,{className:t.header,variant:"h6"},"Create Event"),r.a.createElement("form",{className:Q()(t.content,"event-modal-content__form"),onSubmit:function(e){e.preventDefault();var t=N&&N.trim(),a=I&&I.trim(),r=k&&k.toString(),c=function(e,t){if(!e||!t)throw new Error("Date and time must be selected");var n=new Date;return n=Object(K.a)(n,Object(q.a)(e)),n=Object(Y.a)(n,Object(J.a)(t)),(n=Object(W.a)(n,Object(z.a)(t))).toISOString()}(u,f);if(console.log(typeof r),t&&a&&r&&c){o({type:O?"MODIFY_EVENT_PENDING":"CREATE_EVENT_PENDING"});var l=O._id?{query:'mutation {\n                        modifyEvent(modifyEventInput: {_id: "'.concat(O._id,'", title: "').concat(t,'", description: "').concat(a,'",\n                        price: ').concat(r,', date: "').concat(c,'"}) {\n                            _id\n                            title\n                            description\n                            date\n                            price\n                            creator{\n                                _id\n                                email\n                            }\n                        }\n                }')}:{query:'mutation {\n                createEvent(eventInput: {title: "'.concat(t,'", description: "').concat(a,'",\n                price: ').concat(r,', date: "').concat(c,'"}) {\n                    _id\n                    title\n                    description\n                    date\n                    price\n                    creator{\n                        _id\n                        email\n                    }\n                }\n            }')};h()({url:F.getGraphqlUrl(),method:"POST",data:l,headers:{"Content-Type":"application/json",Authorization:"Bearer "+i.token}}).then(function(e){if(200!==e.status&&201!==e.status&&o({type:O?"MODIFY_EVENT_REJECTED":"CREATE_EVENT_REJECTED"}),e.data)return e.data.data}).then(function(e){o({type:O?"MODIFY_EVENT_FULFILLED":"CREATE_EVENT_FULFILLED",event:e.createEvent||e.modifyEvent}),n.closeModal()}).catch(function(e){console.log(e)})}else alert("All input must be selected")}},r.a.createElement(G.g,{className:"event-modal-content__title"},r.a.createElement(G.l,{id:"title",variant:"outlined",label:"Title",value:N,onChange:function(e){return x(g,e)}})),r.a.createElement(G.g,{className:"event-modal-content__description"},r.a.createElement(G.l,{id:"description",variant:"outlined",label:"description",value:I,onChange:function(e){return x(T,e)}})),r.a.createElement(G.g,{className:"event-modal-content__date"},r.a.createElement(H.c,{utils:V.a},r.a.createElement(H.a,{keyboard:!0,clearable:!0,variant:"outlined",label:"Date",onChange:E,value:u}))),r.a.createElement(G.g,{className:"event-modal-content__time"},r.a.createElement(H.c,{utils:V.a},r.a.createElement(H.b,{keyboard:!0,variant:"outlined",keyboardIcon:r.a.createElement(M.a,null),label:"Time",onChange:b,value:f}))),r.a.createElement(G.g,{className:"event-modal-content__price"},r.a.createElement(G.l,{id:"price",variant:"outlined",label:"price",value:k,onChange:function(e){return x(w,e)}})),r.a.createElement(G.f,{className:"event-modal-content__actions-divider"}),r.a.createElement("div",{className:Q()(t.actions,"event-modal-content__actions")},r.a.createElement(G.a,{variant:"text",color:"primary",onClick:n.closeModal,style:L.primaryButton},"Cancel"),r.a.createElement(G.a,{variant:"contained",color:"primary",type:"submit",style:L.primaryButton},O._id?"Update":"Create")))))})),$=Object(w.withStyles)(function(e){return{card:Object(S.a)({},L.card),cardContent:{width:"90%",display:"flex",flexDirection:"row",justifyContent:"space-between",flexWrap:"wrap",margin:"-1rem 0"},cardContentItem:{margin:"1rem 0",flex:"1 0 200px"},cardHeader:{width:"90%",display:"flex",flexDirection:"row",justifyContent:"space-between"},cardDescription:{marginRight:"1rem"},cardActions:{width:"95%",display:"flex",justifyContent:"flex-end"}}})(function(e){var t=e.classes,n=Object(U.a)(e,["classes"]),c=!0,i=Object(a.useState)(0),o=Object(m.a)(i,2),l=o[0],s=o[1],d=Object(a.useState)("PRISTINE"),p=Object(m.a)(d,2),f=p[0],O=p[1],_=Object(a.useState)(!1),v=Object(m.a)(_,2),N=v[0],g=v[1];function S(){return(S=Object(E.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!c){e.next=3;break}return e.next=3,O("PRISTINE");case 3:if(!c){e.next=6;break}return e.next=6,O("NOT_IMPLEMENTED_YET");case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}function y(){return(y=Object(E.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!c){e.next=3;break}return e.next=3,O("PRISTINE");case 3:if(C){e.next=8;break}if(!c){e.next=7;break}return e.next=7,O("USER_NOT_LOGGED_IN");case 7:return e.abrupt("return");case 8:c&&s(10),t={query:'mutation {\n                bookEvent(eventId: "'.concat(T._id,'") {\n                  _id\n                  createdAt\n                  updatedAt\n                }\n              }')},h()({url:F.getGraphqlUrl(),method:"POST",data:t,headers:{"Content-Type":"application/json",Authorization:"Bearer "+I.token}}).then(function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed!");if(e.data)return e.data.data}).then(function(e){if(e.bookEvent&&(c&&s(100),c))return O("BOKING_SUCCESSFUL")}).catch(function(e){if(c)return O("ERROR")}).finally(function(){c&&s(0)});case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}var I=D().AuthState,T=n.event,C=Boolean(I.token),j=I.userId===T.creator._id;return Object(a.useEffect)(function(){return function(){c=!1}},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{variant:"determinate",value:l,style:{opacity:l?1:0},className:t.card}),r.a.createElement(G.b,{className:t.card},r.a.createElement(G.e,{className:t.cardHeader,title:T.title,action:j&&r.a.createElement(G.h,{"aria-label":"Edit",onClick:function(e){return g(!0)}},r.a.createElement(M.b,{fontSize:"small"}))}),r.a.createElement(G.d,{className:t.cardContent},r.a.createElement("span",{className:Q()(t.cardContentItem,t.cardDescription)},r.a.createElement(G.n,{variant:"body1",gutterBottom:!0},T.description),r.a.createElement(G.n,{variant:"caption",gutterBottom:!0},new Date(T.date).toLocaleString()),r.a.createElement(G.n,{variant:"h6"},T.price," USD ")),j&&r.a.createElement("span",{className:t.cardContentItem},r.a.createElement(G.n,{variant:"caption"},"You are the owner of this event"))),r.a.createElement(G.c,{className:t.cardActions},r.a.createElement(G.a,{variant:"text",onClick:function(){return S.apply(this,arguments)}},"Details"),!j&&r.a.createElement(G.a,{variant:"text",color:"primary",onClick:function(){return y.apply(this,arguments)},disabled:0<l&&l<100},"Book this"))),r.a.createElement(G.j,{open:N,onClose:function(e){return g(!1)}},r.a.createElement(Z,{closeModal:function(){g(!1)},eventToModify:j?T:{}})),function(){switch(f){case"ERROR":return r.a.createElement(A,{message:"Error!: Check connection or call administrator"});case"NOT_IMPLEMENTED_YET":return r.a.createElement(A,{message:"Feature not implemented yet"});case"USER_NOT_LOGGED_IN":return r.a.createElement(A,{message:"You must log in to book this event"});case"BOKING_SUCCESSFUL":return r.a.createElement(A,{message:"Event booked successfully"});default:return r.a.createElement("div",null)}}())}),ee=Object(w.withStyles)(function(e){return{card:Object(S.a)({padding:"3rem 0"},L.card),cardHeader:{textAlign:"center",width:"90%"}}})(function(e){var t=e.classes,n=D().EventsState,a=n.events.length>0?n.events.map(function(e){return r.a.createElement($,{event:e,key:e._id})}):r.a.createElement(G.b,{className:t.card},r.a.createElement(G.e,{className:t.cardHeader,title:"There are no events yet"}));return r.a.createElement("section",null,a)}),te=n(88),ne=n.n(te),ae=n(87),re=n.n(ae),ce=Object(w.withStyles)(function(e){return{card:Object(S.a)({},L.card),fab:{position:"fixed",right:"5%",bottom:"2rem",margin:e.spacing.unit}}})(function(e){var t=e.classes,n=!0,c=D().EventsDispatch,i=Object(a.useState)(0),o=Object(m.a)(i,2),l=o[0],s=o[1];Object(a.useEffect)(function(){return n&&s(10),c({type:"FETCH_EVENTS_PENDING"}),h()({url:F.getGraphqlUrl(),method:"POST",data:{query:"query {\n                events {\n                    _id\n                    title\n                    description\n                    date\n                    price\n                    creator{\n                        _id\n                        email\n                    }\n                }\n            }"},headers:{"Content-Type":"application/json"}}).then(function(e){if(200!==e.status&&201!==e.status&&c({type:"FETCH_EVENTS_REJECTED"}),e.data)return e.data.data}).then(function(e){c({type:"FETCH_EVENTS_FULFILLED",events:e.events}),n&&s(100)}).catch(function(e){c({type:"FETCH_EVENTS_REJECTED"})}).finally(function(){setTimeout(function(){n&&s(0)},300)}),function(){n=!1}},[]);var u=D().AuthState,E=Boolean(u.token),d=Object(a.useState)(!1),p=Object(m.a)(d,2),f=p[0],b=p[1];return r.a.createElement("div",{className:"events-page app-centered-page"},r.a.createElement(G.i,{variant:"determinate",value:l,style:{opacity:l?1:0}}),E&&r.a.createElement(r.a.Fragment,null,r.a.createElement(re.a,{className:t.fab,color:"primary",type:"button",onClick:function(e){return b(!0)}},r.a.createElement(ne.a,null)),r.a.createElement(G.j,{open:f,onClose:function(e){return b(!1)}},r.a.createElement(Z,{closeModal:function(){b(!1)}}))),r.a.createElement(ee,null))}),ie=Object(w.withStyles)(function(e){return{card:Object(S.a)({},L.card),cardContent:{width:"90%",display:"flex",flexDirection:"row",justifyContent:"space-between",flexWrap:"wrap",margin:"-1rem 0"},cardContentItem:{margin:"1rem 0",flex:"1 0 200px"},cardHeader:{width:"90%",display:"flex",flexDirection:"row",justifyContent:"space-between"},cardDescription:{marginRight:"1rem"},cardActions:{width:"95%",display:"flex",justifyContent:"flex-end"}}})(function(e){var t=e.classes,n=Object(U.a)(e,["classes"]),c=!0,i=Object(a.useState)(0),o=Object(m.a)(i,2),l=o[0],s=o[1],d=Object(a.useState)("PRISTINE"),p=Object(m.a)(d,2),f=p[0],b=p[1],O=D(),_=O.AuthState,v=O.BookingsDispatch,N=n.booking,g=N.event,S=Boolean(_.token),y=_.userId===N.event.creator._id;function I(){return(I=Object(E.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(S){e.next=3;break}return alert("you should log in to cancel an event"),e.abrupt("return");case 3:if(!c){e.next=6;break}return e.next=6,b("PRISTINE");case 6:c&&s(10),t={query:'mutation {\n                cancelBooking(bookingId: "'.concat(N._id,'") {\n                  _id\n                  title\n                }\n              }')},v({type:"CANCEL_BOOKINGS_PENDING"}),h()({url:F.getGraphqlUrl(),method:"POST",data:t,headers:{"Content-Type":"application/json",Authorization:"Bearer "+_.token}}).then(function(e){if(200!==e.status&&201!==e.status)throw new Error("Failed!");if(e.data)return e.data.data}).then(function(e){if(v({type:"CANCEL_BOOKINGS_FULFILLED",bookingId:N._id}),c&&s(100),c)return b("CANCEL_BOOKING_SUCCESSFUL")}).catch(function(e){if(v({type:"CANCEL_BOOKINGS_REJECTED"}),c)return b("ERROR")}).finally(function(){c&&s(0)});case 10:case"end":return e.stop()}},e)}))).apply(this,arguments)}function T(){return(T=Object(E.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!c){e.next=3;break}return e.next=3,b("PRISTINE");case 3:if(!c){e.next=6;break}return e.next=6,b("NOT_IMPLEMENTED_YET");case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}Object(a.useEffect)(function(){return function(){c=!1}},[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(G.i,{variant:"determinate",value:l,style:{opacity:l?1:0},className:t.card}),r.a.createElement(G.b,{className:t.card},r.a.createElement(G.e,{className:t.cardHeader,title:g.title,action:r.a.createElement(r.a.Fragment,null,y&&r.a.createElement(G.h,{"aria-label":"Edit"},r.a.createElement(M.b,{fontSize:"small"})),r.a.createElement(G.h,{"aria-label":"Delete",onClick:function(){return I.apply(this,arguments)}},r.a.createElement(M.c,{fontSize:"small"})))}),r.a.createElement(G.d,{className:t.cardContent},r.a.createElement("span",{className:Q()(t.cardContentItem,t.cardDescription)},r.a.createElement(G.n,{variant:"body1",gutterBottom:!0},g.description),r.a.createElement(G.n,{variant:"caption",gutterBottom:!0},new Date(g.date).toLocaleString()),r.a.createElement(G.n,{variant:"h6"},g.price," USD ")),y&&r.a.createElement("span",{className:t.cardContentItem},r.a.createElement(G.n,{variant:"caption"},"You are the owner of this event"))),r.a.createElement(G.c,{className:t.cardActions},r.a.createElement(G.a,{onClick:function(){return T.apply(this,arguments)},variant:"text"},"Details"))),function(){switch(f){case"ERROR":return r.a.createElement(A,{message:"Error!: Check connection or call administrator"});case"NOT_IMPLEMENTED_YET":return r.a.createElement(A,{message:"Feature not implemented yet"});case"CANCEL_BOOKING_SUCCESSFUL":return r.a.createElement(A,{message:"Event have been cancelled successfully"});default:return r.a.createElement("div",null)}}())}),oe=Object(w.withStyles)(function(e){return{card:Object(S.a)({padding:"3rem 0"},L.card),cardHeader:{textAlign:"center",width:"90%"}}})(function(e){var t=e.classes,n=D().BookingsState,a=n.bookings.length?n.bookings.map(function(e){return r.a.createElement(ie,{booking:e,key:e._id})}):r.a.createElement(G.b,{className:t.card},r.a.createElement(G.e,{className:t.cardHeader,title:"You haven't booked any event yet"}));return r.a.createElement("section",null,a)}),le=Object(w.withStyles)(function(e){return{card:Object(S.a)({},L.card)}})(function(e){e.classes;var t=!0,n=D(),c=n.BookingsDispatch,i=n.AuthState,o=Object(a.useState)(1),l=Object(m.a)(o,2),s=l[0],u=l[1];return Object(a.useEffect)(function(){return t&&u(10),c({type:"FETCH_BOOKINGS_PENDING"}),h()({url:F.getGraphqlUrl(),method:"POST",data:{query:"query {\n                bookings {\n                    _id\n                    createdAt\n                    event {\n                        _id\n                        title\n                        date\n                        price\n                        creator {\n                            _id\n                        }\n                    }\n                }\n            }"},headers:{"Content-Type":"application/json",Authorization:"Bearer "+i.token}}).then(function(e){if(200!==e.status&&201!==e.status&&c({type:"FETCH_BOOKINGS_REJECTED"}),e.data)return e.data.data}).then(function(e){c({type:"FETCH_BOOKINGS_FULFILLED",bookings:e.bookings}),t&&u(100)}).catch(function(e){c({type:"FETCH_BOOKINGS_REJECTED"})}).finally(function(){setTimeout(function(){t&&u(0)},300)}),function(){t=!1}},[]),r.a.createElement("div",{className:"bookins-page .app-centered-page"},r.a.createElement(G.i,{variant:"determinate",value:s,style:{opacity:s?1:0}}),r.a.createElement(oe,null))}),se=(n(5622),function(){var e=D().UIDisptch;return r.a.createElement("button",{className:"drawer-toggle-button",onClick:function(){e({type:"UI_TOGGLE_SIDE_NAV"})}},r.a.createElement("div",{className:"drawer-toggle-button__line"}),r.a.createElement("div",{className:"drawer-toggle-button__line"}),r.a.createElement("div",{className:"drawer-toggle-button__line"}))}),ue=function(){var e=D().AuthState;return r.a.createElement("nav",null,r.a.createElement("ul",null,!e.token&&r.a.createElement("li",null,r.a.createElement(o.b,{to:"/auth"},"Log In")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/events"},"Events")),e.token&&r.a.createElement("li",null,r.a.createElement(o.b,{to:"/bookings"},"Bookings"))))},Ee=n(40),me=n.n(Ee),de=n(91),pe=n.n(de),fe=n(89),be=n.n(fe),Oe=n(69),he=n.n(Oe),_e=n(90),ve=n.n(_e),Ne=(n(5628),Object(w.withStyles)(function(e){return{root:{flexGrow:1},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20}}})(function(e){e.classes;var t=D(),n=t.AuthState,c=t.AuthDispatch,i=Boolean(n.token),o=Object(a.useState)(),l=Object(m.a)(o,2),s=l[0],d=l[1],p=Boolean(s),f=Object(a.useState)("PRISTINE"),b=Object(m.a)(f,2),O=b[0],h=b[1];function _(){return(_=Object(E.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h("PRISTINE");case 2:return e.next=4,c({type:"AUTH_LOG_OUT"});case 4:return N(),e.next=7,h("LOGOUT_SUCCESSFUL");case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}function v(){return(v=Object(E.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h("PRISTINE");case 2:return N(),e.next=5,h("NOT_IMPLEMENTED_YET");case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}function N(){d(null)}var g=r.a.createElement(be.a,{anchorEl:s,open:p,onClose:N},r.a.createElement(he.a,{onClick:function(){return v.apply(this,arguments)}},"Profile"),r.a.createElement(he.a,{onClick:function(){return _.apply(this,arguments)}},"Logout"));return r.a.createElement(r.a.Fragment,null,r.a.createElement(ve.a,{className:"main-navigation"},r.a.createElement(G.m,{className:"main-navigation__toolbar"},r.a.createElement("span",{className:"main-navigation__logo"},r.a.createElement("span",{className:"main-navigation__button"},r.a.createElement(se,null)),r.a.createElement("h1",null,"EasyEvent")),r.a.createElement("span",{className:"main-navigation__items"},r.a.createElement("span",{className:"main-navigation__links"},r.a.createElement(ue,null)),i&&r.a.createElement(me.a,{onClick:function(e){d(e.currentTarget)}},r.a.createElement(pe.a,{className:"account-circle"}))),g)),function(){switch(O){case"ERROR":return r.a.createElement(A,{message:"Error!: Check connection or call administrator"});case"NOT_IMPLEMENTED_YET":return r.a.createElement(A,{message:"Feature not implemented yet",duration:3e3});case"LOGOUT_SUCCESSFUL":return r.a.createElement(A,{message:"You have logout successfully",duration:3e3});default:return r.a.createElement("div",null)}}())})),ge=(n(5633),n(5634),function(){var e=["side-drawer"];return D().UIState.isSideDrawOpen&&e.push("side-drawer__open"),r.a.createElement("span",{className:e.join(" ")},r.a.createElement(ue,null))}),Se=(n(5635),function(){var e=D().UIDisptch;return r.a.createElement("div",{className:"backdrop",onClick:function(){e({type:"UI_TOGGLE_SIDE_NAV"})}})});var ye=function(){var e,t=D(),n=t.UIState,a=t.AuthState,c=Boolean(a.token);return n.isSideDrawOpen&&(e=r.a.createElement(Se,null)),r.a.createElement("div",{className:"main-content"},r.a.createElement(o.a,null,r.a.createElement(Ne,null),r.a.createElement(ge,null),e,r.a.createElement("main",null,r.a.createElement(l.d,null,c&&r.a.createElement(l.a,{from:"/",to:"/events",exact:!0}),c&&r.a.createElement(l.a,{from:"/auth",to:"/events",exact:!0}),!c&&r.a.createElement(l.b,{path:"/auth",component:P}),c&&r.a.createElement(l.b,{path:"/bookings",component:le}),r.a.createElement(l.b,{path:"/events",component:ce}),!c&&r.a.createElement(l.a,{to:"/auth"})))))};i.a.render(r.a.createElement(w.MuiThemeProvider,{theme:x},r.a.createElement(function(e){var t=e.children,n=Object(a.useReducer)(v,_),c=Object(m.a)(n,2),i=c[0],o=c[1],l=Object(a.useReducer)(g,N),s=Object(m.a)(l,2),u=s[0],E=s[1],d=Object(a.useReducer)(T,I),p=Object(m.a)(d,2),f=p[0],b=p[1],O=Object(a.useReducer)(j,C),h=Object(m.a)(O,2),S={UIState:i,UIDisptch:o,AuthState:u,AuthDispatch:E,EventsState:f,EventsDispatch:b,BookingsState:h[0],BookingsDispatch:h[1]};return r.a.createElement(k.Provider,{value:S},t)},null,r.a.createElement(ye,null))),document.getElementById("root"))}},[[5448,1,2]]]);
//# sourceMappingURL=main.aab653ee.chunk.js.map