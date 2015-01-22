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

  // Get both 'name' and 'property' attr
  var propList = Array.prototype.slice.call(
    window.document.querySelectorAll('meta[property^=' + prefix + ']')
  )
  var nameList = Array.prototype.slice.call(
    window.document.querySelectorAll('meta[name^=' + prefix + ']')
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
      if (tag.property.value.split(':')[0] === prefix)
        property = tag.property.value
      else
        property = tag.name.value

    // Remove the prefix:
    if (property.split(':')[0] === prefix)
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

exports.isProfileCompliant = isProfileCompliant
exports.parse = parse
