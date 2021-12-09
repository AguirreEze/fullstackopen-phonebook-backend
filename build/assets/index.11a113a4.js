import{j as p,a as f,r as i,R as j,b as O}from"./vendor.a7bcea1a.js";const k=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}};k();const n=p.exports.jsx,d=p.exports.jsxs,x=p.exports.Fragment,g=({handler:e,value:r,name:o})=>d("div",{children:[d("label",{htmlFor:o,children:[o,": "]}),n("input",{name:o,onChange:e,value:r})]}),b="http://localhost:3001",C=()=>f.get(`${b}/api/persons`).then(e=>{const{data:r}=e;return r}),I=e=>f.post(`${b}/api/persons`,e),M=e=>f.delete(`${b}/api/persons/${e}`),A=({data:e,message:r})=>{const[o,l]=i.exports.useState(!1),t=()=>{window.confirm(`Delete ${e.name}`)&&(M(e.id).catch(()=>r(`Information of ${e.name} was already removed from server`)),l(!0))};return o?n(x,{}):d("li",{children:[d("span",{children:[e.name," ",e.phone," "]}),n("button",{onClick:t,children:"delete"})]})},R=({list:e,message:r})=>n("ul",{children:e.map(o=>n(A,{data:o,message:r},o.id))}),D=({detail:e})=>e===null?null:n("div",{className:"ok",children:e}),E=()=>{const[e,r]=i.exports.useState([]),[o,l]=i.exports.useState(""),[t,s]=i.exports.useState(""),[c,w]=i.exports.useState(""),[y,v]=i.exports.useState(null);i.exports.useEffect(()=>{C().then(a=>r(a)).catch(console.log)},[]);const N=a=>{w(a.target.value)},P=a=>{l(a.target.value)},L=a=>{s(a.target.value)},S=a=>{a.preventDefault();const m={name:o,phone:t};e.filter(u=>u.name.toLowerCase()===m.name.toLowerCase()).length===0?I(m).then(u=>r([...e,u.data])).then(()=>h(`Added ${m.name}`)).catch(u=>h(u.response.data.error)):alert(`${m.name} is already on the phonebook`),l(""),s("")},h=a=>{v(a),setTimeout(()=>v(null),5e3)},F=new RegExp(c,"gi"),$=e.filter(a=>F.test(a.name));return d(x,{children:[d("form",{children:[n("h1",{children:"Phonebook"}),n(D,{detail:y}),n(g,{handler:N,value:c,name:"filter"}),n("h3",{children:"Add a new Phone"}),n(g,{handler:P,value:o,name:"name"}),n(g,{handler:L,value:t,name:"number"}),n("button",{type:"submit",onClick:S,children:"Add Number"})]}),n("h2",{children:"Numbers"}),n(R,{list:$,message:h})]})};j.render(n(O.StrictMode,{children:n(E,{})}),document.getElementById("root"));