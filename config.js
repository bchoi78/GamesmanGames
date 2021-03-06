$(document).ready(function() {
jQuery.fn.extend({
  getConfigure: function(options) {
    var c, contents, gameInfo, info, log, makeInput, makeRange, name, settings;
    settings = {
      debug: false
    };
    settings = $.extend(settings, options);
    log = function(msg) {
      if (settings.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
      }
    };
    c = this.first();
    contents = "";
    makeRange = function(n, i) {
      var description, ival, retval, selected, v, value, _i, _len, _ref;
      v = i.values;
      description = i.desc;
      retval = '';
      retval += '<div class="three columns end">';
      retval += description;
      retval += "<select id='custom" + n + "' name='" + n + "' >";
      ival = parseInt(configurationHash[n]);
      _ref = i.values;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        selected = ival === value ? "selected='selected'" : "";
        retval += ("<option " + selected + " value='") + value + "'>" + value + "</option>";
      }
      retval += "</select>";
      retval += "</div>";
      return retval;
    };
    makeInput = function() {
      var retval;
      retval = "";
      return retval;
    };
    gameInfo = "";
    for (name in settings) {
      info = settings[name];
      if (typeof info === "object") {
        switch (info.type) {
          case "integer":
            gameInfo += makeRange(name, info);
        }
      }
    }
    $('#gname').val(window.game.asset);
    $('#restartButton').click(function(event) {
      return $('#continue-game').val('no');
    });
    return this;
  }
});
});

window.ensureConfigParameters = function() {
  var problems;
  problems = [];
  if (!(window.game != null)) {
    problems.push("You Must Create a window.game object in your game file");
  } else {
    if (!(window.game.title != null)) {
      problems.push("You must define a window.game.title string with the title of the game");
    }
    if (!(window.game.asset != null)) {
      problems.push("You must define a window.game.asset string with the asset name. This should be the same as the name of the js file, and any image assets");
    }
    if (!(window.game.parameters != null)) {
      problems.push("You must define a parameters object. Please refer to ttt.js.coffee for an example of this");
    }
  }
  if (problems.length > 0) {
    alert(problems.join("\n\n"));
    return false;
  }
  return true;
};
