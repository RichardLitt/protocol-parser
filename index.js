"use strict()";

// TODO Add for ogp, twitter card
var isProfileCompliant = function(window, prefix, profileHref) {
  var compliant,
    profileNode = window.document.head.querySelectorAll('link[rel=profile]')

  // Make sure that the profile is set
  for (var i = 0; i < profileNode.length; ++i) {
    compliant = profileNode[i].href === profileHref
    if (!compliant) break
  }

  return compliant
}

var getPrefix = function(window) {
  var result = {
    'html': null,
    'head': null
  }

  if (window.document.documentElement.attributes.prefix)
    result.html['prefix'] = window.document.documentElement.attributes.prefix
  if (window.document.head.attributes.prefix)
    result.head['prefix'] = window.document.head.attributes.prefix
  if (window.document.documentElement.attributes.xmlns)
    // TODO Add shit here
}

var parse = function(window, prefix) {
  var container = {}

  prefix = (prefix.push) ? prefix : [prefix]

  for (var p = 0; p < prefix.length; ++p) {

    var result = container[prefix[p]] = {}

    // HTML meta tags should be case insensitive
    prefix[p] = prefix[p].toLowerCase()

    // Get both 'name' and 'property' attr
    var propList = Array.prototype.filter.call(
      window.document.querySelectorAll('meta[property]'),
      function(val) {
        return (val.attributes.property.value) ?
          val.attributes.property.value.toLowerCase().startsWith(prefix[p]) : false
      }
    )
    var nameList = Array.prototype.filter.call(
      window.document.querySelectorAll('meta[name]'),
      function(val) {
        return (val.name) ? val.name.toLowerCase().startsWith(prefix[p]) : false
      }
    )

    // Merge the two NodeLists together
    var metaTags = propList.concat(nameList)

    for (var j = 0; j < metaTags.length; ++j) {
      var property,
        tag = metaTags[j].attributes,
        content = tag.content.value

      // Deal with exceptions where both are defined
      if (!tag.property && tag.name)
        property = tag.name.value
      else if (!tag.name && tag.property)
        property = tag.property.value
      else
        if (tag.property.value.startsWith(prefix[p]))
          property = tag.property.value
        else
          property = tag.name.value

      // Remove the prefix:
      if (property.startsWith(prefix[p]))
        property = property.slice(prefix[p].length + 1)

      // Save props. Save as Array if multiple.
      if (!result[property])
        result[property] = content
      else if (result[property].push)
        result[property].push(content)
      else
        result[property] = [result[property], content]
    }
  }
  return container
}

exports.isProfileCompliant = isProfileCompliant
exports.parse = parse
