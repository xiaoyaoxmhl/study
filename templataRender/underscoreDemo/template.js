window._ = {};


// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
// Underscore默认使用标签格式的模板分隔符，改变下面的模板设置项可以使用你自己设置的模板分隔符。
_.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
};

// When customizing `templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
// 当定制了'templateSettings'设置项后，如果你不想定义interpolation，evaluation或者escaping的正则，
// 我们需要一个保证在某个属性项（evaluate，interpolate，escape）没有的情况下的正则。
var noMatch = /(.)^/;

// Certain characters need to be escaped so that they can be put into a string literal.
// 对特定字符进行转码（前面会加上"\"），这样放在Function的字符串字面量的函数体中才能正常运行（类似于正则中我们想要对\符号的匹配一样）
var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
};
// 获取escapes属性部分的匹配的正则
var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

var escapeChar = function (match) {
    return '\\' + escapes[match];
};

// JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.
// JavaScript mini模板引擎，类似于John Resig的实现。Underscore的模板可以处理任意的定界符，保留空格，并且可以在插入的代码里正确的转义引号。
// 注意：'oldSetting'的存在只是为了向后兼容。
// Underscore模板解析流程：
// 1、准备要对整个字符串进行匹配的正则表达式；
// 2、组装要执行的函数体主要部分（source变量，通过对整个模板进行正则匹配来实现）；
// 3、组装整个函数体执行部分；
// 4、使用Function实例化出一个生成最终字符串的函数（对该函数传入要渲染的参数即可获得最终渲染字符串）；
// 5、提供预编译的source参数，方便调试与错误追踪
_.template = function (text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    // 使用defaults方法来给settings参数赋默认值（如果evaluate、interpolate、escape任一属性有值则不做覆盖）
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    // 将界定符组合成一个正则
    // 用户如果没有设置界定符则以下正则是：/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g
    var matcher = RegExp([
        (settings.escape || noMatch).source,
        (settings.interpolate || noMatch).source,
        (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    // 记录编译成的函数字符串，可通过_.template(tpl).source获取
    var source = "__p+='";
    /**
     replace()函数的各项参数意义：
     1、第一个参数为每次匹配的全文本（$&）。
     2、中间参数为子表达式匹配字符串，也就是括号中的东西，个数不限
     3、倒数第二个参数为匹配文本字符串的匹配下标位置。
     4、最后一个参数表示字符串本身。
     */
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
        // 将要编译的模板中正则匹配到非分解符部分的加到source上面去，这里做了字符串转义处理
        source += text.slice(index, offset).replace(escaper, escapeChar);
        // 将index跳至当前匹配分解符的结束的地方
        index = offset + match.length;
        // 界定符内匹配到的内容（TODO:进一步解释）
        if (escape) {
            // 需要转码的字符串部分的处理
            source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        } else if (interpolate) {
            // 对象属性部分的处理
            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        } else if (evaluate) {
            // 代码执行部分的处理
            source += "';\n" + evaluate + "\n__p+='";
        }

        // Adobe VMs need the match returned to produce the correct offest.
        // 将匹配到的内容原样返回（Adobe VMs需要返回match来使得offset能够正常，一般网页并不需要）
        return match;
    });
    source += "';\n";


    // If a variable is not specified, place data values in local scope.
    // 如果没有在第二个参数里指定variable变量，那么将数据值置于局部变量中执行
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    // 将组装好的source重新组装，成为真正可以执行的js代码字符串。（print相当于等号，但是比=号要方便）
    // Array.prototype.join.call(arguments,'');是将所有的参数（如果是对象则调用toString()方法转化为字符串）以''合并在一起
    source = "var __t,__p='',__j=Array.prototype.join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" +
        source + 'return __p;\n';

    // 防止在没有传settings.variable作为with的作用域的时候，render函数的第一个参数名字为obj（此时render函数格式：function(obj,_) {source}），
    // obj为在没有传递setting.variable的时候source代码的作用域
    try {
        // underscore的根对象也作为一个变量传入了函数
        // Function传参：前面是执行函数时的参数，最后是执行函数体字符串字面量
        var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
        e.source = source;
        throw e;
    }
    // 传进去的data相当于obj
    var template = function (data) {
        // this一般都是指向window
        return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    // 提供编译的source，方便预编译（据官方文档，这么做可以对错误进行跟踪定位）
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';
    // 将函数返回（对函数传入要渲染的数据即可获得最终渲染字符串）
    return template;
};

