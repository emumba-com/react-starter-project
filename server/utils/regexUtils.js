const MENTIONS_REGEX = /@\[.*?]\(\d*\)/g

//returns ids [1, 5, 7] of people who are mentioned
const findMentions = (comment) => {        
  //@[Haris Hasan](71)
  let m;
  let result = []
  while ((m = MENTIONS_REGEX.exec(comment)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === MENTIONS_REGEX.lastIndex) {
          regex.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
          //console.log(`Found match, group ${groupIndex}: ${match}`);
          const lastIndex = match.lastIndexOf('(')
          result.push(parseInt(match.substring(lastIndex + 1, match.length -1)))
      });
  }
  
  return Array.from(new Set(result))
}

//returns all the mention strings
//['@[Haris Hasan](71)', @[Other Hasan](21)]
const getAllMentionStrings = (value) => {
  
  let results = []
  let m
  
  while ((m = MENTIONS_REGEX.exec(value)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === MENTIONS_REGEX.lastIndex)
          regex.lastIndex++;      
      
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        results.push(match)            
      })
  }
  
  return results        
}

//this should be doable with a simple regex
//but I haven't been able to figure it out
//replaces mentioned string with usernames
//Hello @[Haris Hasan](71) ==> Hello Haris Hasan
const replaceMentionsWithName = (value) => {
  let mentionStrings = getAllMentionStrings(value)
  mentionStrings.forEach(item => {
    const name = item.substring(2, item.indexOf(']'))
    value = value.replace(item, name)
  })
  
  return value
}

export default{
  findMentions,
  replaceMentionsWithName,
}
