import { colors, spacing, zIndex } from 'material-ui/styles'
import { fade } from 'material-ui/utils/colorManipulator.js'

export default {
  spacing: spacing,
  zIndex: zIndex,
  textTransform: 'none',
  palette: {
    primary1Color: '#384757',
    primary2Color: colors.orangeA400,
    primary3Color: colors.lightBlack,
    accent1Color: 'rgb(0, 123, 255)',
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: fade(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.orangeA200
  }
}
