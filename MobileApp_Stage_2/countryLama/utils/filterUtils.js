export const filterData = (list, filters) => {
    return list.filter((item) => {
      // Check if the search term filter exists and is not empty before applying
      const matchesSearchTerm = filters.searchTerm?.trim()
        ? item.name.common.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true;
  
      // Check if the timeZone filter exists and is not empty before applying
      const matchesTimeZone = filters.timeZone?.length
        ? filters.timeZone.includes(item.timezones?.[0])
        : true;
  
      // Check if the continents filter exists and is not empty before applying
      const matchesContinent = filters.continents?.length
        ? filters.continents.includes(item.continents?.[0])
        : true;
  
      // Check if the language filter exists and is not empty before applying
      let matchesLanguage = true;
  
      if (filters.language?.trim() && filters.language.toLowerCase() !== "en") {
        const languageCode = filters.language.toLowerCase();
        const translation = item.translations?.[languageCode];
  
        if (translation) {
          // If translation exists, the item passes the language filter
          matchesLanguage = true;
        } else {
          // If no translation is found, exclude the item from the results
          matchesLanguage = false;
        }
      }
  
      // Return true only if all conditions are met, meaning the item passes all filters
      return (
        matchesSearchTerm &&
        matchesTimeZone &&
        matchesContinent &&
        matchesLanguage
      );
    }).map((item) => {
      // Apply translations if a language filter is provided and it's not "en"
      if (filters.language?.trim() && filters.language.toLowerCase() !== "en") {
        const languageCode = filters.language.toLowerCase();
        const translation = item.translations?.[languageCode];
  
        if (translation) {
          // Create a new object with translated names
          return {
            ...item,
            name: {
              common: translation.common,
              official: translation.official,
            },
          };
        }
      }
  
      // If no translation is needed, return the original item
      return item;
    });
  };