
(function(/*! Stitch !*/) {
  if (!this.require) {
    this.DNA = {};
    this.DNA.protocols_impl = {};
    this.DNA.protocols = {};
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle){
        modules[key] = bundle[key];
        var mod = {};
        bundle[key]({}, require, mod)
        if(mod.hasOwnProperty('register_protocol'))
            for(var protocol_name in mod.register_protocol)
                this.DNA.protocols[protocol_name] = mod.register_protocol[protocol_name];
        }
        for (var m in modules) {
            var mod = {};
            modules[m]({}, require, mod);
            if(mod.hasOwnProperty('register_protocol_impl'))
                for(var protocol in mod.register_protocol_impl){
                    if (!this.DNA.protocols.hasOwnProperty(protocol))
                        throw('implementation of ' + protocol + 'was not found in DNA.protocols')
                    this.DNA.protocols_impl[protocol] = mod.register_protocol_impl[protocol]
                    }
            }
    };
  }
  return this.require.define;
}).call(this)({"test1": function(exports, require, module) {(function() {
  var SomeClass;

  SomeClass = (function() {

    function SomeClass(name, methods) {
      this.name = name;
      this.methods = methods;
      console.log('some class initialized');
    }

    return SomeClass;

  })();

  module.exports = new SomeClass;

}).call(this);
}, "test2": function(exports, require, module) {(function() {
  var AnotherClass;

  AnotherClass = (function() {

    function AnotherClass(name, surname) {
      this.name = name;
      this.surname = surname;
      console.log('another class initialized');
    }

    return AnotherClass;

  })();

  module.exports = AnotherClass;

  module.register_protocol_impl = {
    IDraggable: function() {
      return console.log('jklj');
    }
  };

  module.register_protocol = {
    IDraggable: [['setX', ['x']], ['setY', ['y']], ['setXY', ['x', 'y']], ['onDragStart', ['f']], ['onDragStop', ['f']]],
    IMovable: [['setX', ['x']], ['setY', ['y']], ['setXY', ['x', 'y']], ['onDragStart', ['f']], ['onDragStop', ['f']]]
  };

}).call(this);
}});
