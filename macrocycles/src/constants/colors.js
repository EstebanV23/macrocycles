import theme from '../theme/theme'

export const MACROCYCLE = 'macrocycle'
export const MESOCYCLE = 'mesocycle'
export const MICROCYCLE = 'microcycle'
export const TIME_FRAMES = 'timeFrames'

const colors = {
  macrocycle: {
    default: theme.colors.orange.default,
    secondary: theme.colors.orange[200]
  },
  mesocycle: {
    default: theme.colors.blue.default,
    secondary: theme.colors.blue[200]
  },
  microcycle: {
    default: theme.colors.green.default,
    secondary: theme.colors.green[200]
  },
  timeFrames: {
    default: theme.colors.purple.default,
    secondary: theme.colors.purple[200]
  }
}
const colorsSelector = (nameStage, secondary) => {
  return secondary ? colors[nameStage].secondary : colors[nameStage].default
}

export default colorsSelector
