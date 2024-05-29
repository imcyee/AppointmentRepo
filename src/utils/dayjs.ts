import * as dayjs from 'dayjs'

// Configuration for dayjs to parse time in string
// @see https://day.js.org/docs/en/plugin/custom-parse-format
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
export default dayjs