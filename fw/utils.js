function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return "";
}

function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

function getOr(val, orval) {
    if(typeof(val)!="undefined" && val!=null) return val;
    return orval;
}

function formatFilesize(byte) {
    var s = byte;
    var e = "b";
    if(s>1024) {s /= 1024;e = "kb";}
    if(s>1024) {s /= 1024;e = "mb";}
    if(s>1024) {s /= 1024;e = "gb";}
    if(s>1024) {s /= 1024;e = "tb";}

    return Math.round(s)+e;;
}

/**
 * erzeugt ein Passwort aus verschiedenen Clustern. Sonderzeichen können angeschaltet werden
 */
function genPW(anz, sonderzeichen) {

    if(typeof(anz)=="undefined") anz = 8;
    if(typeof(sonderzeichen)=="undefined") sonderzeichen = false;

    var cluster = [
        ['2','3','4','5','6','7','8','9'],
        ['a','b','c','d','e','f','g','h','k','m','n','p','q','r','s','t','u','v','w','x','y','z'],
        ['A','B','C','D','E','F','G','H','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z']
    ];
    if(sonderzeichen) {
        cluster.push(["!", "§", '$', '%', '&', '/','(', ')', '*','?','+','#',':',';','-']);
    }
    var chars = [];
    for(var i=0;i<cluster.length;i++) {
        for(var j=0;j<cluster[i].length;j++) {
            chars.push(cluster[i][j]);
        }
    }

    do {
        pw = "";
        for(var i=0;i<anz;i++) {
            pw += chars[ Math.floor(Math.random()*chars.length) ];
        }
        var ok = true;

        for(var i=0;i<cluster.length;i++) {
            var cok = false;
            for(var j=0;j<cluster[i].length;j++) {
                if(pw.indexOf(cluster[i][j])!=-1) {
                    cok = true;
                    break;
                }
            }
            if(cok==false) {
                ok = false;
                break;
            }
        }

    } while(!ok);

    return pw;
}

function newid() {
	var R = Math.random()+"";
	R = R.replace(".","");
    var id = (new Date()).getTime()+"-"+R;
    return id;
}

function newcode(len) {
    var c = "";
    for(var i=0;i<len;i++) {
        c += Math.floor(Math.random()*10);
    }
    return c;
    //return Math.round(Math.random()*90000+10000);
}

	
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function add0(x) {
	if(x<10) return "0"+x;
	return x;
}

function time() {
    return (new Date()).getDate();
}

function forceInt(x) {
	x = x *1;
	if(isNaN(x) || typeof(x)!="number") {return 0;}
	return x*1;
}

function cl(X) {
	console.log(X);
	cl = console.log;
}


function formatDateForm2de(dat) {
    if(dat.indexOf(".")!=-1) return dat;
    var x = dat.split("-");
    return x[2]+"."+x[1]+"."+x[0];
}

function date8(ts) {
    if(typeof(ts)=="undefined") {
        var D = new Date();
    } else {
        var D = new Date(ts);
    }
    var dat = D.getFullYear()+""+add0(D.getMonth()+1)+""+add0(D.getDate());
    return dat;
}

function datePlus(plus) {
	var today = new Date()
	var tomorrow = new Date(today)
	tomorrow.setDate(tomorrow.getDate() + plus);
	return tomorrow;
}

function dateDe(ts) {
    if(typeof(ts)=="undefined") {
        var D = new Date();
    } else {
        var D = new Date(ts);
    }
    var dat = add0(D.getDate())+"."+add0(D.getMonth()+1)+"."+D.getFullYear();
    return dat;
}
function dateEn(ts) {
    if(typeof(ts)=="undefined") {
        var D = new Date();
    } else {
        var D = new Date(ts);
    }
    var dat = D.getFullYear()+"-"+add0(D.getMonth()+1)+"-"+add0(D.getDate());
    return dat;
}


function now() {
    var D = new Date();
    return today()+" "+add0(D.getHours())+":"+add0(D.getMinutes())+":"+add0(D.getSeconds());
}

function today() {
    var D = new Date();
    var dat = D.getFullYear()+"-"+ add0(D.getMonth()+1)+"-"+add0(D.getDate());
    return dat;
}

