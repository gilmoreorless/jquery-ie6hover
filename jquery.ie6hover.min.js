/*
 * jQuery IE6 hover support plug-in v1.1.0
 * Add support for the :hover CSS pseudo-selector to IE6
 *
 * @requires jQuery v1.3 or later
 *
 * Copyright (c) 2010 Gilmore Davidson
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function(a){a.extend({ie6hover:function(o){if(!a.browser.msie||a.browser.version!="6.0"){return}var k=o===true?"live":"bind",A=/^1\.[4-9]/.test(a.fn.jquery),m=A||!o?"mouseenter":"mouseover",b=A||!o?"mouseleave":"mouseout",h=document.styleSheets,c=/(.*?)(:hover)\b/g,D=/\bA([#\.].*)*:hover\b/ig,y=/\.(\S+?)\b/ig,r="hover-ie6",l="",f=[],g={_default:r},u,v,w,t,x,C,d,p,n,q,E,s,z;if(!h.length){return}for(w=0,C=h.length;w<C;w++){d=h[w];try{p=d.rules}catch(B){continue}if(!p||!p.length){continue}for(t=0,x=p.length;t<x;t++){n=p[t];q=n.selectorText;E=[];s="";c.lastIndex=0;D.lastIndex=0;if(c.test(q)&&!D.test(q)){l=r;u="";c.lastIndex=0;while((v=c.exec(q))){z=c.lastIndex;u+=v[1];f.push(u);s=v[1];y.lastIndex=0;s=s.replace(y,function(e,i){l=i+"-"+r;return""})+"."+l;if(l!==r){g[u]=l}E.push(s)}if(z<q.length){E.push(q.substr(z))}q=E.join("");d.addRule(q,n.style.cssText,t);t++;x++;a.ie6hover.selectors.css.push([q,n.style.cssText])}}}if(f.length){if(f.length>1){f=(function(F){for(var G=[],H={},j=0,e=F.length,I;j<e;j++){I=F[j];if(!H[I]){H[I]=true;G.push(I)}}return G})(f)}a.ie6hover.selectors.jQuery=f;a(function(){a.each(f,function(F,j){var e=g[j]||g._default;a(j)[k](m,function(){a(this).addClass(e)})[k](b,function(){a(this).removeClass(e)})})})}}});a.ie6hover.selectors={css:[],jQuery:[]}})(jQuery);