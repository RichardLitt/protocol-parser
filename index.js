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

var parse = function(window, prefix) {
  var result = {}

  // HTML meta tags should be case insensitive
  prefix = prefix.toLowerCase()

  // Get both 'name' and 'property' attr
  var propList = Array.prototype.filter.call(
    window.document.querySelectorAll('meta[property]'),
    function(val) {
      return (val.attributes.property.value) ?
        val.attributes.property.value.toLowerCase().startsWith(prefix) : false
    }
  )
  var nameList = Array.prototype.filter.call(
    window.document.querySelectorAll('meta[name]'),
    function(val) {
      return (val.name) ? val.name.toLowerCase().startsWith(prefix) : false
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
      if (tag.property.value.startsWith(prefix))
        property = tag.property.value
      else
        property = tag.name.value

    // Remove the prefix:
    if (property.startsWith(prefix))
      property = property.slice(prefix.length + 1)

    // Save props. Save as Array if multiple.
    if (!result[property])
      result[property] = content
    else if (result[property].push)
      result[property].push(content)
    else
      result[property] = [result[property], content]
  }

  return result
}

var standardProtocols = function() {
  return {
    'citation': this.parse(window, 'citation'),
    'dc': this.parse(window, 'dc'),
    'og': this.parse(window, 'og'),
    'twitter': this.parse(window, 'twitter'),
    'os': this.parse(window, 'os')
  }
}

exports.isProfileCompliant = isProfileCompliant
exports.parse = parse
exports.standardProtocols = standardProtocols