function dateiso(en) {
    var D = en.split("-");
    return D[2]+"."+D[1]+"."+D[0];
}

function stopWatch(T) {
	var dat = new Date();
	if(typeof(T)=="undefined") {
		return dat.getTime();
	} else {
		return (dat.getTime()-T)/1000;
	}
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function wochentag(ts) {
	var D = new Date(ts);
	var wt = D.getDay();
	//var wts = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    var wts = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
	return wts[wt];
}

function wochentagLong(ts) {
	var D = new Date(ts);
	var wt = D.getDay();
	//var wts = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var wts = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
	return wts[wt];
}

function monatsnameKurz(m) {
    
	switch(m) {
		case 1: return "Jan";
		case 2: return "Feb";
		case 3: return "Mär";
		case 4: return "Apr";
		case 5: return "Mai";
		case 6: return "Jun";
		case 7: return "Jul";
		case 8: return "Aug";
		case 9: return "Sep";
		case 10: return "Okt";
		case 11: return "Nov";
		case 12: return "Dez";
	}
}

function monatsname(m) {
    
	switch(m) {
		case 1: return "Januar";
		case 2: return "Februar";
		case 3: return "März";
		case 4: return "April";
		case 5: return "Mai";
		case 6: return "Juni";
		case 7: return "Juli";
		case 8: return "August";
		case 9: return "September";
		case 10: return "Oktober";
		case 11: return "November";
		case 12: return "Dezember";
	}
	
	switch(m) {
		case 1: return "January";
		case 2: return "February";
		case 3: return "March";
		case 4: return "April";
		case 5: return "May";
		case 6: return "June";
		case 7: return "July";
		case 8: return "August";
		case 9: return "September";
		case 10: return "October";
		case 11: return "November";
		case 12: return "December";
	}
}

function hmi(s) {
    var h = Math.floor(s/60/60);
    s = s - h*60*60;
    var m = Math.floor(s/60);
    s = s - m*60;
    var i = Math.floor(s);
    if(m<10) m = "0"+m;
    if(i<10) i = "0"+i;
    return h+":"+m+":"+i;
}

function hm(ts) {
    var D = new Date(ts);
    var hh = D.getHours();
    var ii = D.getMinutes();
    if(ii<10) ii="0"+ii;
    return hh+":"+ii;
}

function deDatum(ts) {
	var D = new Date(ts);
	var dd = D.getDate();
	var mm = D.getMonth()+1;
	var yyyy = D.getFullYear();
	
	if(dd<10) dd="0"+dd;
	if(mm<10) mm="0"+mm;
	
	return dd+"."+mm+"."+yyyy;
}

function enDatum(ts) {
    var D = new Date(ts);
    var dd = D.getDate();
    var mm = D.getMonth()+1;
    var yyyy = D.getFullYear();

    if(dd<10) dd="0"+dd;
    if(mm<10) mm="0"+mm;

    return yyyy+"-"+mm+"-"+dd;
}

function today() {
    return enDatum( (new Date()).getTime() );
}

function formatHumanDate(ts) {
	var jetzt = (new Date()).getTime();
	var jetztTS = new Date();
	var gesternTS = new Date(jetzt-1000*60*60*24);
	var vorgesternTS = new Date(jetzt-1000*60*60*24*2);
	if(typeof(ts)=="string") ts = parseInt(ts);
	var D = new Date(ts);
	//console.log(D);
	var dd = D.getDate();
	var mm = D.getMonth()+1;
	var yyyy = D.getFullYear();
	
	var hh = D.getHours();
	var ii = D.getMinutes();
	
	//console.log([dd,mm,yyyy,hh,ii]);
	
	if((jetzt-ts)/1000/60<1) return "gerade eben";
	else if((jetzt-ts)/1000/60<5) return "vor wenigen Minuten";
	else if((jetzt-ts)/1000/60<55) return "vor kurzem";
	else if((jetzt-ts)/1000/60<80) return "vor etwa einer Stunde";
	else if((jetzt-ts)/1000/60<130) return "vor etwa zwei Stunden";
	else if(jetztTS.getDate()==dd) return "heute";
	else if(gesternTS.getDate()==dd) return "gestern";
	else if(vorgesternTS.getDate()==dd) return "vorgestern";
	
	if(dd<10) dd="0"+dd;
	if(mm<10) mm="0"+mm;
	
	if(ii<10) ii="0"+ii;
	return dd+"."+mm+"."+yyyy+" "+hh+":"+ii;
}

function deDatumZeit(ts, sec) {
	if(typeof(sec)=="undefined") sec = false;
    if(typeof(ts)=="undefined") var D = new Date();
	else var D = new Date(ts);
	var dd = D.getDate();
	var mm = D.getMonth()+1;
	var yyyy = D.getFullYear();
	
	var hh = D.getHours();
	var ii = D.getMinutes();
	var ss = D.getSeconds();
	
	if(dd<10) dd="0"+dd;
	if(mm<10) mm="0"+mm;
	
	if(ii<10) ii="0"+ii;
	if(ss<10) ss="0"+ss;
	
	return dd+"."+mm+"."+yyyy+" "+hh+":"+ii+(sec ? ':'+ss : '');
	
}


function enDatumZeit(ts) {
	var D = new Date(ts);
	var dd = D.getDate();
	var mm = D.getMonth()+1;
	var yyyy = D.getFullYear();
	
	var hh = D.getHours();
	var ii = D.getMinutes();
	
	if(dd<10) dd="0"+dd;
	if(mm<10) mm="0"+mm;
	
	if(ii<10) ii="0"+ii;
	
	return mm+"/"+dd+"/"+yyyy+" "+hh+":"+ii;
	
}

function getTimestamp(ts) {
    if(typeof(ts)=="undefined") var D = new Date();
    else var D = new Date(ts);

    var dd = D.getDate();
    var mm = D.getMonth()+1;
    var yyyy = D.getFullYear();

    var hh = D.getHours();
    var ii = D.getMinutes();
    var ss = D.getSeconds();

    if(dd<10) dd="0"+dd;
    if(mm<10) mm="0"+mm;


    if(hh<10) hh="0"+hh;
    if(ii<10) ii="0"+ii;
    if(ss<10) ss="0"+ss;

    return yyyy+""+mm+""+dd+""+hh+""+ii+""+ss;
}


// {{{	MD5
/*
 *  md5.js 1.0b 27/06/96
 *
 * Javascript implementation of the RSA Data Security, Inc. MD5
 * Message-Digest Algorithm.
 *
 * Copyright (c) 1996 Henri Torgemane. All Rights Reserved.
 *
 * Permission to use, copy, modify, and distribute this software
 * and its documentation for any purposes and without
 * fee is hereby granted provided that this copyright notice
 * appears in all copies.
 *
 * Of course, this soft is provided "as is" without express or implied
 * warranty of any kind.
 *
 *
 * Modified with german comments and some information about collisions.
 * (Ralf Mieke, ralf@miekenet.de, http://mieke.home.pages.de)
 */
function array(n) {
  for(i=0;i<n;i++) this[i]=0;
  this.length=n;
}


function integer(n) { return n%(0xffffffff+1); }

function shr(a,b) {
  a=integer(a);
  b=integer(b);
  if (a-0x80000000>=0) {
    a=a%0x80000000;
    a>>=b;
    a+=0x40000000>>(b-1);
  } else
    a>>=b;
  return a;
}

function shl1(a) {
  a=a%0x80000000;
  if (a&0x40000000==0x40000000)
  {
    a-=0x40000000;
    a*=2;
    a+=0x80000000;
  } else
    a*=2;
  return a;
}

function shl(a,b) {
  a=integer(a);
  b=integer(b);
  for (var i=0;i<b;i++) a=shl1(a);
  return a;
}

function and(a,b) {
  a=integer(a);
  b=integer(b);
  var t1=(a-0x80000000);
  var t2=(b-0x80000000);
  if (t1>=0)
    if (t2>=0)
      return ((t1&t2)+0x80000000);
    else
      return (t1&b);
  else
    if (t2>=0)
      return (a&t2);
    else
      return (a&b);
}

function or(a,b) {
  a=integer(a);
  b=integer(b);
  var t1=(a-0x80000000);
  var t2=(b-0x80000000);
  if (t1>=0)
    if (t2>=0)
      return ((t1|t2)+0x80000000);
    else
      return ((t1|b)+0x80000000);
  else
    if (t2>=0)
      return ((a|t2)+0x80000000);
    else
      return (a|b);
}

function xor(a,b) {
  a=integer(a);
  b=integer(b);
  var t1=(a-0x80000000);
  var t2=(b-0x80000000);
  if (t1>=0)
    if (t2>=0)
      return (t1^t2);
    else
      return ((t1^b)+0x80000000);
  else
    if (t2>=0)
      return ((a^t2)+0x80000000);
    else
      return (a^b);
}

function not(a) {
  a=integer(a);
  return (0xffffffff-a);
}

/* Beginn des Algorithmus */

    var state = new array(4);
    var count = new array(2);
        count[0] = 0;
        count[1] = 0;
    var buffer = new array(64);
    var transformBuffer = new array(16);
    var digestBits = new array(16);

    var S11 = 7;
    var S12 = 12;
    var S13 = 17;
    var S14 = 22;
    var S21 = 5;
    var S22 = 9;
    var S23 = 14;
    var S24 = 20;
    var S31 = 4;
    var S32 = 11;
    var S33 = 16;
    var S34 = 23;
    var S41 = 6;
    var S42 = 10;
    var S43 = 15;
    var S44 = 21;

    function F(x,y,z) {
        return or(and(x,y),and(not(x),z));
    }

    function G(x,y,z) {
        return or(and(x,z),and(y,not(z)));
    }

    function H(x,y,z) {
        return xor(xor(x,y),z);
    }

    function I(x,y,z) {
        return xor(y ,or(x , not(z)));
    }

    function rotateLeft(a,n) {
        return or(shl(a, n),(shr(a,(32 - n))));
    }

    function FF(a,b,c,d,x,s,ac) {
        a = a+F(b, c, d) + x + ac;
        a = rotateLeft(a, s);
        a = a+b;
        return a;
    }

    function GG(a,b,c,d,x,s,ac) {
        a = a+G(b, c, d) +x + ac;
        a = rotateLeft(a, s);
        a = a+b;
        return a;
    }

    function HH(a,b,c,d,x,s,ac) {
        a = a+H(b, c, d) + x + ac;
        a = rotateLeft(a, s);
        a = a+b;
        return a;
    }

    function II(a,b,c,d,x,s,ac) {
        a = a+I(b, c, d) + x + ac;
        a = rotateLeft(a, s);
        a = a+b;
        return a;
    }

    function transform(buf,offset) {
        var a=0, b=0, c=0, d=0;
        var x = transformBuffer;

        a = state[0];
        b = state[1];
        c = state[2];
        d = state[3];

        for (i = 0; i < 16; i++) {
            x[i] = and(buf[i*4+offset],0xff);
            for (j = 1; j < 4; j++) {
                x[i]+=shl(and(buf[i*4+j+offset] ,0xff), j * 8);
            }
        }

        /* Runde 1 */
        a = FF ( a, b, c, d, x[ 0], S11, 0xd76aa478); /* 1 */
        d = FF ( d, a, b, c, x[ 1], S12, 0xe8c7b756); /* 2 */
        c = FF ( c, d, a, b, x[ 2], S13, 0x242070db); /* 3 */
        b = FF ( b, c, d, a, x[ 3], S14, 0xc1bdceee); /* 4 */
        a = FF ( a, b, c, d, x[ 4], S11, 0xf57c0faf); /* 5 */
        d = FF ( d, a, b, c, x[ 5], S12, 0x4787c62a); /* 6 */
        c = FF ( c, d, a, b, x[ 6], S13, 0xa8304613); /* 7 */
        b = FF ( b, c, d, a, x[ 7], S14, 0xfd469501); /* 8 */
        a = FF ( a, b, c, d, x[ 8], S11, 0x698098d8); /* 9 */
        d = FF ( d, a, b, c, x[ 9], S12, 0x8b44f7af); /* 10 */
        c = FF ( c, d, a, b, x[10], S13, 0xffff5bb1); /* 11 */
        b = FF ( b, c, d, a, x[11], S14, 0x895cd7be); /* 12 */
        a = FF ( a, b, c, d, x[12], S11, 0x6b901122); /* 13 */
        d = FF ( d, a, b, c, x[13], S12, 0xfd987193); /* 14 */
        c = FF ( c, d, a, b, x[14], S13, 0xa679438e); /* 15 */
        b = FF ( b, c, d, a, x[15], S14, 0x49b40821); /* 16 */

        /* Runde 2 */
        a = GG ( a, b, c, d, x[ 1], S21, 0xf61e2562); /* 17 */
        d = GG ( d, a, b, c, x[ 6], S22, 0xc040b340); /* 18 */
        c = GG ( c, d, a, b, x[11], S23, 0x265e5a51); /* 19 */
        b = GG ( b, c, d, a, x[ 0], S24, 0xe9b6c7aa); /* 20 */
        a = GG ( a, b, c, d, x[ 5], S21, 0xd62f105d); /* 21 */
        d = GG ( d, a, b, c, x[10], S22,  0x2441453); /* 22 */
        c = GG ( c, d, a, b, x[15], S23, 0xd8a1e681); /* 23 */
        b = GG ( b, c, d, a, x[ 4], S24, 0xe7d3fbc8); /* 24 */
        a = GG ( a, b, c, d, x[ 9], S21, 0x21e1cde6); /* 25 */
        d = GG ( d, a, b, c, x[14], S22, 0xc33707d6); /* 26 */
        c = GG ( c, d, a, b, x[ 3], S23, 0xf4d50d87); /* 27 */
        b = GG ( b, c, d, a, x[ 8], S24, 0x455a14ed); /* 28 */
        a = GG ( a, b, c, d, x[13], S21, 0xa9e3e905); /* 29 */
        d = GG ( d, a, b, c, x[ 2], S22, 0xfcefa3f8); /* 30 */
        c = GG ( c, d, a, b, x[ 7], S23, 0x676f02d9); /* 31 */
        b = GG ( b, c, d, a, x[12], S24, 0x8d2a4c8a); /* 32 */

        /* Runde 3 */
        a = HH ( a, b, c, d, x[ 5], S31, 0xfffa3942); /* 33 */
        d = HH ( d, a, b, c, x[ 8], S32, 0x8771f681); /* 34 */
        c = HH ( c, d, a, b, x[11], S33, 0x6d9d6122); /* 35 */
        b = HH ( b, c, d, a, x[14], S34, 0xfde5380c); /* 36 */
        a = HH ( a, b, c, d, x[ 1], S31, 0xa4beea44); /* 37 */
        d = HH ( d, a, b, c, x[ 4], S32, 0x4bdecfa9); /* 38 */
        c = HH ( c, d, a, b, x[ 7], S33, 0xf6bb4b60); /* 39 */
        b = HH ( b, c, d, a, x[10], S34, 0xbebfbc70); /* 40 */
        a = HH ( a, b, c, d, x[13], S31, 0x289b7ec6); /* 41 */
        d = HH ( d, a, b, c, x[ 0], S32, 0xeaa127fa); /* 42 */
        c = HH ( c, d, a, b, x[ 3], S33, 0xd4ef3085); /* 43 */
        b = HH ( b, c, d, a, x[ 6], S34,  0x4881d05); /* 44 */
        a = HH ( a, b, c, d, x[ 9], S31, 0xd9d4d039); /* 45 */
        d = HH ( d, a, b, c, x[12], S32, 0xe6db99e5); /* 46 */
        c = HH ( c, d, a, b, x[15], S33, 0x1fa27cf8); /* 47 */
        b = HH ( b, c, d, a, x[ 2], S34, 0xc4ac5665); /* 48 */

        /* Runde 4 */
        a = II ( a, b, c, d, x[ 0], S41, 0xf4292244); /* 49 */
        d = II ( d, a, b, c, x[ 7], S42, 0x432aff97); /* 50 */
        c = II ( c, d, a, b, x[14], S43, 0xab9423a7); /* 51 */
        b = II ( b, c, d, a, x[ 5], S44, 0xfc93a039); /* 52 */
        a = II ( a, b, c, d, x[12], S41, 0x655b59c3); /* 53 */
        d = II ( d, a, b, c, x[ 3], S42, 0x8f0ccc92); /* 54 */
        c = II ( c, d, a, b, x[10], S43, 0xffeff47d); /* 55 */
        b = II ( b, c, d, a, x[ 1], S44, 0x85845dd1); /* 56 */
        a = II ( a, b, c, d, x[ 8], S41, 0x6fa87e4f); /* 57 */
        d = II ( d, a, b, c, x[15], S42, 0xfe2ce6e0); /* 58 */
        c = II ( c, d, a, b, x[ 6], S43, 0xa3014314); /* 59 */
        b = II ( b, c, d, a, x[13], S44, 0x4e0811a1); /* 60 */
        a = II ( a, b, c, d, x[ 4], S41, 0xf7537e82); /* 61 */
        d = II ( d, a, b, c, x[11], S42, 0xbd3af235); /* 62 */
        c = II ( c, d, a, b, x[ 2], S43, 0x2ad7d2bb); /* 63 */
        b = II ( b, c, d, a, x[ 9], S44, 0xeb86d391); /* 64 */

        state[0] +=a;
        state[1] +=b;
        state[2] +=c;
        state[3] +=d;

    }

    function initmd5() {
        count[0]=count[1] = 0;
        state[0] = 0x67452301;
        state[1] = 0xefcdab89;
        state[2] = 0x98badcfe;
        state[3] = 0x10325476;
        for (i = 0; i < digestBits.length; i++)
            digestBits[i] = 0;
    }

    function update(b) {
        var index,i;

        index = and(shr(count[0],3) , 0x3f);
        if (count[0]<0xffffffff-7)
          count[0] += 8;
        else {
          count[1]++;
          count[0]-=0xffffffff+1;
          count[0]+=8;
        }
        buffer[index] = and(b,0xff);
        if (index  >= 63) {
            transform(buffer, 0);
        }
    }

    function finish() {
        var bits = new array(8);
        var        padding;
        var        i=0, index=0, padLen=0;

        for (i = 0; i < 4; i++) {
            bits[i] = and(shr(count[0],(i * 8)), 0xff);
        }
        for (i = 0; i < 4; i++) {
            bits[i+4]=and(shr(count[1],(i * 8)), 0xff);
        }
        index = and(shr(count[0], 3) ,0x3f);
        padLen = (index < 56) ? (56 - index) : (120 - index);
        padding = new array(64);
        padding[0] = 0x80;
        for (i=0;i<padLen;i++)
          update(padding[i]);
        for (i=0;i<8;i++)
          update(bits[i]);

        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                digestBits[i*4+j] = and(shr(state[i], (j * 8)) , 0xff);
            }
        }
    }

