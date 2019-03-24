(function (root) {
    function extend() {
        var target = arguments[0] || {};
        var length = arguments.length;
        var i = 1;
        var options, key;
        if (typeof target !== 'object') {
            target = {};
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (key in options) {
                    target[key] = options[key];
                }
            }
        }
        return target;
    }

    var templateSettings = {
        evalute: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g,
    }

    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

    var escapeChar = function(match) {
        return '\\' + escapes[match];
    };


    var template = function (text, settings) {
        settings = extend({}, templateSettings, settings);
        var matcher = RegExp([
            settings.escape.source,
            settings.interpolate.source,
            settings.evalute.source,
        ].join('|') + '|$', 'g');
        console.log(matcher);

        var source = "_p+='";
        var index = 0;
        text.replace(matcher, function (match, escape, interpolate, evalute, offset) {
            source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
            index = offset + match.length;
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
                source += "'+\n((_t=(" + interpolate + "))==null?'':_t)+\n'";
            } else if (evalute) {
                //处理逻辑
                source += "';\n" + evalute + "\n_p+='";
            }
            return match;

        })
        source += "';\n";
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var _t,_p='';" + source + "return _p;\n";

        var render = new Function(settings.variable || 'obj', source);
        var template = function (data) {
            return render.call(this, data);
        }
        return template;
    }

    root.template = template;

})(this);
