import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as r}from"./assets/vendor-NC6Y6RJc.js";const m=document.querySelector(".form");m.addEventListener("submit",c);function c(t){t.preventDefault();const{delay:s,state:o}=t.currentTarget,i=Number(s.value),e=o.value;u(i,e)}function u(t,s){const o=s==="fulfilled";new Promise((e,n)=>{setTimeout(()=>{o?e(t):n(t)},t)}).then(e=>{r.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{r.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})}
//# sourceMappingURL=2-snackbar.js.map
