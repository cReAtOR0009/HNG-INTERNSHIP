// utils/groupCountries.js
export const groupCountries = (countries) => {
    if (!countries || !Array.isArray(countries)) {
      return [];
    }
  
    // Sort countries alphabetically by name.common
    const sortedCountries = [...countries].sort((a, b) => {
      const nameA = a?.name?.common || ""; // Safely access name.common
      const nameB = b?.name?.common || ""; // Safely access name.common
      return nameA.localeCompare(nameB);
    });
  
    // Group countries by their starting letter
    const groupedCountries = sortedCountries.reduce((acc, country) => {
      const firstLetter = country?.name?.common?.[0]?.toUpperCase() || ""; // Safely access name.common
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(country);
      return acc;
    }, {});
  
    // Convert the grouped object into an array of { letter, data } objects
    return Object.keys(groupedCountries).map((letter) => ({
      letter,
      data: groupedCountries[letter],
    }));
  };