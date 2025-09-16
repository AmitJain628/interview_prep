const endorsements = [
    { skill: 'css', user: 'Bill' },
    { skill: 'javascript', user: 'Chad' },
    { skill: 'javascript', user: 'Bill' },
    { skill: 'css', user: 'Sue' },
    { skill: 'javascript', user: 'Sue' },
    { skill: 'html', user: 'Sue' }
  ];

  const aggregate = (arr, onKey, whoKey) => {
    return Object.values(arr.reduce((acc, curr) => {
        const onValue = curr[onKey];
        const whoValue = curr[whoKey];

        if(!acc[onValue]) {
            acc[onValue] = {
                [onKey]: onValue,
                [whoKey]: [whoValue]
            };
        }  else { 
            acc[onValue] = {
                [onKey]: onValue,
                [whoKey]: [...acc[onValue][whoKey], whoValue]
            };
        }

        return acc;

    }, {}))
  }
  
  console.log(aggregate(endorsements, "user", "skill"));