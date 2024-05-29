import * as dayjs from 'dayjs'

var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

// this is an entity specs
// dayjs is common datetime library
// just that i am unsure with some functionality
// best way to write some test and see behavior
describe('Quick test for dayjs', () => {

  describe('Entity logic', () => {
    it('should be able to parse time string', () => {
      const hour = "14"
      const minute = "03"

      const parsed = dayjs(`${hour}:${minute}`, "HH:mm");

      expect(parsed.hour()).toBe(Number(hour))
      expect(parsed.minute()).toBe(Number(minute))
    });
  });


  describe('Entity logic', () => {
    it('should be able compare using dayjs', () => {
      const hourDate = [
        {
          hour: "14",
          minute: "03"
        }, {
          hour: "14",
          minute: "05"
        }, {
          hour: "13",
          minute: "07"
        }
      ]

      const parseds = hourDate.map((a) => dayjs(`${a.hour}:${a.minute}`, "HH:mm"))

      expect(parseds[0].isBefore(parseds[1])).toBeTruthy()
      expect(parseds[0].isAfter(parseds[2])).toBeTruthy()


      // compare let's say add 30 minute and compare again
      const newDayjs = parseds[0].add(30, 'minute')
      expect(newDayjs.isBefore(parseds[1])).toBeFalsy()
    });
  });

});