/* Ende des MD5 Algorithmus */

function hexa(n) {
 var hexa_h = "0123456789abcdef";
 var hexa_c="";
 var hexa_m=n;
 for (hexa_i=0;hexa_i<8;hexa_i++) {
   hexa_c=hexa_h.charAt(Math.abs(hexa_m)%16)+hexa_c;
   hexa_m=Math.floor(hexa_m/16);
 }
 return hexa_c;
}


var ascii="01234567890123456789012345678901" +
          " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
          "[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

function MD5(nachricht)
{
	nachricht = ""+nachricht;
 var l,s,k,ka,kb,kc,kd;

 initmd5();
 for (k=0;k<nachricht.length;k++) {
   l=nachricht.charAt(k);
   update(ascii.lastIndexOf(l));
 }
 finish();
 ka=kb=kc=kd=0;
 for (i=0;i<4;i++) ka+=shl(digestBits[15-i], (i*8));
 for (i=4;i<8;i++) kb+=shl(digestBits[15-i], ((i-4)*8));
 for (i=8;i<12;i++) kc+=shl(digestBits[15-i], ((i-8)*8));
 for (i=12;i<16;i++) kd+=shl(digestBits[15-i], ((i-12)*8));
 s=hexa(kd)+hexa(kc)+hexa(kb)+hexa(ka);
 return s;
}
// }}}