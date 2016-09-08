import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import HTMLStyles from './HTMLStyles'

module.exports = {
  /**
  * Renders an anchor tag
  * @param htmlAttribs: dict of html attributes
  * @param children: the children to place within the element
  * @param passProps: other props that are to be passed into the element
  * @return a RN element that represents an anchor tag
  */
  a: (htmlAttribs, children, passProps) => {
    const style = []
      .concat(
        HTMLStyles.defaultStyles.a,
        passProps.htmlStyles ? passProps.htmlStyles.a : undefined,
        htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.TEXT) : undefined
      ).filter((s) => s !== undefined)
      //we are always returning the a link as if it is simply another link
      return (
        <Text
          {...passProps}
          style={style}
          onPress={(evt) => { passProps.onLinkPress ? passProps.onLinkPress(evt, htmlAttribs.href) : undefined }}>
          {children}
        </Text>
      )
  },
  /**
  * Renders an image tag
  * @param htmlAttribs: dict of html attributes
  * @param children: the children to place within the element
  * @param passProps: other props that are to be passed into the element
  * @return a RN element that represents an image tag
  */
  img: (htmlAttribs, children, passProps) => {
    // Build our styles
    const style = []
      .concat(
        HTMLStyles.defaultStyles.img,
        passProps.htmlStyles ? passProps.htmlStyles.img : undefined,
        htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.IMAGE) : undefined
      ).filter((s) => s !== undefined)

    // Extract our width & height (if any. If not render some defaults)
    let width, height
    for (var i = style.length - 1; i >= 0; i--) {
      if (!width && style[i].width) { width = style[i].width }
      if (!height && style[i].height) { height = style[i].height }
      if (width && height) { break }
    }
    width = width === undefined ? 100 : width
    height = height === undefined ? 100 : height

    // Done
    return (<Image source={{uri: htmlAttribs.src, width: width, height: height}} style={style} {...passProps} />)
  }
}
