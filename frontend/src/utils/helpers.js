// Map pet mood to color
export const getMoodColor = (mood) => {
    switch (mood.toLowerCase()) {
      case 'happy':
        return 'success';
      case 'sad':
        return 'danger'; 
      case 'playful':
        return 'warning';
      case 'calm':
        return 'info'; 
      default:
        return 'secondary';
    }
  };
  
  // Map mood to icon (you can use emoji or icons from a library like FontAwesome)
  export const getMoodIcon = (mood) => {
    switch (mood.toLowerCase()) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'playful':
        return '🐾';
      case 'calm':
        return '😌';
      default:
        return '❓';
    }
  };
  
  // Sort pets by name (ascending)
  export const sortPetsByName = (pets) => {
    return [...pets].sort((a, b) => a.name.localeCompare(b.name));
  };
  
  // Sort pets by mood (alphabetically)
  export const sortPetsByMood = (pets) => {
    return [...pets].sort((a, b) => a.mood.localeCompare(b.mood));
  };
  