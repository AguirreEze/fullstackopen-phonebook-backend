import{j as h,a as m,r as i,R as j,b as I}from"./vendor.a7bcea1a.js";const $=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}};$();const o=h.exports.jsx,d=h.exports.jsxs,x=h.exports.Fragment,f=({handler:e,value:n,name:r})=>d("div",{children:[d("label",{htmlFor:r,children:[r,": "]}),o("input",{name:r,onChange:e,value:n})]}),M=()=>m.get("https://fullstack-bootcamp-phonebook.herokuapp.com/api/persons").then(e=>{const{data:n}=e;return n}),O=e=>m.post("https://fullstack-bootcamp-phonebook.herokuapp.com/api/persons",e),A=e=>m.delete(`https://fullstack-bootcamp-phonebook.herokuapp.com/api/persons/${e}`),R=(e,n)=>m.put(`https://fullstack-bootcamp-phonebook.herokuapp.com/api/persons/${e}`,n).then(r=>{const{data:l}=r;return l}),D=({data:e,message:n})=>{const[r,l]=i.exports.useState(!1),t=()=>{window.confirm(`Delete ${e.name}`)&&(A(e.id).catch(()=>n(`Information of ${e.name} was already removed from server`)),l(!0))};return r?o(x,{}):d("li",{children:[d("span",{children:[e.name," ",e.number," "]}),o("button",{onClick:t,children:"delete"})]})},E=({list:e,message:n})=>o("ul",{children:e.map(r=>o(D,{data:r,message:n},r.name))}),q=({detail:e})=>e===null?null:o("div",{className:"ok",children:e}),B=()=>{const[e,n]=i.exports.useState([]),[r,l]=i.exports.useState(""),[t,s]=i.exports.useState(""),[u,v]=i.exports.useState(""),[y,b]=i.exports.useState(null);i.exports.useEffect(()=>{M().then(a=>n(a)).catch(console.log)},[]);const N=a=>{v(a.target.value)},P=a=>{l(a.target.value)},L=a=>{s(a.target.value)},S=a=>{a.preventDefault();const c={name:r,number:t,id:e.length+1},g=e.filter(w=>w.name.toLowerCase()===c.name.toLowerCase());g.length===0?O(c).then(n([...e,c])).then(()=>p(`Added ${c.name}`)).catch(console.log):confirm(`${c.name} is already added to phonebook, replace the old number with a new one?`)&&R(g[0].id,c).then(w=>{n(e.map(k=>k.name.toLowerCase()===c.name.toLowerCase()?c:k))}).then(p(`Updated Information of  ${c.name}`)).catch(console.log),l(""),s("")},p=a=>{b(a),setTimeout(()=>b(null),5e3)},C=new RegExp(u,"gi"),F=e.filter(a=>C.test(a.name));return d(x,{children:[d("form",{children:[o("h1",{children:"Phonebook"}),o(q,{detail:y}),o(f,{handler:N,value:u,name:"filter"}),o("h3",{children:"Add a new Phone"}),o(f,{handler:P,value:r,name:"name"}),o(f,{handler:L,value:t,name:"number"}),o("button",{type:"submit",onClick:S,children:"Add Number"})]}),o("h2",{children:"Numbers"}),o(E,{list:F,message:p})]})};j.render(o(I.StrictMode,{children:o(B,{})}),document.getElementById("root"));
