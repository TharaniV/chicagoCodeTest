const constants = require('../../config/constants');
module.exports = async function format(json) {
  let finalOutput = {},
    measurements = [],
    standard = {},
    plans = [],
    parts = {},
    standards = [],
    notes = [],
    currentPart = '',
    stillStandard = false,
    attrKey = '',
    attrValue = '';

  if (json.data) {
    for (let i = 2; i < json.data.length; i++) {
      let curLine = json.data[i];
      if (curLine[0] && curLine[0] !== constants.GUIDELINE_TEXT) {
        currentPart = curLine[0] ? curLine[0] : '';
        (standards = []),
          (notes = []),
          (stillStandard = false),
          (currentStandard = '');
        parts = {
          [currentPart]: {}
        };
        plans.push(parts);
      } else if (!curLine[1] && curLine[2] && curLine[3]) {
        attrKey = curLine[2];
        attrValue = curLine[3];
        measurements.push({ [attrKey]: attrValue });
      } else if (curLine[0] && curLine[0] === constants.GUIDELINE_TEXT) {
        (stillStandard = false), (currentStandard = '');
        parts[currentPart][constants.GUIDELINE_TEXT] = curLine[2]
          ? curLine[2]
          : '';
      } else if (curLine[1] && curLine[1] === constants.STANDARD_TEXT) {
        stillStandard = true;
        notes = [];
        standard = {
          standard: curLine[2] ? curLine[2] : '',
          notes: notes
        };
        standards.push(standard);
        parts[currentPart][constants.STANDARDS] = standards;
      }
      if (stillStandard && !curLine[2]) {
        if (curLine[3]) standard.notes.push(curLine[3]);
      }
    }
  }
  finalOutput = {
    measurements: measurements,
    parts: plans
  };
  return finalOutput;
};
